// src/pages/QuestionnairePage.tsx
import { useEffect, useRef, useState } from 'react';
import { useForm, FormProvider, useWatch } from 'react-hook-form';
import { toast } from 'sonner';
import { useAuth } from "@/contexts/AuthContext";


import Header from '@/components/Header';
import StepNav from '@/components/StepNav';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { loadDraft, saveDraft, clearDraft } from '@/lib/persistence';
import { saveQuestionnaire } from '@/lib/saveQuestionnaire';
import { getUserProfile } from '@/lib/api';
import { SECTION_FIELDS } from '@/lib/sectionFields';

// ---- Sections ----
import SocialFootprintsForm from '@/sections/SocialFootprintsForm';
import DemographicsForm from '@/sections/DemographicsForm';
import PartnerPreferencesForm from '@/sections/PartnerPreferencesForm';
import ValuesBeliefsForm from '@/sections/ValuesBeliefsForm';
import RelationshipHistoryForm from '@/sections/RelationshipHistoryForm';
import LifestyleForm from '@/sections/LifestyleForm';
import PhysicalInfoForm from '@/sections/PhysicalInfoForm';
import CommunicationStyleForm from '@/sections/CommunicationStyleForm';

// -------- Types --------
type FormShape = Record<string, any>;

// -------- Sections config --------
const SECTIONS = [
  { key: 'demo', Component: DemographicsForm, title: 'Demographics' },
  { key: 'phys', Component: PhysicalInfoForm, title: 'Physical Info' },
  { key: 'life', Component: LifestyleForm, title: 'Lifestyle' },
  { key: 'values', Component: ValuesBeliefsForm, title: 'Values & Beliefs' },
  { key: 'rel', Component: RelationshipHistoryForm, title: 'Relationship History' },
  { key: 'comm', Component: CommunicationStyleForm, title: 'Communication Style' },
  { key: 'partner', Component: PartnerPreferencesForm, title: 'Partner Preferences' },
  { key: 'social', Component: SocialFootprintsForm, title: 'Social Footprints' },
] as const;

/**
 * Transform backend profile format to form format
 */
function transformProfileToForm(profile: any): FormShape {
  if (!profile || !profile.profile) {
    return {};
  }

  const formData: FormShape = {
    // Copy all profile sections directly
    demographics: profile.profile.demographics,
    lifestyle: profile.profile.lifestyle,
    values_beliefs: profile.profile.values_beliefs,
    relationship_history: profile.profile.relationship_history,
    communication_style: profile.profile.communication_style,
    social_footprints: profile.profile.social_footprints,
    // Transform physical_info to physical_info.self structure
    physical_info: profile.profile.physical_info
      ? {
          self: {
            height_cm: profile.profile.physical_info.height_cm,
            body_type: profile.profile.physical_info.body_type,
          },
        }
      : undefined,
    // Copy partner_preferences as-is
    partner_preferences: profile.partner_preferences,
    // Preserve vibe_profile and meta if they exist
    ...(profile.vibe_profile && { vibe_profile: profile.vibe_profile }),
    ...(profile.meta && { meta: profile.meta }),
  };

  // Remove undefined values
  return Object.fromEntries(
    Object.entries(formData).filter(([_, v]) => v !== undefined)
  ) as FormShape;
}

