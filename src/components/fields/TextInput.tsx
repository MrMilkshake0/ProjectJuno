import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import FieldStatus from '../FieldStatus';
import { useFormContext } from 'react-hook-form';

export default function TextInput({ name, label, placeholder }: { name: string; label: string; placeholder?: string; }) {
  const form = useFormContext();
  return (
    <FormField control={form.control} name={name} render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Input {...field} placeholder={placeholder} />
        </FormControl>
        <FieldStatus name={name} />
      </FormItem>
    )} />
  );
}