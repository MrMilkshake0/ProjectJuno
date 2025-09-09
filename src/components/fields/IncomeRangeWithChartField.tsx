// src/components/fields/IncomeRangeWithChartField.tsx
'use client';

import * as React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { FormItem, FormLabel, FormField, FormControl } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { DualRangeSlider } from '@/components/ui/dual-range-slider';

/* ------------------------------------------------------------------ */
/* Math helpers                                                        */
/* ------------------------------------------------------------------ */

// Acklam approximation for inverse normal CDF
function normInv(p: number): number {
  const pp = Math.min(1 - 1e-12, Math.max(1e-12, p));
  const a = [
    -3.969683028665376e1, 2.209460984245205e2, -2.759285104469687e2,
    1.38357751867269e2, -3.066479806614716e1, 2.506628277459239,
  ];
  const b = [
    -5.447609879822406e1, 1.615858368580409e2, -1.556989798598866e2,
    6.680131188771972e1, -1.328068155288572e1,
  ];
  const c = [
    -7.784894002430293e-3, -3.223964580411365e-1, -2.400758277161838,
    -2.549732539343734, 4.374664141464968, 2.938163982698783,
  ];
  const d = [7.784695709041462e-3, 3.224671290700398e-1, 2.445134137142996, 3.754408661907416];
  const pl = 0.02425;

  let q: number, r: number;
  if (pp < pl) {
    q = Math.sqrt(-2 * Math.log(pp));
    return (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
      (((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q) + 1);
  } else if (pp > 1 - pl) {
    q = Math.sqrt(-2 * Math.log(1 - pp));
    return -(((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
      (((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q) + 1);
  } else {
    q = pp - 0.5;
    r = q * q;
    return (((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q /
      (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1);
  }
}

function erf(x: number): number {
  const sign = x < 0 ? -1 : 1;
  const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741, a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911;
  const ax = Math.abs(x);
  const t = 1 / (1 + p * ax);
  const y = 1 - (((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t) * Math.exp(-ax * ax);
  return sign * y;
}

/* Log-normal helpers */
function fitLogNormal({ median, p90 }: { median: number; p90: number }) {
  const mu = Math.log(median);
  const z90 = normInv(0.9);
  const sigma = (Math.log(p90) - mu) / z90;
  return { mu, sigma };
}
function lognQuantile(p01: number, mu: number, sigma: number) {
  const z = normInv(p01);
  return Math.exp(mu + sigma * z);
}
function lognPdf(x: number, mu: number, sigma: number) {
  if (x <= 0) return 0;
  const a = (Math.log(x) - mu) / sigma;
  return (1 / (x * sigma * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * a * a);
}

/* ------------------------------------------------------------------ */
/* Constants & small utilities                                        */
/* ------------------------------------------------------------------ */

const fmtUSD = (n?: number) =>
  n == null ? '' : n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

const MIN_INCOME = 14_000;
const MAX_INCOME = 500_000;
const EPS = 1;

const fmtUSDRangeLabel = (n?: number) => {
  if (n == null) return '';
  if (n <= MIN_INCOME + EPS) return `<${fmtUSD(MIN_INCOME)}`;
  if (n >= MAX_INCOME - EPS) return `${fmtUSD(MAX_INCOME)}+`;
  return fmtUSD(n);
};

const SLIDER_MIN = 0;
const SLIDER_MAX = 100;

const clampDollar = (n: number) => Math.max(MIN_INCOME, Math.min(MAX_INCOME, n));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const lerpInv = (x: number, a: number, b: number) => (x - a) / (b - a);

/** Build bell curve points in a log-$ x domain spanning [xmin, xmax]. */
function buildCurve({
  mu, sigma, width, height, margin, samples = 240,
  xmin = MIN_INCOME, xmax = MAX_INCOME,
}: {
  mu: number; sigma: number; width: number; height: number;
  margin: { l: number; r: number; t: number; b: number };
  samples?: number; xmin?: number; xmax?: number;
}) {
  const lmin = Math.log(xmin), lmax = Math.log(xmax);
  const xToSvg = (x: number) => {
    const lx = Math.log(Math.max(xmin, Math.min(xmax, x)));
    return margin.l + ((lx - lmin) / (lmax - lmin)) * (width - margin.l - margin.r);
  };

  const dens: { x: number; y: number }[] = [];
  let maxD = 0;

  for (let i = 0; i < samples; i++) {
    const t = i / (samples - 1);
    const lx = lmin + t * (lmax - lmin);
    const x = Math.exp(lx);
    const d = lognPdf(x, mu, sigma);
    maxD = Math.max(maxD, d);
    dens.push({ x, y: d });
  }

  const yScale = (d: number) => margin.t + (1 - d / maxD) * (height - margin.t - margin.b);
  return dens.map(p => ({ x: xToSvg(p.x), y: yScale(p.y) }));
}

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

type SliderScale = 'linear' | 'log' | 'percentile';

interface Props {
  base: string;
  label?: string;
  disabled?: boolean;
  showInputs?: boolean;
  className?: string;
  medianUSD?: number;
  p90USD?: number;
  inputStepDollars?: number;
  chartWidth?: number;
  chartHeight?: number;
  sliderScale?: SliderScale;
}

/* ------------------------------------------------------------------ */
/* Small presentational piece                                          */
/* ------------------------------------------------------------------ */

interface MoneyInputProps {
  value: number | undefined;
  placeholder: string;
  disabled?: boolean;
  widthClass?: string;
  onCommit: (next: number | undefined) => void;
}

function MoneyInput({
  value,
  placeholder,
  disabled,
  widthClass = 'w-24',
  onCommit,
}: MoneyInputProps) {
  const [local, setLocal] = React.useState<string>(value?.toString() ?? '');

  React.useEffect(() => {
    setLocal(value?.toString() ?? '');
  }, [value]);

  const commit = React.useCallback(() => {
    if (local === '') {
      onCommit(undefined);
      return;
    }
    const n = Number(local);
    if (!Number.isNaN(n)) onCommit(n);
  }, [local, onCommit]);

  return (
    <Input
      className={widthClass}
      type="number"
      inputMode="numeric"
      disabled={disabled}
      value={local}
      placeholder={placeholder}
      onChange={(e) => setLocal(e.target.value)}
      onBlur={commit}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          commit();
        }
      }}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Main component                                                      */
/* ------------------------------------------------------------------ */

export default function IncomeRangeNormalishField({
  base,
  label = 'Income Bracket (USD, bell-curve approximation)',
  disabled = false,
  showInputs = true,
  className,
  medianUSD = 70_000,
  p90USD = 180_000,
  inputStepDollars = 1_000,
  chartWidth = 720,
  chartHeight = 180,
  sliderScale = 'log',
}: Props) {
  const { control, setValue } = useFormContext();
  const minName = `${base}.min`;
  const maxName = `${base}.max`;

  const vmin: number | undefined = useWatch({ name: minName });
  const vmax: number | undefined = useWatch({ name: maxName });

  const { mu, sigma } = React.useMemo(
    () => fitLogNormal({ median: medianUSD, p90: p90USD }),
    [medianUSD, p90USD]
  );

  // Defaults from the model (P10–P90), clamped to bounds
  const modelDefaultMin = React.useMemo(() => lognQuantile(0.1, mu, sigma), [mu, sigma]);
  const modelDefaultMax = React.useMemo(() => lognQuantile(0.9, mu, sigma), [mu, sigma]);

  const defaultMin = React.useMemo(
    () => clampDollar(modelDefaultMin),
    [modelDefaultMin]
  );
  const defaultMax = React.useMemo(
    () => clampDollar(modelDefaultMax),
    [modelDefaultMax]
  );

  const curMin = typeof vmin === 'number' ? clampDollar(vmin) : defaultMin;
  const curMax = typeof vmax === 'number' ? clampDollar(vmax) : defaultMax;

  const round$ = React.useCallback(
    (n: number) => Math.round(n / inputStepDollars) * inputStepDollars,
    [inputStepDollars]
  );

  /* ---------------- Slider transforms ---------------- */

  const dollarsToSlider = React.useCallback((x: number) => {
    const X = clampDollar(x);

    if (sliderScale === 'linear') {
      return lerpInv(X, MIN_INCOME, MAX_INCOME) * 100;
    }
    if (sliderScale === 'log') {
      const lmin = Math.log(MIN_INCOME), lmax = Math.log(MAX_INCOME);
      const t = (Math.log(X) - lmin) / (lmax - lmin);
      return t * 100;
    }
    // percentile
    const z = (Math.log(X) - mu) / sigma;
    const cdf = 0.5 * (1 + erf(z / Math.SQRT2));
    return cdf * 100;
  }, [sliderScale, mu, sigma]);

  const sliderToDollars = React.useCallback((s: number) => {
    const t = Math.max(0, Math.min(1, s / 100));

    if (sliderScale === 'linear') {
      return clampDollar(lerp(MIN_INCOME, MAX_INCOME, t));
    }
    if (sliderScale === 'log') {
      const lmin = Math.log(MIN_INCOME), lmax = Math.log(MAX_INCOME);
      const lx = lmin + t * (lmax - lmin);
      return clampDollar(Math.exp(lx));
    }
    // percentile
    return clampDollar(lognQuantile(t, mu, sigma));
  }, [sliderScale, mu, sigma]);

  const sliderVals: [number, number] = React.useMemo(
    () => [dollarsToSlider(curMin), dollarsToSlider(curMax)],
    [curMin, curMax, dollarsToSlider]
  );

  const labelForSlider = React.useCallback(
    (s?: number) => fmtUSDRangeLabel(s == null ? undefined : sliderToDollars(s)),
    [sliderToDollars]
  );

  /* ---------------- Chart ---------------- */

  const margin = React.useMemo(() => ({ l: 16, r: 12, t: 8, b: 12 }), []);
  const pts = React.useMemo(
    () => buildCurve({ mu, sigma, width: chartWidth, height: chartHeight, margin, xmin: MIN_INCOME, xmax: MAX_INCOME }),
    [mu, sigma, chartWidth, chartHeight, margin]
  );
  const pathD = React.useMemo(
    () => (pts.length ? 'M' + pts.map(p => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' L ') : ''),
    [pts]
  );

  const xFromIncome = React.useCallback((x: number) => {
    const lmin = Math.log(MIN_INCOME), lmax = Math.log(MAX_INCOME);
    const lx = Math.log(Math.max(MIN_INCOME, Math.min(MAX_INCOME, x)));
    return margin.l + ((lx - lmin) / (lmax - lmin)) * (chartWidth - margin.l - margin.r);
  }, [chartWidth, margin]);

  const xMin = xFromIncome(curMin);
  const xMax = xFromIncome(curMax);

  /* ---------------- Handlers ---------------- */

  const onSliderChange = React.useCallback((vals: number[] | undefined) => {
    if (!Array.isArray(vals) || vals.length < 2) return;
    const [a, b] = vals;
    const lo$ = round$(sliderToDollars(Math.min(a, b)));
    const hi$ = round$(sliderToDollars(Math.max(a, b)));

    setValue(minName, lo$, { shouldDirty: true, shouldValidate: true });
    setValue(maxName, hi$, { shouldDirty: true, shouldValidate: true });
  }, [minName, maxName, round$, sliderToDollars, setValue]);

  /* ---------------- Render ---------------- */

  return (
    <FormItem className={className}>
      <FormLabel>{label}</FormLabel>

      {/* Chart */}
      <div className="relative rounded-md border bg-muted/10 p-2">
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="block h-auto w-full"
          role="img"
          aria-label="Income distribution curve with selected range"
        >
          <line
            x1={margin.l} x2={chartWidth - margin.r}
            y1={chartHeight - margin.b} y2={chartHeight - margin.b}
            stroke="currentColor" opacity={0.2}
          />
          <path d={pathD} fill="none" stroke="currentColor" strokeWidth={2} />
          <line x1={xMin} x2={xMin} y1={margin.t} y2={chartHeight - margin.b}
                stroke="currentColor" strokeDasharray="4 4" />
          <line x1={xMax} x2={xMax} y1={margin.t} y2={chartHeight - margin.b}
                stroke="currentColor" strokeDasharray="4 4" />
        </svg>
      </div>

      {/* Controls */}
      <div className="mt-3 flex items-center gap-4">
        {/* Slider */}
        <FormControl className="flex-1">
          <DualRangeSlider
            min={SLIDER_MIN}
            max={SLIDER_MAX}
            step={1}
            value={sliderVals}
            disabled={disabled}
            label={labelForSlider}
            labelPosition="top"
            onValueChange={onSliderChange}
          />
        </FormControl>

        {/* Inputs (side-by-side) */}
        {showInputs && (
          <div className="flex items-center gap-2">
            <FormField
              control={control}
              name={minName}
              render={({ field }) => (
                <FormItem>
                  <MoneyInput
                    value={field.value}
                    placeholder="Min $"
                    disabled={disabled}
                    onCommit={(n) => {
                      if (n == null) {
                        field.onChange(undefined);
                        return;
                      }
                      field.onChange(round$(clampDollar(n)));
                    }}
                  />
                </FormItem>
              )}
            />

            <span className="text-xs text-muted-foreground">to</span>

            <FormField
              control={control}
              name={maxName}
              render={({ field }) => (
                <FormItem>
                  <MoneyInput
                    value={field.value}
                    placeholder="Max $"
                    disabled={disabled}
                    onCommit={(n) => {
                      if (n == null) {
                        field.onChange(undefined);
                        return;
                      }
                      // keep max >= current min
                      field.onChange(round$(Math.max(curMin, clampDollar(n))));
                    }}
                  />
                </FormItem>
              )}
            />
          </div>
        )}
      </div>
    </FormItem>
  );
}
