import SectionCard from '@/components/SectionCard';
import RangeSliderField from '@/components/fields/RangeSliderField';
import SelectInput from '@/components/fields/SelectInput';
import { CONFLICT, HUMOR } from '@/lib/constants';

export default function CommunicationStyleForm() {
  return (
    <SectionCard title="Communication Style">
      <div className="grid gap-4">
        <RangeSliderField base="communication_style.messages_per_day" label="Messages per Day" min={0} max={100} step={1} />
        <SelectInput name="communication_style.conflict_resolution_style" label="Conflict Resolution Style" options={CONFLICT} />
        <SelectInput name="communication_style.humor_style" label="Humor Style" options={HUMOR} />
      </div>
    </SectionCard>
  );
}