import SectionCard from '@/components/SectionCard';
import SelectInput from '@/components/fields/SelectInput';
import { FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import FieldStatus from '@/components/FieldStatus';
import { useFormContext } from 'react-hook-form';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

export default function RelationshipHistoryForm() {
  const { control } = useFormContext();

  return (
    <SectionCard title="Relationship History">
      <div className="grid gap-6">
        {/* Desired Relationship Type + tooltip */}
        <div className="space-y-2">
          <div className="text-sm font-medium flex items-center gap-2">
            Desired Relationship Type *
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-muted-foreground cursor-pointer" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>My vision for this is to be a more serious relationship app</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {/* If your SelectInput requires a label, use label="" to avoid duplicate visible text */}
          <SelectInput
            name="relationship_history.desired_relationship_type"
            label=""
            options={['casual', 'serious', 'marriage']}
          />
        </div>

        {/* Relocation willingness */}
        <FormField
          control={control}
          name="relationship_history.relocation_willingness"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between">
              <FormLabel>Willing to Relocate</FormLabel>
              <FormControl>
                <Switch
                  checked={!!field.value}
                  onCheckedChange={field.onChange}
                  onBlur={field.onBlur}
                  name={field.name}
                  ref={field.ref}
                />
              </FormControl>
              <FieldStatus name="relationship_history.relocation_willingness" />
            </FormItem>
          )}
        />
      </div>
    </SectionCard>
  );
}
