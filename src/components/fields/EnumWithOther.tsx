import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import FieldStatus from '../FieldStatus';
import { useFormContext, useWatch } from 'react-hook-form';

export default function EnumWithOther({ name, label, options, otherKey = 'Other', otherTextName }: { name: string; label: string; options: readonly string[]; otherKey?: string; otherTextName: string; }) {
  const form = useFormContext();
  const sel = useWatch({ name });
  return (
    <FormField control={form.control} name={name} render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger><SelectValue placeholder="Select..."/></SelectTrigger>
            <SelectContent>
              {options.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}
            </SelectContent>
          </Select>
        </FormControl>
        {sel === otherKey && (
          <FormField control={form.control} name={otherTextName} render={({ field: ot }) => (
            <FormItem className="mt-2">
              <FormLabel>Specify other</FormLabel>
              <FormControl><Input {...ot} placeholder="Type your value" /></FormControl>
            </FormItem>
          )}/>
        )}
        <FieldStatus name={name} />
      </FormItem>
    )} />
  );
}