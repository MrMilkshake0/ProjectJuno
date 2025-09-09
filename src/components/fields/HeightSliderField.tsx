// src/components/fields/HeightSliderField.tsx
'use client';

import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormItem, FormLabel, FormField, FormControl } from '@/components/ui/form';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { AlertTriangle } from 'lucide-react';

export interface HeightSliderFieldProps {
  name: string;
  label: string;
  min?: number; // optional, default 120
  max?: number; // optional, default 220
  step?: number;
  disabled?: boolean;
  className?: string;
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

export default function HeightSliderField({
  name,
  label,
  min = 120,
  max = 220,
  step = 1,
  disabled = false,
  className,
  distributions,
}: HeightSliderFieldProps) {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        // keep SliderField’s draft/commit UX
        const [draft, setDraft] = React.useState<string>(
          field.value === undefined || field.value === null ? '' : String(field.value)
        );

        React.useEffect(() => {
          const v = field.value;
          setDraft(v === undefined || v === null ? '' : String(v));
        }, [field.value]);

        const commit = React.useCallback(() => {
          if (draft.trim() === '') {
            field.onChange(undefined);
            return;
          }
          const n = Number(draft);
          if (Number.isNaN(n)) {
            const v = field.value;
            setDraft(v === undefined || v === null ? '' : String(v));
            return;
          }
          field.onChange(clamp(Math.round(n / step) * step, min, max));
        }, [draft, field, min, max, step]);

        const current = typeof field.value === 'number' ? clamp(field.value, min, max) : min;
        const imperialCompact = React.useMemo(() => fmtImperialCompact(current), [current]);
        const imperialSpoken = React.useMemo(() => fmtImperialSpoken(current), [current]);

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

        // chart paths (match IncomeRangeWithChartField look)
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
            const d = (usable as any)[k] as { mean: number; stddev: number } | undefined;
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

          const xMarker = xToSvg(current);

          return { width, height, margin, y0, pathMen: paths.men ?? '', pathWomen: paths.women ?? '', xMarker };
        }, [usable, min, max, current]);

        const showEmpty = !hasAny;
        const showError = errs.length > 0;

        return (
          <FormItem className={className}>
            <FormLabel>{label}</FormLabel>

            {/* Chart (same container styling as IncomeRangeWithChartField) */}
            <div className="relative rounded-md border bg-muted/10 p-2">
              <svg
                viewBox={`0 0 ${chart.width} ${chart.height}`}
                className="block h-auto w-full"
                role="img"
                aria-label="Height distributions (men & women)"
              >
                <line
                  x1={chart.margin.l}
                  x2={chart.width - chart.margin.r}
                  y1={chart.y0}
                  y2={chart.y0}
                  stroke="currentColor"
                  opacity={0.2}
                />
                {chart.pathMen && (
                  <path d={chart.pathMen} fill="none" stroke={COLORS.men} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                )}
                {chart.pathWomen && (
                  <path d={chart.pathWomen} fill="none" stroke={COLORS.women} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                )}
                <line
                  x1={chart.xMarker}
                  x2={chart.xMarker}
                  y1={chart.margin.t}
                  y2={chart.y0}
                  stroke="currentColor"
                  strokeDasharray="4 4"
                />
              </svg>

              {showEmpty && !showError && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-md bg-muted/20 px-3 py-1.5 text-xs text-muted-foreground">
                    No height distributions provided. The slider still works.
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
                <Slider
                  min={min}
                  max={max}
                  step={step}
                  disabled={disabled}
                  value={[typeof field.value === 'number' ? field.value : min]}
                  onValueChange={(arr) => field.onChange(arr?.[0])}
                />
              </FormControl>

              <div className="flex items-center gap-2">
                <Input
                  className="w-28"
                  type="number"
                  inputMode="numeric"
                  min={min}
                  max={max}
                  step={step}
                  disabled={disabled}
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onBlur={commit}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      commit();
                      (e.target as HTMLInputElement).blur();
                    }
                  }}
                />

                {/* Clean imperial readout (read-only, subtle) */}
                <div
                  className="min-w-[3.5rem] text-right text-xs text-muted-foreground tabular-nums"
                  title={imperialSpoken}
                  aria-live="polite"
                >
                  {imperialCompact && <>≈ {imperialCompact}</>}
                </div>
                <span className="sr-only">Approximately {imperialSpoken}</span>
              </div>
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
          </FormItem>
        );
      }}
    />
  );
}
