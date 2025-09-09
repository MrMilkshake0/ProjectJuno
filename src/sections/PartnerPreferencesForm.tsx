import SectionCard from '@/components/SectionCard';
import MultiSelectChips from '@/components/fields/MultiSelectChips';
import { GENDERS, DIET, BODY_TYPES, CONFLICT, OBS, POLITICAL, RELIGIONS, SUB_FREQ } from '@/lib/constants';
import RangeSliderField from '@/components/fields/RangeSliderField';
import SliderField from '@/components/fields/SliderField';
import HeightRangeSliderField from '@/components/fields/HeightRangeSliderField';

export default function PartnerPreferencesForm() {
  return (
    <SectionCard title="Partner Preferences">
      <div className="space-y-8">
        <div className="space-y-3">
          <div className="text-sm font-medium">Demographics</div>
          <RangeSliderField base="partner_preferences.demographics.age_range" label="Age Range" min={18} max={100} step={1} />
          <SliderField name="partner_preferences.demographics.age_range.importance" label="Age Range Importance (0-1)" min={0} max={1} step={0.01} />
          <MultiSelectChips name="partner_preferences.demographics.genders" label="Preferred Genders *" options={GENDERS} />
        </div>
          <div className="space-y-3">
          <div className="text-sm font-medium">Physical</div>
          <HeightRangeSliderField
                    base="partner_preferences.physical_preferences.height_range_cm"
                    label="Height (cm) *"
                    min={140}
                    max={210}
                    step={1}
                    distributions={{
                      men: { mean: 177, stddev: 7 },
                      women: { mean: 164, stddev: 6 }
                    }}
          />
          <SliderField name="partner_preferences.physical_preferences.height_range_cm.importance" label="Height Importance (0-1)" min={0} max={1} step={0.01} />
          <MultiSelectChips name="partner_preferences.physical_preferences.body_types" label="Body Types" options={BODY_TYPES} />
        </div>
        {/* psychometrics intentionally skipped */}

        <div className="space-y-3">
          <div className="text-sm font-medium">Values & Beliefs</div>
          <MultiSelectChips name="partner_preferences.values_beliefs.religion" label="Religion" options={RELIGIONS} />
          <MultiSelectChips name="partner_preferences.values_beliefs.religious_observance" label="Religious Observance" options={OBS} />
          <MultiSelectChips name="partner_preferences.values_beliefs.political_ideology" label="Political Ideology" options={POLITICAL} />
        </div>

        <div className="space-y-3">
          <div className="text-sm font-medium">Lifestyle</div>
          <MultiSelectChips name="partner_preferences.lifestyle.smoking" label="Smoking" options={SUB_FREQ} />
          <MultiSelectChips name="partner_preferences.lifestyle.alcohol_use" label="Alcohol Use" options={SUB_FREQ} />
          <MultiSelectChips name="partner_preferences.lifestyle.drug" label="Drug Use" options={SUB_FREQ} />
          <MultiSelectChips name="partner_preferences.lifestyle.dietary_preferences" label="Dietary Preferences" options={DIET} />
        </div>
        <div className="space-y-3">
          <div className="text-sm font-medium">Communication Styles</div>
          <MultiSelectChips name="partner_preferences.communication_style.conflict_resolution" label="Conflict Resolution (You can handle)" options={CONFLICT} />
        </div>
      </div>
    </SectionCard>
  );
}