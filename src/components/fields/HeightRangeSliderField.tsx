// src/components/fields/HeightRangeSliderField.tsx
'use client';

import * as React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { FormItem, FormLabel, FormControl, FormField } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { DualRangeSlider } from '@/components/ui/dual-range-slider'; // adjust path if needed
import { AlertTriangle } from 'lucide-react';

/* ---------------- Types ---------------- */

export interface HeightRangeSliderFieldProps {
  base: string;          // e.g., 'partner_preferences.height_range_cm'
  label: string;
  min?: number;          // default 120
  max?: number;          // default 220
  step?: number;         // default 1
  disabled?: boolean;
  className?: string;
  showInputs?: boolean;  // show numeric inputs next to thumbs (default true)
  distributions?: {
    men?: { mean: number; stddev: number };
    women?: { mean: number; stddev: number };
  };
}

/* ---------------- Math (Gaussian) ---------------- */

function pdfNormal(x: number, mean: number, sd: number) {
  if (!(sd > 0)) return 0;
  const z = (x - mean) / sd;
  return (1 / (sd * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * z * z);
}

/* ---------------- Imperial helpers ---------------- */

function cmToImperial(cm: number) {
  const totalInches = Math.round(cm / 2.54); // nearest inch
  let feet = Math.floor(totalInches / 12);
  let inches = totalInches - feet * 12;
  if (inches === 12) { feet += 1; inches = 0; }
  return { feet, inches, totalInches };
}
function fmtImperialCompact(cm?: number) {
  if (cm == null || !Number.isFinite(cm)) return '';
  const { feet, inches } = cmToImperial(cm);
  return `${feet}\u2032${inches}\u2033`; // 5′11″
}
function fmtImperialSpoken(cm?: number) {
  if (cm == null || !Number.isFinite(cm)) return '';
  const { feet, inches } = cmToImperial(cm);
  return `${feet} ft ${inches} in`;
}

type DistKey = 'men' | 'women';
const COLORS: Record<DistKey, string> = {
  men: '#3B82F6',   // blue-500
  women: '#EC4899', // pink-500
};
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/* ---------------- Component ---------------- */

export default function HeightRangeSliderField({
  base,
  label,
  min = 120,
  max = 220,
  step = 1,
  disabled = false,
  className,
  showInputs = true,
  distributions,
}: HeightRangeSliderFieldProps) {
  const { control, setValue } = useFormContext();

  const minName = `${base}.min`;
  const maxName = `${base}.max`;

  const vmin: number | undefined = useWatch({ name: minName, control });
  const vmax: number | undefined = useWatch({ name: maxName, control });

  // The user's own height (used to derive constraints)
  const selfHeight: number | undefined = useWatch({
    name: 'physical_info.self.height_cm',
    control,
  });

  const roundClamp = React.useCallback(
    (n: number) => clamp(Math.round(n / step) * step, min, max),
    [min, max, step]
  );

  // Constraint 1: min ≤ 1.09 × self
  // If self height isn't set/finite, effectively "no cap" (use max).
  const minCap = React.useMemo(() => {
    if (!Number.isFinite(selfHeight as number)) return max;
    return roundClamp(Math.min(max, (selfHeight as number) * 1.09));
  }, [selfHeight, roundClamp, max]);

  // Constraint 2: max ≥ 0.91 × self
  // If self height isn't set/finite, effectively "no floor" (use min).
  const maxFloor = React.useMemo(() => {
    if (!Number.isFinite(selfHeight as number)) return min;
    return roundClamp(Math.max(min, (selfHeight as number) * 0.91));
  }, [selfHeight, roundClamp, min]);

  // Helper to apply both constraints + ordering + bounds
  const applyCaps = React.useCallback(
    (lo: number, hi: number) => {
      let nextLo = roundClamp(lo);
      let nextHi = roundClamp(hi);

      // Enforce the +9% cap on min and the -9% floor on max
      nextLo = Math.min(nextLo, minCap);    // min ≤ 1.09×self
      nextHi = Math.max(nextHi, maxFloor);  // max ≥ 0.91×self

      // Keep range ordered; if they cross, collapse to the meeting point
      if (nextLo > nextHi) {
        const meet = clamp(nextLo, min, max);
        nextLo = meet;
        nextHi = meet;
      }

      // Ensure within slider bounds
      nextLo = clamp(nextLo, min, max);
      nextHi = clamp(nextHi, min, max);

      return [nextLo, nextHi] as const;
    },
    [min, max, minCap, maxFloor, roundClamp]
  );

  // Derive current values by running the stored values through applyCaps
  const [currentMin, currentMax] = React.useMemo(() => {
    const rawLo = typeof vmin === 'number' ? vmin : min;
    const rawHi = typeof vmax === 'number' ? vmax : max;
    return applyCaps(rawLo, rawHi);
  }, [vmin, vmax, min, max, applyCaps]);

  const imperialMinCompact = React.useMemo(() => fmtImperialCompact(currentMin), [currentMin]);
  const imperialMaxCompact = React.useMemo(() => fmtImperialCompact(currentMax), [currentMax]);
  const imperialMinSpoken = React.useMemo(() => fmtImperialSpoken(currentMin), [currentMin]);
  const imperialMaxSpoken = React.useMemo(() => fmtImperialSpoken(currentMax), [currentMax]);

  // validate distributions
  const { hasAny, errs, usable } = React.useMemo(() => {
    const errors: string[] = [];
    const ok: Partial<Record<DistKey, { mean: number; stddev: number }>> = {};
    const check = (k: DistKey, d?: { mean: number; stddev: number }) => {
      if (!d) return;
      const { mean, stddev } = d;
      if (!Number.isFinite(mean) || !Number.isFinite(stddev)) {
        errors.push(`${k}: non-numeric mean/stddev`);
        return;
      }
      if (stddev <= 0) {
        errors.push(`${k}: stddev must be > 0`);
        return;
      }
      if (mean < min || mean > max) {
        errors.push(`${k}: mean ${mean} outside [${min}, ${max}]`);
      }
      ok[k] = { mean, stddev };
    };
    check('men', distributions?.men);
    check('women', distributions?.women);
    const has = Boolean(distributions && (distributions.men || distributions.women));
    return { hasAny: has, errs: errors, usable: ok };
  }, [distributions, min, max]);

  // chart paths + markers (with band between currentMin/currentMax)
  const chart = React.useMemo(() => {
    const width = 720;
    const height = 180;
    const margin = { l: 16, r: 12, t: 8, b: 12 };
    const plotW = width - margin.l - margin.r;
    const plotH = height - margin.t - margin.b;

    const xToSvg = (x: number) => margin.l + ((x - min) / (max - min)) * plotW;
    const y0 = margin.t + plotH;

    const SAMPLES = 260;
    const xs = Array.from({ length: SAMPLES }, (_, i) => min + (i / (SAMPLES - 1)) * (max - min));

    const series: { key: DistKey; dens: { x: number; d: number }[] }[] = [];
    (['men', 'women'] as DistKey[]).forEach((k) => {
      const d = usable[k];
      if (!d) return;
      const dens = xs.map((x) => ({ x, d: pdfNormal(x, d.mean, d.stddev) }));
      series.push({ key: k, dens });
    });

    const dMax = series.reduce((m, s) => Math.max(m, ...s.dens.map((p) => p.d)), 0) || 1e-9;
    const yFromD = (dv: number) => margin.t + (1 - dv / dMax) * plotH;

    const toStrokePath = (dens: { x: number; d: number }[]) =>
      dens.length
        ? 'M' + dens.map((p) => `${xToSvg(p.x).toFixed(2)},${yFromD(p.d).toFixed(2)}`).join(' L ')
        : '';

    const paths: Partial<Record<DistKey, string>> = {};
    series.forEach((s) => { paths[s.key] = toStrokePath(s.dens); });

    const xMin = xToSvg(currentMin);
    const xMax = xToSvg(currentMax);

    return {
      width, height, margin, y0,
      pathMen: paths.men ?? '',
      pathWomen: paths.women ?? '',
      xMin, xMax,
    };
  }, [usable, min, max, currentMin, currentMax]);

  const showEmpty = !hasAny;
  const showError = errs.length > 0;

  return (
    <FormItem className={className}>
      <FormLabel>{label}</FormLabel>

      {/* Chart (keeps the same visual language as your single-height field) */}
      <div className="relative rounded-md border bg-muted/10 p-2">
        <svg
          viewBox={`0 0 ${chart.width} ${chart.height}`}
          className="block h-auto w-full"
          role="img"
          aria-label="Height distributions (men & women) with selected range"
        >
          {/* x-axis */}
          <line
            x1={chart.margin.l}
            x2={chart.width - chart.margin.r}
            y1={chart.y0}
            y2={chart.y0}
            stroke="currentColor"
            opacity={0.2}
          />
          {/* selected band */}
          <rect
            x={Math.min(chart.xMin, chart.xMax)}
            y={chart.margin.t}
            width={Math.max(1, Math.abs(chart.xMax - chart.xMin))}
            height={chart.y0 - chart.margin.t}
            fill="currentColor"
            opacity={0.08}
            rx={2}
          />
          {/* densities */}
          {chart.pathMen && (
            <path d={chart.pathMen} fill="none" stroke={COLORS.men} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          )}
          {chart.pathWomen && (
            <path d={chart.pathWomen} fill="none" stroke={COLORS.women} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          )}
          {/* markers */}
          <line
            x1={chart.xMin}
            x2={chart.xMin}
            y1={chart.margin.t}
            y2={chart.y0}
            stroke="currentColor"
            strokeDasharray="4 4"
          />
          <line
            x1={chart.xMax}
            x2={chart.xMax}
            y1={chart.margin.t}
            y2={chart.y0}
            stroke="currentColor"
            strokeDasharray="4 4"
          />
        </svg>

        {showEmpty && !showError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="rounded-md bg-muted/20 px-3 py-1.5 text-xs text-muted-foreground">
              No height distributions provided. The range slider still works.
            </div>
          </div>
        )}
        {showError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex items-start gap-2 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-destructive">
              <AlertTriangle className="h-4 w-4 mt-0.5" aria-hidden />
              <div className="text-xs">
                <div className="font-medium">Distribution error</div>
                <ul className="ml-4 list-disc">
                  {errs.map((e, i) => <li key={i}>{e}</li>)}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="mt-3 flex items-center gap-3">
        <FormControl className="flex-1">
          <DualRangeSlider
            min={min}
            max={max}
            step={step}
            disabled={disabled}
            value={[currentMin, currentMax]}
            onValueChange={(vals) => {
              if (!Array.isArray(vals) || vals.length < 2) return;
              const [a, b] = vals;
              const [lo, hi] = applyCaps(a, b);
              setValue(minName, lo, { shouldDirty: true, shouldValidate: true });
              setValue(maxName, hi, { shouldDirty: true, shouldValidate: true });
            }}
          />
        </FormControl>

        {/* Numeric inputs + imperial readouts */}
        {showInputs && (
          <div className="flex items-center gap-2">
            <FormField
              control={control}
              name={minName}
              render={({ field }) => (
                <FormItem>
                  <Input
                    className="w-24"
                    type="number"
                    inputMode="numeric"
                    min={min}
                    max={max}
                    step={step}
                    disabled={disabled}
                    value={field.value ?? ''}
                    onChange={(e) => {
                      const raw = e.target.value;
                      if (raw === '') {
                        field.onChange(undefined);
                        return;
                      }
                      const n = Number(raw);
                      if (Number.isNaN(n)) return;
                      const [lo, hi] = applyCaps(n, currentMax);
                      field.onChange(lo);
                      if (hi !== currentMax) {
                        setValue(maxName, hi, { shouldDirty: true, shouldValidate: true });
                      }
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
                  <Input
                    className="w-24"
                    type="number"
                    inputMode="numeric"
                    min={min}
                    max={max}
                    step={step}
                    disabled={disabled}
                    value={field.value ?? ''}
                    onChange={(e) => {
                      const raw = e.target.value;
                      if (raw === '') {
                        field.onChange(undefined);
                        return;
                      }
                      const n = Number(raw);
                      if (Number.isNaN(n)) return;
                      const [lo, hi] = applyCaps(currentMin, n);
                      field.onChange(hi);
                      if (lo !== currentMin) {
                        setValue(minName, lo, { shouldDirty: true, shouldValidate: true });
                      }
                    }}
                  />
                </FormItem>
              )}
            />

            {/* Imperial readouts (subtle) */}
            <div
              className="min-w-[3.5rem] text-right text-xs text-muted-foreground tabular-nums"
              title={`${imperialMinSpoken} to ${imperialMaxSpoken}`}
              aria-live="polite"
            >
              {imperialMinCompact && imperialMaxCompact && <>≈ {imperialMinCompact}–{imperialMaxCompact}</>}
            </div>
            <span className="sr-only">
              Approximately {imperialMinSpoken} to {imperialMaxSpoken}
            </span>
          </div>
        )}
      </div>

      {/* Legend — men first */}
      <div className="mt-2 flex items-center gap-4 text-xs">
        {distributions?.men && (
          <span className="inline-flex items-center gap-2 text-muted-foreground">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: COLORS.men }} />
            Men
          </span>
        )}
        {distributions?.women && (
          <span className="inline-flex items-center gap-2 text-muted-foreground">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: COLORS.women }} />
            Women
          </span>
        )}
        <span className="ml-auto text-muted-foreground/70">
          {min}–{max} cm
        </span>
      </div>

      {/* Helper text when constraints are active */}
      {Number.isFinite(selfHeight as number) && (minCap < max || maxFloor > min) && (
        <div className="mt-1 text-xs text-muted-foreground">
          Range limited relative to your height: min ≤ {Math.round(minCap)} cm (≈ +9%), max ≥ {Math.round(maxFloor)} cm (≈ −9%).
        </div>
      )}
    </FormItem>
  );
}
