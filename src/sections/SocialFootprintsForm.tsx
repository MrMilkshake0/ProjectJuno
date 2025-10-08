import SectionCard from '@/components/SectionCard'
import TextInput from '@/components/fields/TextInput'
import SliderField from '@/components/fields/SliderField'
import { Info } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

export default function SocialFootprintsForm() {
  return (
    <SectionCard title="Social Footprints">
      {/* Best practice: one provider per form/section */}
      <TooltipProvider delayDuration={150}>
        <div className="grid gap-4">
          <SliderField
            name="social_footprints.close_friend_count"
            label="Close friend count"
            min={0}
            max={10}
            step={1}
          />

          {/* Label row with tooltip (works like your example) */}
          <div className="text-sm font-medium flex items-center gap-2">
            YouTube
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground cursor-pointer" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs whitespace-normal">
                <p>If you are willing, make your profile/subscriptions public. I always dreamed of making a network graph and potentially matching based on the clusters that naturally occur.</p>
              </TooltipContent>
            </Tooltip>
          </div>

          <TextInput
            name="social_footprints.social_links.youtube"
            label=""
            placeholder="youtube.com/@yourname"
          />

          <TextInput
            name="social_footprints.social_links.instagram"
            label="Instagram"
            placeholder="@handle"
          />
          <TextInput
            name="social_footprints.social_links.discord"
            label="Discord"
            placeholder="UserID or Username#0000"
          />
          <TextInput
            name="social_footprints.social_links.email"
            label="Email"
            placeholder="name@example.com"
          />
          <TextInput
            name="social_footprints.social_links.phone"
            label="Phone"
            placeholder="+61..."
          />
        </div>
      </TooltipProvider>
    </SectionCard>
  )
}
