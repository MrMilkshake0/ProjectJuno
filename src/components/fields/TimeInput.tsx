'use client';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FieldStatus from "../FieldStatus";
import { useFormContext } from "react-hook-form";
import { useMemo } from "react";

type TimeInputProps = {
  name: string;
  label: string;
  /** Minutes between options: 5, 10, 15, 30… (default 15) */
  interval?: number;
  placeholder?: string;
  disabled?: boolean;
};

function pad(n: number) {
  return String(n).padStart(2, "0");
}
function toDisplay12h(value: string) {
  const [h, m] = value.split(":").map(Number);
  const ampm = h < 12 ? "AM" : "PM";
  const h12 = h % 12 || 12;
  return `${pad(h12)}:${pad(m)} ${ampm}`;
}
function buildTimes(interval: number) {
  const list: { value: string; label: string }[] = [];
  for (let t = 0; t < 24 * 60; t += interval) {
    const h = Math.floor(t / 60);
    const m = t % 60;
    const value = `${pad(h)}:${pad(m)}`; // stored as 24h "HH:MM"
    list.push({ value, label: toDisplay12h(value) });
  }
  return list;
}

export default function TimeInput({
  name,
  label,
  interval = 15,
  placeholder = "Select time…",
  disabled,
}: TimeInputProps) {
  const form = useFormContext();
  const options = useMemo(() => buildTimes(interval), [interval]);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Select
              value={field.value ?? ""}
              onValueChange={(v) => field.onChange(v)}
              disabled={disabled}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent className="max-h-64">
                {options.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FieldStatus name={name} />
        </FormItem>
      )}
    />
  );
}
