import SectionCard from '@/components/SectionCard';
import TextInput from '@/components/fields/TextInput';
import SliderField from '@/components/fields/SliderField';

export default function SocialFootprintsForm() {
  return (
    <SectionCard title="Social Footprints">
      <div className="grid gap-4">
        <SliderField name="social_footprints.close_friend_count" label="Close friend count" min={0} max={10} step={1} />
        <TextInput name="social_footprints.social_links.facebook" label="Facebook" placeholder="fb.com/username" />
        <TextInput name="social_footprints.social_links.instagram" label="Instagram" placeholder="@handle" />
        <TextInput name="social_footprints.social_links.email" label="Email" placeholder="name@example.com" />
        <TextInput name="social_footprints.social_links.phone" label="Phone" placeholder="+61..." />
      </div>
    </SectionCard>
  );
}