export default function QuestionnairePage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [initialValues, setInitialValues] = useState<FormShape>(() => loadDraft<FormShape>({}));
  
  const form = useForm<FormShape>({
    mode: 'onChange',
    defaultValues: initialValues,
  });

  const { handleSubmit, trigger, control, reset } = form;

  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  // Load saved profile from backend when component mounts
  useEffect(() => {
    async function loadProfile() {
      if (!user) {
        // If not authenticated, just use draft data
        setLoading(false);
        return;
      }

      try {
        const response = await getUserProfile();
        
        if (response.ok && response.profile) {
          // Transform backend profile to form format
          const profileData = transformProfileToForm(response.profile);
          
          // Merge with draft data (draft takes precedence for unsaved changes)
          const draftData = loadDraft<FormShape>({});
          const mergedData = { ...profileData, ...draftData };
          
          // Update form with merged data
          reset(mergedData);
          setInitialValues(mergedData);
        } else {
          // No profile found, use draft data
          const draftData = loadDraft<FormShape>({});
          reset(draftData);
          setInitialValues(draftData);
        }
      } catch (error) {
        console.error('Failed to load profile:', error);
        // On error, use draft data
        const draftData = loadDraft<FormShape>({});
        reset(draftData);
        setInitialValues(draftData);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [user, reset]);

  const watchAll = useWatch({ control });

  // Debounced autosave
  const saveTimer = useRef<number | null>(null);
  useEffect(() => {
    if (saveTimer.current) window.clearTimeout(saveTimer.current);
    saveTimer.current = window.setTimeout(() => {
      try {
        saveDraft(watchAll);
      } catch {
        // ignore
      }
    }, 400);
    return () => {
      if (saveTimer.current) window.clearTimeout(saveTimer.current);
    };
  }, [watchAll]);

  // Navigation
  const handleNext = async () => {
    const sectionKey = SECTIONS[step].key as keyof typeof SECTION_FIELDS;
    const getNames = SECTION_FIELDS?.[sectionKey] ?? (() => [] as string[]);
    const names = getNames(form);
    const ok = names.length ? await trigger(names) : true;
    if (ok) setStep((s) => Math.min(SECTIONS.length - 1, s + 1));
  };

  const handleSubmitClick = async () => {
    const sectionKey = SECTIONS[step].key as keyof typeof SECTION_FIELDS;
    const getNames = SECTION_FIELDS?.[sectionKey] ?? (() => [] as string[]);
    const names = getNames(form);
    const ok = names.length ? await trigger(names) : true;
    if (!ok) return;
    await handleSubmit(onSubmit)();
  };

  const onSubmit = async (data: FormShape) => {
    if (!user) {
      toast.error("Please log in before submitting.");
      return;
    }

    setSubmitting(true);
    try {
      await saveQuestionnaire(data);
      toast.success("Your questionnaire has been submitted.");
      clearDraft();
    } catch (e) {
      console.error(e);
      toast.error("Save failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const Current = SECTIONS[step].Component;

  const handleSectionClick = (sectionIndex: number) => {
    setStep(sectionIndex);
    // Scroll to top of form when switching sections
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center">
          <p className="text-muted-foreground">Loading your questionnaire...</p>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />

      <main className="min-h-screen">
        <FormProvider {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-3xl mx-auto p-4 pt-16 space-y-6"
          >
            {/* Section Navigation */}
            <div className="sticky top-16 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b pb-4 mb-6">
              <div className="flex flex-wrap gap-2 justify-center">
                {SECTIONS.map((section, index) => (
                  <Button
                    key={section.key}
                    type="button"
                    variant={step === index ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleSectionClick(index)}
                    className={cn(
                      "min-w-[2.5rem] h-9",
                      step === index && "font-semibold"
                    )}
                    title={section.title}
                  >
                    {index + 1}
                  </Button>
                ))}
              </div>
              <div className="text-center mt-2 text-sm text-muted-foreground">
                {SECTIONS[step].title}
              </div>
            </div>

            {/* Just render the current step (no extra header/progress UI) */}
            <Current />

            <StepNav
              canPrev={step > 0}
              canNext={step < SECTIONS.length - 1}
              onPrev={() => setStep((s) => Math.max(0, s - 1))}
              onNext={handleNext}
              onSubmitClick={handleSubmitClick}
              isLast={step === SECTIONS.length - 1}
              submitting={submitting}
            />
            {submitting && (
              <p className="text-sm text-muted-foreground">Submitting…</p>
            )}
          </form>
        </FormProvider>
      </main>
    </>
  );
}
