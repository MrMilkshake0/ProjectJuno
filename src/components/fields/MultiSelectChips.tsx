import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useState } from 'react';
import FieldStatus from '../FieldStatus';

export default function MultiSelectChips({ name, label, options, allowCustom=false, unique=true }: { name: string; label: string; options: readonly string[]; allowCustom?: boolean; unique?: boolean; }) {
  const { setValue } = useFormContext();
  const values: string[] = useWatch({ name }) || [];
  const [custom, setCustom] = useState('');

  const add = (v: string) => {
    if (!v) return;
    const next = unique ? Array.from(new Set([...(values||[]), v])) : [ ...(values||[]), v ];
    setValue(name, next, { shouldValidate: true, shouldDirty: true });
  };
  const remove = (v: string) => setValue(name, (values||[]).filter(x => x !== v), { shouldValidate: true, shouldDirty: true });

  return (
    <div className="space-y-2">
      <div className="text-sm font-medium">{label}</div>
      <div className="flex flex-wrap gap-2">
        {options.map(o => (
          <Badge key={o} variant={values.includes(o) ? 'default' : 'secondary'} className="cursor-pointer" onClick={() => add(o)}>
            {o}
          </Badge>
        ))}
      </div>
      {allowCustom && (
        <div className="flex gap-2 mt-2">
          <Input value={custom} onChange={e=>setCustom(e.target.value)} placeholder="Add custom" />
          <Button type="button" onClick={()=>{ add(custom.trim()); setCustom(''); }}>Add</Button>
        </div>
      )}
      <div className="flex flex-wrap gap-2 mt-2">
        {(values||[]).map(v => (
          <Badge key={v} variant="outline" className="pr-1">
            {v}
            <button className="ml-1" onClick={(e)=>{e.preventDefault(); remove(v);}} aria-label={`remove ${v}`}>
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
      <FieldStatus name={name} />
    </div>
  );
}