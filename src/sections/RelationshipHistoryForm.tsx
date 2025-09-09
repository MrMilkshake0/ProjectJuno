import SectionCard from '@/components/SectionCard';
import SelectInput from '@/components/fields/SelectInput';
import NumberInput from '@/components/fields/NumberInput';
import TextInput from '@/components/fields/TextInput';
import { FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import FieldStatus from '@/components/FieldStatus';
import { Button } from '@/components/ui/button';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

export default function RelationshipHistoryForm() {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'relationship_history.past_relationships',
  });

  return (
    <SectionCard title="Relationship History">
      <div className="grid gap-6">
        {/* Past Relationships + tooltip */}
        <div className="space-y-2">
          <div className="text-sm font-medium flex items-center gap-2">
            Past Relationships
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-muted-foreground cursor-pointer" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs whitespace-normal">
                  <p>
                    Ngl this is completely optional. When I was sketching out the architecture,
                    I thought the ML system I intend to use could maybe catch some small patterns and correlations
                    here, but this is too broad (Who knows maybe one day). 
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>


          {fields.map((f, i) => (
            <div key={f.id} className="grid md:grid-cols-3 gap-4 items-end">
              <NumberInput
                name={`relationship_history.past_relationships.${i}.duration_months`}
                label="Duration (months)"
              />
              <TextInput
                name={`relationship_history.past_relationships.${i}.end_reason`}
                label="End Reason"
              />

              {/* Switch to store a real boolean */}
              <FormField
                control={control}
                name={`relationship_history.past_relationships.${i}.co_parenting`}
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <FormLabel>Co-parenting</FormLabel>
                    <FormControl>
                      <Switch
                        checked={!!field.value}
                        onCheckedChange={field.onChange}
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button variant="ghost" type="button" onClick={() => remove(i)}>
                Remove
              </Button>
            </div>
          ))}

          <Button
            type="button"
            onClick={() =>
              append({ duration_months: undefined, end_reason: '', co_parenting: false })
            }
          >
            Add Relationship
          </Button>
        </div>

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

          {/* If your SelectInput requires a label, use label="" to avoid duplicate visible text.
             If it supports hiding labels, pass the appropriate prop instead. */}
          <SelectInput
            name="relationship_history.desired_relationship_type"
            label="" // suppress duplicate label row above
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
