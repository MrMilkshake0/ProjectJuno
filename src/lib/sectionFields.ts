import { useForm } from 'react-hook-form';

// exact field names per section, grouped
export const SECTION_FIELDS: Record<
  string,
  (form: ReturnType<typeof useForm>) => string[]
> = {
  social: () => [
    'social_footprints.social_links.facebook',
    'social_footprints.social_links.instagram',
    'social_footprints.social_links.email',
    'social_footprints.social_links.phone',
    'social_footprints.close_friend_count',
  ],

  demo: () => [
    'demographics.age',
    'demographics.gender',
    'demographics.location.city',
    'demographics.location.country',
    'demographics.location.latitude',
    'demographics.location.longitude',
    'demographics.education_level',
    'demographics.occupation',
    'demographics.income_bracket.min',
    'demographics.income_bracket.max',
    'demographics.ethnicity',
    'demographics.ethnicity_otherText',
    'demographics.languages_spoken',
  ],

  partner: () => [
    'partner_preferences.demographics.age_range.min',
    'partner_preferences.demographics.age_range.max',
    'partner_preferences.demographics.age_range.importance',
    'partner_preferences.demographics.genders',
    'partner_preferences.values_beliefs.religion',
    'partner_preferences.values_beliefs.religious_observance',
    'partner_preferences.values_beliefs.political_ideology',
    'partner_preferences.lifestyle.smoking',
    'partner_preferences.lifestyle.dietary_preferences',
    'partner_preferences.physical_preferences.height_range_cm.min',
    'partner_preferences.physical_preferences.height_range_cm.max',
    'partner_preferences.physical_preferences.height_range_cm.importance',
    'partner_preferences.physical_preferences.body_types',
    'partner_preferences.communication_style.conflict_resolution',
  ],

  values: () => [
    'values_beliefs.religion',
    'values_beliefs.religious_observance',
    'values_beliefs.political_ideology',
    'values_beliefs.desire_children',
    'values_beliefs.marriage_ideal_timeline_years',
  ],

  rel: (f) => {
    const names = [
      'relationship_history.desired_relationship_type',
      'relationship_history.desired_milestones_timeline.engagement_years.min',
      'relationship_history.desired_milestones_timeline.engagement_years.max',
      'relationship_history.desired_milestones_timeline.children_years.min',
      'relationship_history.desired_milestones_timeline.children_years.max',
      'relationship_history.relocation_willingness',
    ];
    const rows = f.getValues('relationship_history.past_relationships') as Array<any> | undefined;
    rows?.forEach((_, i) => {
      names.push(
        `relationship_history.past_relationships.${i}.duration_months`,
        `relationship_history.past_relationships.${i}.end_reason`,
        `relationship_history.past_relationships.${i}.co_parenting`,
      );
    });
    return names;
  },

  life: () => [
    'lifestyle.fitness.frequency_per_week',
    'lifestyle.fitness.activities',
    'lifestyle.dietary_preferences',
    'lifestyle.sleep_pattern.bedtime',
    'lifestyle.sleep_pattern.wake_time',
    'lifestyle.travel.trips_per_year',
    'lifestyle.travel.favorite_destinations',
    'lifestyle.hobbies',
    'lifestyle.substance_use.smoking',
    'lifestyle.substance_use.alcohol_use',
    'lifestyle.substance_use.drugs',
    'lifestyle.pet_ownership',
  ],

  phys: () => [
    'physical_info.self.height_cm',
    'physical_info.self.body_type',
    'physical_info.self.style',
    'physical_info.body_types',
  ],

  comm: () => [
    'communication_style.messages_per_day.min',
    'communication_style.messages_per_day.max',
    'communication_style.conflict_resolution_style',
    'communication_style.humor_style',
  ],
};
