// src/components/fields/SliderField.tsx
import { useCallback, useEffect, useState } from 'react';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { useFormContext } from 'react-hook-form';

interface SliderFieldProps {
  name: string;
  label: string;
  min: number;
  max: number;
  step?: number;
  disabled?: boolean;
  className?: string; // optional layout hook
}

export default function SliderField({
  name,
  label,
  min,
  max,
  step = 1,
  disabled = false,
  className,
}: SliderFieldProps) {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        // Local (uncommitted) input value as a string so users can type freely
        const [draft, setDraft] = useState<string>(
          field.value === undefined || field.value === null ? '' : String(field.value)
        );

        // Keep input in sync when the field value changes externally (e.g., via slider or form reset)
        useEffect(() => {
          const v = field.value;
          setDraft(v === undefined || v === null ? '' : String(v));
        }, [field.value]);

        const clampRound = useCallback(
          (n: number) => {
            const rounded = Math.round(n / step) * step;
            return Math.min(max, Math.max(min, rounded));
          },
          [min, max, step]
        );

        const commit = useCallback(() => {
          // Empty draft clears the field (or you can choose to revert instead)
          if (draft.trim() === '') {
            field.onChange(undefined);
            return;
          }

          const n = Number(draft);
          if (Number.isNaN(n)) {
            // Revert visual draft back to current field value if input was invalid
            const v = field.value;
            setDraft(v === undefined || v === null ? '' : String(v));
            return;
          }

          field.onChange(clampRound(n));
        }, [draft, field, clampRound]);

        return (
          <FormItem className={className}>
            <FormLabel>{label}</FormLabel>
            <div className="flex items-center gap-4">
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

              <Input
                className="w-28"
                type="number"
                inputMode="numeric"
                min={min}
                max={max}
                step={step}
                disabled={disabled}
                // Use local draft so typing doesn't update the form immediately
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onBlur={commit}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    commit();
                    // Optionally blur on Enter to mimic “done”
                    (e.target as HTMLInputElement).blur();
                  }
                }}
              />
            </div>
          </FormItem>
        );
      }}
    />
  );
}
