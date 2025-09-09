import { z } from 'zod';
import {
  GENDERS, LANGS, RELIGIONS, OBS, POLITICAL,
  BODY_TYPES, SMOKING, DIET, ACTIVITIES, SUB_FREQ, CONFLICT, HUMOR
} from './constants';

/**
 * Matches 24-hour time in "HH:MM" (00:00–23:59).
 * Example valid: "07:30", "23:59"
 * Example invalid: "7:30", "24:00"
 */
const zHHMM = z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Use 24h HH:MM');

/** Generic "importance" percentage between 0 and 1 (inclusive). */
const pct = z.number().min(0).max(1);

/**
 * Root user schema. Use `ZUser.parse(...)` to validate.
 */
export const ZUser = z.object({
  /** Unique identifier for the user in your system. */
  user_id: z.string().min(1),

  /** Optional “public/social” footprint. Entire object is optional+partial for flexibility. */
  social_footprints: z.object({
    /** Links and contact details (all optional). `.partial()` makes each key optional. */
    social_links: z.object({
      facebook: z.string().optional(),
      instagram: z.string().optional(),
      email: z.string().email('Invalid email').optional(), // Validates email if present
      phone: z.string().optional(),
    }).partial().optional(),
    /** Count of close friends (non-negative integer). */
    close_friend_count: z.number().int().min(0).optional(),
  }).partial().optional(),

  /** Demographics are required at the top level, but inner fields use optionals where appropriate. */
  demographics: z.object({
    /** Age gate (18–99). */
    age: z.number().int().min(18).max(99),

    /** Gender constrained to your constant list. */
    gender: z.enum(GENDERS as unknown as [any, ...any[]]),

    /** Location is optional; individual fields are also optional via `.partial()`. */
    location: z.object({
      latitude: z.number().min(-90).max(90).optional(),
      longitude: z.number().min(-180).max(180).optional(),
      city: z.string().optional(),
      country: z.string().min(1), // If location exists, country must be non-empty
    }).partial({ latitude: true, longitude: true, city: true }).optional(),

    /** Highest education level (optional). */
    education_level: z.enum([
      'High school', 'Vocational/Trade', 'Associate/Diploma',
      "Bachelor's", "Master's", 'Doctorate', 'Other', 'Prefer not to say'
    ] as const).optional(),

    /** Free-text occupation (optional). */
    occupation: z.string().optional(),

    /**
     * Income range (min/max). Either or both optional; refine enforces min ≤ max if both exist.
     */
    income_bracket: z.object({
      min: z.number().int().min(0).optional(),
      max: z.number().int().min(0).optional(),
    }).partial()
      .refine(v => !(v.min && v.max) || v.min <= v.max, { message: 'min must be ≤ max' })
      .optional(),

    /** Ethnicity selection (optional). */
    ethnicity: z.enum([
      'East Asian', 'South Asian', 'Southeast Asian', 'Middle Eastern/North African',
      'Black/African', 'Latine/Hispanic', 'Indigenous', 'White/European', 'Mixed',
      'Another / self-described', 'Prefer not to say'
    ] as const).optional(),

    /**
     * Languages spoken (optional array). No duplicates allowed via refine.
     */
    languages_spoken: z.array(z.enum(LANGS as unknown as [any, ...any[]])).optional()
      .refine(arr => !arr || new Set(arr).size === arr.length, { message: 'No duplicates' }),
  }),

  /**
   * Preferences about potential partners. Entire block is optional & mostly partial.
   */
  partner_preferences: z.object({
    demographics: z.object({
      /**
       * Preferred age range and its importance.
       * min/max optional; refine enforces min ≤ max if both present.
       */
      age_range: z.object({
        min: z.number().int().min(18).max(99).optional(),
        max: z.number().int().min(18).max(99).optional(),
        importance: pct.optional(),
      }).refine(v => !(v.min && v.max) || v.min <= v.max, { message: 'min must be ≤ max' }),

      /** One or more acceptable genders. */
      genders: z.array(z.enum(GENDERS as unknown as [any, ...any[]])).min(1),
    }).optional(),

    // psychometrics — intentionally omitted

    /** Values and beliefs preferred in a partner. All optional. */
    values_beliefs: z.object({
      /** Whether partner should desire children. */
      desire_children: z.boolean().optional(),

      /**
       * Religion(s) acceptable. Arrays here allow multiple acceptable options.
       * Duplicate prevention via refine.
       */
      religion: z.array(z.enum(RELIGIONS as unknown as [any, ...any[]])).optional()
        .refine(arr => !arr || new Set(arr).size === arr.length, { message: 'No duplicates' }),

      /** Acceptable observance levels (no duplicates). */
      religious_observance: z.array(z.enum(OBS as unknown as [any, ...any[]])).optional()
        .refine(arr => !arr || new Set(arr).size === arr.length, { message: 'No duplicates' }),

      /** Acceptable political ideologies (no duplicates). */
      political_ideology: z.array(z.enum(POLITICAL as unknown as [any, ...any[]])).optional()
        .refine(arr => !arr || new Set(arr).size === arr.length, { message: 'No duplicates' }),
    }).partial().optional(),

    /** Lifestyle preferences for a partner. All arrays are de-duplicated. */
    lifestyle: z.object({
      smoking: z.array(z.enum(SUB_FREQ as unknown as [any, ...any[]])).optional()
        .refine(arr => !arr || new Set(arr).size === arr.length, { message: 'No duplicates' }),
      alcohol_use: z.array(z.enum(SUB_FREQ as unknown as [any, ...any[]])).optional()
        .refine(arr => !arr || new Set(arr).size === arr.length, { message: 'No duplicates' }),
      drug: z.array(z.enum(SUB_FREQ as unknown as [any, ...any[]])).optional()
        .refine(arr => !arr || new Set(arr).size === arr.length, { message: 'No duplicates' }),
      dietary_preferences: z.array(z.enum(DIET as unknown as [any, ...any[]])).optional()
        .refine(arr => !arr || new Set(arr).size === arr.length, { message: 'No duplicates' }),
    }).partial().optional(),

    /** Physical preferences for a partner. */
    physical_preferences: z.object({
      /**
       * Preferred height range (cm) with optional importance; enforce min ≤ max.
       */
      height_range_cm: z.object({
        min: z.number().int().min(0).optional(),
        max: z.number().int().min(0).optional(),
        importance: pct.optional(),
      }).refine(v => !(v.min && v.max) || v.min <= v.max, { message: 'min must be ≤ max' }).optional(),

      /** Acceptable body types (no duplicates). */
      body_types: z.array(z.enum(BODY_TYPES as unknown as [any, ...any[]])).optional()
        .refine(arr => !arr || new Set(arr).size === arr.length, { message: 'No duplicates' }),
    }).partial().optional(),

    /** Preferred communication style attributes. */
    communication_style: z.object({
      conflict_resolution: z.array(z.enum(CONFLICT as unknown as [any, ...any[]])).optional(),
    }).optional(),
  }).partial().optional(),

  /**
   * The user's own values/beliefs. Entire block optional and partial.
   */
  values_beliefs: z.object({
    religion: z.enum(RELIGIONS as unknown as [any, ...any[]]).optional(),
    religious_observance: z.enum(OBS as unknown as [any, ...any[]]).optional(),
    political_ideology: z.enum(POLITICAL as unknown as [any, ...any[]]).optional(),
    desire_children: z.boolean().optional(),
    /** If they have a personal timeline for marriage (in years). */
    marriage_ideal_timeline_years: z.number().int().optional(),
  }).partial().optional(),

  /**
   * Relationship history and desired future trajectory.
   */
  relationship_history: z.object({
    /** Prior relationships (each entry is optional fields). */
    past_relationships: z.array(z.object({
      duration_months: z.number().int().optional(),
      end_reason: z.string().optional(),
      co_parenting: z.boolean().optional(),
    })).optional(),

    /** What they want now. */
    desired_relationship_type: z.enum(['casual', 'serious', 'marriage'] as const),

    /**
     * Target timelines for milestones. Each range optional; enforce min ≤ max when both set.
     */
    desired_milestones_timeline: z.object({
      engagement_years: z.object({
        min: z.number().int().optional(),
        max: z.number().int().optional(),
      }).partial().refine(v => !(v.min && v.max) || v.min <= v.max, { message: 'min must be ≤ max' }).optional(),

      children_years: z.object({
        min: z.number().int().optional(),
        max: z.number().int().optional(),
      }).partial().refine(v => !(v.min && v.max) || v.min <= v.max, { message: 'min must be ≤ max' }).optional(),
    }).partial().optional(),

    /** Whether they’re willing to relocate for a partner. */
    relocation_willingness: z.boolean().optional(),
  }),

  /**
   * Day-to-day lifestyle information.
   */
  lifestyle: z.object({
    /** Fitness habits. `.partial()` makes inner fields optional. */
    fitness: z.object({
      frequency_per_week: z.number().int().optional(),
      activities: z.array(z.enum(ACTIVITIES as unknown as [any, ...any[]])).optional(),
    }).partial().optional(),

    /** Dietary preferences (from constant list). */
    dietary_preferences: z.array(z.enum(DIET as unknown as [any, ...any[]])).optional(),

    /** Sleep schedule in 24h HH:MM format (optional, either or both). */
    sleep_pattern: z.object({
      bedtime: zHHMM.optional(),
      wake_time: zHHMM.optional(),
    }).partial().optional(),

    /** Travel frequency + favorite places (all optional). */
    travel: z.object({
      trips_per_year: z.number().int().optional(),
      favorite_destinations: z.array(z.string()).optional(),
    }).partial().optional(),

    /** Free-form hobbies. */
    hobbies: z.array(z.string()).optional(),

    /** Substance use (single-value enums for the self). */
    substance_use: z.object({
      smoking: z.enum(SMOKING as unknown as [any, ...any[]]).optional(),
      alcohol_use: z.enum(SUB_FREQ as unknown as [any, ...any[]]).optional(),
      drugs: z.enum(SUB_FREQ as unknown as [any, ...any[]]).optional(),
    }).partial().optional(),

    /** Pets owned or stance toward pets. */
    pet_ownership: z.array(z.enum([
      'dog', 'cat', 'small mammals', 'birds', 'reptiles', 'fish',
      'none', 'allergic', 'open to pets'
    ] as const)).optional(),
  }).partial().optional(),

  /**
   * Physical info about the user.
   * Note: `self.body_type` is a string, while there’s also a constrained `body_types` enum at the same level.
   * That gives flexibility but make sure your app logic is aware of the difference.
   */
  physical_info: z.object({
    self: z.object({
      height_cm: z.number().int().optional(),
      body_type: z.string().optional(), // Free-text self-description
      style: z.string().optional(),
    }).partial().optional(),

    /** Canonical/body-type taxonomy (single value). */
    body_types: z.enum(BODY_TYPES as unknown as [any, ...any[]]).optional(),
  }).partial().optional(),

  /**
   * Communication preferences of the user.
   */
  communication_style: z.object({
    /**
     * Preferred message volume range per day.
     * min/max optional; refine enforces min ≤ max if both present.
     */
    messages_per_day: z.object({
      min: z.number().int().min(0).optional(),
      max: z.number().int().min(0).optional(),
    }).partial().refine(v => !(v.min && v.max) || v.min <= v.max, { message: 'min must be ≤ max' }).optional(),

    /** How they prefer to handle conflict. */
    conflict_resolution_style: z.enum(CONFLICT as unknown as [any, ...any[]]).optional(),

    /** Their humor style. */
    humor_style: z.enum(HUMOR as unknown as [any, ...any[]]).optional(),
  }).partial().optional(),
});

/** Inferred TypeScript type from the Zod schema. */
export type ZUserType = z.infer<typeof ZUser>;
