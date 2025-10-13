import SectionCard from '@/components/SectionCard';
import SelectInput from '@/components/fields/SelectInput';
import { RELIGIONS, OBS, POLITICAL } from '@/lib/constants';
import { Switch } from '@/components/ui/switch';
import { FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import FieldStatus from '@/components/FieldStatus';
import { useFormContext, useWatch } from 'react-hook-form';
import RangeSliderField from '@/components/fields/RangeSliderField';

export default function ValuesBeliefsForm() {
  const form = useFormContext();
  const desireChildren = useWatch({ control: form.control, name: 'values_beliefs.desire_children' });

  return (
    <SectionCard title="Values & Beliefs">
      <div className="grid gap-4">
        <SelectInput name="values_beliefs.religion" label="Religion" options={RELIGIONS} />
        <SelectInput name="values_beliefs.religious_observance" label="Religious Observance" options={OBS} />
        <SelectInput name="values_beliefs.political_ideology" label="Political Ideology" options={POLITICAL} />

        {/* ===== Milestone Timelines ===== */}
        <RangeSliderField
          base="relationship_history.desired_milestones_timeline.dating_start_years"
          label="Time to Start Dating Seriously (years from meeting)"
          min={0}
          max={3}
          step={0.25}
          showInputs
        />

        <RangeSliderField
          base="relationship_history.desired_milestones_timeline.engagement_years"
          label="Engagement (years after dating begins)"
          min={0}
          max={6}
          step={0.5}
          showInputs
        />

        <RangeSliderField
          base="relationship_history.desired_milestones_timeline.marriage_years"
          label="Marriage (years after engagement)"
          min={0}
          max={5}
          step={0.5}
          showInputs
        />

        {/* ===== Desire Children Toggle ===== */}
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

        {/* ===== Children count + timing (conditional) ===== */}
        {desireChildren && (
          <>
            <RangeSliderField
              base="values_beliefs.desired_children_count"
              label="Desired Number of Children"
              min={0}
              max={6}
              step={1}
              showInputs
            />

            <RangeSliderField
              base="relationship_history.desired_milestones_timeline.children_years"
              label="Children (years after marriage)"
              min={0}
              max={12}
              step={0.5}
              showInputs
            />
          </>
        )}
      </div>
    </SectionCard>
  );
}
