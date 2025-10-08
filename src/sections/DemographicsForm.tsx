import SectionCard from '@/components/SectionCard';
import SelectInput from '@/components/fields/SelectInput';
import TextInput from '@/components/fields/TextInput';
import MultiSelectChips from '@/components/fields/MultiSelectChips';
import EnumWithOther from '@/components/fields/EnumWithOther';
import SliderField from '@/components/fields/SliderField';
import IncomeRangeWithChartField from '@/components/fields/IncomeRangeWithChartField';
import { GENDERS, LANGS , EDUCATION_LEVEL, ETHNICITY} from '@/lib/constants';

export default function DemographicsForm() {
  return (
    <SectionCard title="Demographics">
      <div className="grid gap-6">
        <SliderField name="demographics.age" label="Age *" min={18} max={100} step={1} />

        <EnumWithOther name="demographics.gender" label="Gender *" options={GENDERS} otherKey='other / self-described' otherTextName='demographics.gender_otherText' />

        <div className="grid md:grid-cols-2 gap-4">
          <TextInput name="demographics.location.city" label="City" />
          <TextInput name="demographics.location.country" label="Country *" />
        </div>

        <SelectInput
          name="demographics.education_level"
          label="Education Level"
          options={EDUCATION_LEVEL}
        />

        <TextInput name="demographics.occupation" label="Occupation" />

        {/* Replaced min/max number inputs with the dual range slider */}
        <IncomeRangeWithChartField
          base="demographics.income_bracket"
          label="Income Bracket (USD Equivalent)"
          medianUSD={70000}
          p90USD={180000}
          inputStepDollars={1000}
          sliderScale="log"   // 👈 key addition
        />


        <EnumWithOther
          name="demographics.ethnicity"
          label="Ethnicity"
          options={ETHNICITY}
          otherKey={'Another / self-described'}
          otherTextName={'demographics.ethnicity_otherText'}
        />

        <MultiSelectChips name="demographics.languages_spoken" label="Languages Spoken" options={LANGS} allowCustom/>
      </div>
    </SectionCard>
  );
}
