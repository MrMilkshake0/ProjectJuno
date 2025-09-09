// src/components/fields/RangeSliderField.tsx
'use client';

import { FormControl, FormItem, FormLabel, FormField } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useFormContext, useWatch } from 'react-hook-form';
import { DualRangeSlider } from '@/components/ui/dual-range-slider'; // adjust path if different

interface RangeSliderFieldProps {
  base: string;          // e.g., 'partner_preferences.height_range_cm'
  label: string;
  min: number;
  max: number;
  step?: number;
  showInputs?: boolean;  // numeric inputs next to thumbs
  disabled?: boolean;
  className?: string;
}

export default function RangeSliderField({
  base,
  label,
  min,
  max,
  step = 1,
  showInputs = true,
  disabled = false,
  className,
}: RangeSliderFieldProps) {
  const { setValue, control } = useFormContext();

  const minName = `${base}.min`;
  const maxName = `${base}.max`;

  const vmin: number | undefined = useWatch({ name: minName });
  const vmax: number | undefined = useWatch({ name: maxName });

  const currentMin = typeof vmin === 'number' ? vmin : min;
  const currentMax = typeof vmax === 'number' ? vmax : max;

  const roundClamp = (n: number) =>
    Math.min(max, Math.max(min, Math.round(n / step) * step));

  const setPair = (a: number, b: number) => {
    const lo = Math.max(min, Math.min(a, b));
    const hi = Math.min(max, Math.max(a, b));
    setValue(minName, lo, { shouldDirty: true, shouldValidate: true });
    setValue(maxName, hi, { shouldDirty: true, shouldValidate: true });
  };

  return (
    <FormItem className={className}>
      <FormLabel>{label}</FormLabel>

      <div className="flex items-center gap-4">
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
              setPair(roundClamp(a), roundClamp(b));
            }}
          />
        </FormControl>

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
                      const next = Math.min(currentMax, roundClamp(n));
                      field.onChange(next);
                      if (next > currentMax) setValue(maxName, next);
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
                      const next = Math.max(currentMin, roundClamp(n));
                      field.onChange(next);
                      if (next < currentMin) setValue(minName, next);
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
