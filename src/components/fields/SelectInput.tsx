import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import FieldStatus from '../FieldStatus';
import { useFormContext } from 'react-hook-form';

export default function SelectInput({ name, label, options, placeholder }: { name: string; label: string; options: readonly string[]; placeholder?: string; }) {
  const form = useFormContext();
  return (
    <FormField control={form.control} name={name} render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger><SelectValue placeholder={placeholder || 'Select...'} /></SelectTrigger>
            <SelectContent>
              {options.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}
            </SelectContent>
          </Select>
        </FormControl>
        <FieldStatus name={name} />
      </FormItem>
    )} />
  );
}