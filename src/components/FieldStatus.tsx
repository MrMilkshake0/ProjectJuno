import { useFormContext } from 'react-hook-form';
import { FormMessage } from '@/components/ui/form';
import { Check } from 'lucide-react';

export default function FieldStatus({ name }: { name: string }) {
  const { formState: { errors }, getFieldState } = useFormContext();
  const state = getFieldState(name);
  if (state.error) return <FormMessage>{state.error.message as string}</FormMessage>;
  if (state.isTouched) return (
    <div className="text-xs text-muted-foreground flex items-center gap-1">
      <Check className="h-3 w-3" /> Looks good
    </div>
  );
  return null;
}