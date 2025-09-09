export type Gender = 'male' | 'female' | 'other';
export type Religion = 'agnostic'|'atheist'|'buddhist'|'christian'|'hindu'|'jewish'|'muslim'|'sikh'|'spiritual not religious'|'other'|'prefer not to say';
export type Political = 'very left'|'left'|'center-left'|'center'|'center-right'|'right'|'very right'|'prefer not to say'|'other';
export type SubstanceFreq = 'none'|'rarely'|'socially'|'weekends'|'most days';
export type SmokePref = 'no'|'social'|'occasionally'|'regular'|'trying to quit';
export type BodyType = 'slim'|'average'|'athletic'|'muscular'|'curvy'|'plus';
export type ConflictStyle = 'avoidance'|'compromise'|'collaboration'|'accommodation'|'competition';
export type HumorStyle = 'witty'|'dry'|'sarcastic'|'wholesome'|'slapstick'|'dark'|'goofy'|'none';

export interface UserProfileOut { // FINAL OUTPUT SHAPE — NO PSYCHOMETRICS
  user_id: string;
  social_footprints?: {
    social_links?: { facebook?: string; instagram?: string; email?: string; phone?: string; };
    close_friend_count?: number;
  };
  demographics: {
    age: number; gender: Gender;
    location?: { latitude?: number; longitude?: number; city?: string; country: string };
    education_level?: 'High school'|'Vocational/Trade'|'Associate/Diploma'|"Bachelor's"|"Master's"|'Doctorate'|'Other'|'Prefer not to say';
    occupation?: string;
    income_bracket?: { min?: number; max?: number };
    ethnicity?: 'East Asian'|'South Asian'|'Southeast Asian'|'Middle Eastern/North African'|'Black/African'|'Latine/Hispanic'|'Indigenous'|'White/European'|'Mixed'|'Another / self-described'|'Prefer not to say';
    languages_spoken?: ( 'English'|'Spanish'|'Mandarin'|'Hindi'|'Arabic'|'French'|'Bengali'|'Portuguese'|'Russian'|'Urdu'|'Indonesian'|'German'|'Japanese'|'Korean'|'Italian'|'Other' )[];
  };
  partner_preferences?: {
    demographics?: {
      age_range: { min?: number; max?: number; importance?: number };
      genders: Gender[]; // importance provided in UI but not included in output due to schema ambiguity
    };
    // psychometrics skipped
    values_beliefs?: {
      desire_children?: boolean; // importance slider in UI only
      religion?: Religion[]; // importance in UI only
      religious_observance?: ('none'|'occasional'|'regular'|'devout')[]; // importance in UI only
      political_ideology?: Political[]; // importance in UI only
    };
    lifestyle?: {
      smoking?: SubstanceFreq[]; // importance in UI only
      dietary_preferences?: ('no preference'|'vegetarian'|'vegan'|'pescatarian'|'halal'|'kosher'|'low-carb/keto'|'gluten-free'|'dairy-free'|'other')[]; // importance in UI only
    };
    physical_preferences?: {
      height_range_cm?: { min?: number; max?: number; importance?: number };
      body_types?: BodyType[]; // importance in UI only
    };
    communication_style?: { conflict_resolution?: ConflictStyle; /* importance in UI only */ };
  };
  values_beliefs?: {
    religion?: Religion;
    religious_observance?: 'none'|'occasional'|'regular'|'devout';
    political_ideology?: Political;
    desire_children?: boolean;
    marriage_ideal_timeline_years?: number;
  };
  relationship_history?: {
    past_relationships?: { duration_months?: number; end_reason?: string; co_parenting?: boolean }[];
    desired_relationship_type: 'casual'|'serious'|'marriage';
    desired_milestones_timeline?: {
      engagement_years?: { min?: number; max?: number };
      children_years?: { min?: number; max?: number };
    };
    relocation_willingness?: boolean;
  };
  lifestyle?: {
    fitness?: { frequency_per_week?: number; activities?: ( 'gym/weights'|'running'|'cycling'|'yoga/pilates'|'team sports'|'hiking'|'swimming'|'dance'|'martial arts'|'other' )[] };
    dietary_preferences?: ('no preference'|'vegetarian'|'vegan'|'pescatarian'|'halal'|'kosher'|'low-carb/keto'|'gluten-free'|'dairy-free'|'other')[];
    sleep_pattern?: { bedtime?: string; wake_time?: string };
    travel?: { trips_per_year?: number; favorite_destinations?: string[] };
    hobbies?: string[];
    substance_use?: { smoking?: SmokePref; alcohol_use?: SubstanceFreq; drugs?: SubstanceFreq };
    pet_ownership?: ('dog'|'cat'|'small mammals'|'birds'|'reptiles'|'fish'|'none'|'allergic'|'open to pets')[];
  };
  physical_info?: { self?: { height_cm?: number; body_type?: string; style?: string }; body_types?: BodyType };
  communication_style?: {
    messages_per_day?: { min?: number; max?: number };
    conflict_resolution_style?: ConflictStyle;
    humor_style?: HumorStyle;
  };
}