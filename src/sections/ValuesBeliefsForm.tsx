import SectionCard from '@/components/SectionCard';
import SelectInput from '@/components/fields/SelectInput';
import { RELIGIONS, OBS, POLITICAL } from '@/lib/constants';
import { Switch } from '@/components/ui/switch';
import { FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import FieldStatus from '@/components/FieldStatus';
import { useFormContext, useWatch } from 'react-hook-form';
import RangeSliderField from '@/components/fields/RangeSliderField';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Info } from "lucide-react"

export default function ValuesBeliefsForm() {
  const form = useFormContext();
  const desireChildren = useWatch({ control: form.control, name: 'values_beliefs.desire_children' });

  return (
    <SectionCard title="Values & Beliefs">
      <div className="grid gap-4">
        <SelectInput name="values_beliefs.religion" label="Religion" options={RELIGIONS} />
        <SelectInput name="values_beliefs.religious_observance" label="Religious Observance" options={OBS} />
        <SelectInput name="values_beliefs.political_ideology" label="Political Ideology" options={POLITICAL} />

        {/* Engagement timeline slider (above children) */}
        <div className="flex items-center gap-2 mb-2 text-sm font-medium">
          Desired Milestones Timeline
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground cursor-pointer" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Being on completely different timelines can get awkward, this aims to help align expectations.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <RangeSliderField
          base="relationship_history.desired_milestones_timeline.engagement_years"
          label="Engagement (years after dating)"
          min={0}
          max={10}
          step={0.5}
          showInputs
        />

        {/* Toggle for desire children */}
        <FormField
          control={form.control}
          name="values_beliefs.desire_children"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between">
              <FormLabel>Desire Children</FormLabel>
              <FormControl>
                <Switch checked={!!field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FieldStatus name="values_beliefs.desire_children" />
            </FormItem>
          )}
        />

        {/* Conditionally show children timeline slider */}
        {desireChildren && (
          <RangeSliderField
            base="relationship_history.desired_milestones_timeline.children_years"
            label="Children (years after engagement)"
            min={0}
            max={20}
            step={0.5}
            showInputs
          />
        )}
      </div>
    </SectionCard>
  );
}
