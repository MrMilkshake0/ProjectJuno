import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import FieldStatus from '../FieldStatus';
import { useFormContext } from 'react-hook-form';

export default function NumberInput({ name, label, min, max }: { name: string; label: string; min?: number; max?: number; }) {
  const form = useFormContext();
  return (
    <FormField control={form.control} name={name} render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Input type="number" inputMode="numeric" min={min} max={max}
            onChange={e => field.onChange(e.target.value === '' ? undefined : Number(e.target.value))}
            value={field.value ?? ''}
          />
        </FormControl>
        <FieldStatus name={name} />
      </FormItem>
    )} />
  );
}