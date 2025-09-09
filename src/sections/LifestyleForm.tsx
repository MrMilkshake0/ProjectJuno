import SectionCard from '@/components/SectionCard';
import MultiSelectChips from '@/components/fields/MultiSelectChips';
import TimeInput from '@/components/fields/TimeInput';
import SelectInput from '@/components/fields/SelectInput';
import SliderField from '@/components/fields/SliderField';
import { ACTIVITIES, DIET, SUB_FREQ, FAVORITE_DESTINATIONS, HOBBIES } from '@/lib/constants';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Info } from "lucide-react"

export default function LifestyleForm() {
  return (
    <SectionCard title="Lifestyle">
      <div className="grid gap-6">
        <div className="space-y-2">
          <div className="text-sm font-medium">Fitness</div>
          <SliderField name="lifestyle.fitness.frequency_per_week" label="Workouts per Week" min={0} max={14} step={1} />
          <MultiSelectChips name="lifestyle.fitness.activities" label="Activities" options={ACTIVITIES} allowCustom />
        </div>

        <MultiSelectChips name="lifestyle.dietary_preferences" label="Dietary Preferences" options={DIET} allowCustom />

        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex items-center gap-2 col-span-full">
            <div className="text-sm font-medium">Circadian Rhythm</div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-muted-foreground cursor-pointer" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Your natural sleep–wake cycle (bedtime & wake time).</p>
                  <p>The idea is to match people who have similar sleep patterns.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <TimeInput name="lifestyle.sleep_pattern.bedtime" label="Bedtime (HH:MM)" interval={30} />
          <TimeInput name="lifestyle.sleep_pattern.wake_time" label="Wake Time (HH:MM)" interval={30} />
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium">Travel</div>
          <SliderField name="lifestyle.travel.trips_per_year" label="Trips/Vacations per Year" min={0} max={10} step={1} />
          <MultiSelectChips name="lifestyle.travel.favorite_destinations" label="Favorite Destinations" options={FAVORITE_DESTINATIONS} allowCustom unique />
        </div>

        <MultiSelectChips name="lifestyle.hobbies" label="Hobbies" options={HOBBIES} allowCustom />

        <div className="grid md:grid-cols-3 gap-4">
          <SelectInput name="lifestyle.substance_use.smoking" label="Smoking" options={SUB_FREQ} />
          <SelectInput name="lifestyle.substance_use.alcohol_use" label="Alcohol Use" options={SUB_FREQ} />
          <SelectInput name="lifestyle.substance_use.drugs" label="Drugs" options={SUB_FREQ} />
        </div>

        <MultiSelectChips
          name="lifestyle.pet_ownership"
          label="Pet Ownership"
          options={['none','dog','cat','small mammals','birds','reptiles','fish','allergic','open to pets']}
        />
      </div>
    </SectionCard>
  );
}
