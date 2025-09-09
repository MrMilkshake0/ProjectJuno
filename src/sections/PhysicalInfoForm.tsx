import SectionCard from '@/components/SectionCard';
import SelectInput from '@/components/fields/SelectInput';
import HeightSliderField from '@/components/fields/HeightSliderField';

import { BODY_TYPES } from '@/lib/constants';

export default function PhysicalInfoForm() {
  return (
    <SectionCard title="Physical Info">
      <div className="grid gap-4">
        <HeightSliderField
          name="physical_info.self.height_cm"
          label="Height (cm) *"
          min={140}
          max={210}
          step={1}
          distributions={{
            men: { mean: 177, stddev: 7 },
            women: { mean: 164, stddev: 6 }
          }}
        />
        <SelectInput name="physical_info.self.body_type" label="Your Body Type" options={BODY_TYPES}/>
      </div>
    </SectionCard>
  );
}