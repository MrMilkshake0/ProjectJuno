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
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import { useFormContext, Controller } from 'react-hook-form'

type PlatformKey = 'instagram' | 'discord' | 'email' | 'phone'

function ContactRow({
  platform,
  children,
  value,
  onChange,
}: {
  platform: PlatformKey
  children: React.ReactNode
  value: string | undefined
  onChange: (v: string) => void
}) {
  const id = `preferred-${platform}`
  const isSelected = value === platform

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] items-center gap-2">
      {/* Left: input */}
      <div>{children}</div>

      {/* Right: Preferred radio */}
      <div className="flex items-center justify-end md:justify-start gap-2 pr-1">
        <RadioGroup value={value} onValueChange={onChange} className="flex items-center">
          <div className="flex items-center gap-2">
            <RadioGroupItem id={id} value={platform} />
            <Label htmlFor={id} className={isSelected ? '' : 'text-muted-foreground'}>
              Preferred
            </Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  )
}

export default function SocialFootprintsForm() {
  const { control } = useFormContext()

  return (
    <SectionCard title="Social Footprints">
      <TooltipProvider delayDuration={150}>
        <div className="grid gap-4">
          <SliderField
            name="social_footprints.close_friend_count"
            label="Close friend count"
            min={0}
            max={10}
            step={1}
          />

          {/* ===== YouTube Section (no preferred contact) ===== */}
          <div className="text-sm font-medium flex items-center gap-2 mt-2">
            YouTube
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground cursor-pointer" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs whitespace-normal">
                <p>
                  If you are willing, make your profile/subscriptions public. I always dreamed
                  of making a network graph and potentially matching based on the clusters
                  that naturally occur.
                </p>
              </TooltipContent>
            </Tooltip>
          </div>

          <TextInput
            name="social_footprints.social_links.youtube"
            label=""
            placeholder="youtube.com/@yourname"
          />

          {/* ===== Separator between YouTube and actual socials ===== */}
          <Separator className="my-4" />

          {/* ===== Real contact socials with preferred picker ===== */}
          <Controller
            control={control}
            name="social_footprints.preferred_contact"
            defaultValue={undefined as unknown as string}
            render={({ field: { value, onChange } }) => (
              <div className="grid gap-3">
                <ContactRow platform="instagram" value={value} onChange={onChange}>
                  <TextInput
                    name="social_footprints.social_links.instagram"
                    label="Instagram"
                    placeholder="@handle"
                  />
                </ContactRow>

                <ContactRow platform="discord" value={value} onChange={onChange}>
                  <TextInput
                    name="social_footprints.social_links.discord"
                    label="Discord"
                    placeholder="UserID or Username#0000"
                  />
                </ContactRow>

                <ContactRow platform="email" value={value} onChange={onChange}>
                  <TextInput
                    name="social_footprints.social_links.email"
                    label="Email"
                    placeholder="name@example.com"
                  />
                </ContactRow>

                <ContactRow platform="phone" value={value} onChange={onChange}>
                  <TextInput
                    name="social_footprints.social_links.phone"
                    label="Phone"
                    placeholder="+61..."
                  />
                </ContactRow>

                {/* Optional: Clear preference */}
                <div className="flex items-center justify-end gap-2 pt-1">
                  <RadioGroup value={value} onValueChange={onChange} className="flex items-center">
                    <RadioGroupItem id="preferred-none" value="" />
                    <Label htmlFor="preferred-none" className="text-muted-foreground">
                      No preference
                    </Label>
                  </RadioGroup>
                </div>
              </div>
            )}
          />
        </div>
      </TooltipProvider>
    </SectionCard>
  )
}
