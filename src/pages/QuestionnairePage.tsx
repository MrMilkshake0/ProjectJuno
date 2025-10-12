// src/pages/QuestionnairePage.tsx
import { useEffect, useMemo, useRef, useState } from 'react';
import { useForm, FormProvider, useWatch } from 'react-hook-form';
import { toast } from 'sonner';
import { useAuth } from "@/contexts/AuthContext";


import Header from '@/components/Header';
import StepNav from '@/components/StepNav';

import { loadDraft, saveDraft, clearDraft } from '@/lib/persistence';
import { saveQuestionnaire } from '@/lib/saveQuestionnaire';
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
  { key: 'demo', Component: DemographicsForm },
  { key: 'phys', Component: PhysicalInfoForm },
  { key: 'life', Component: LifestyleForm },
  { key: 'values', Component: ValuesBeliefsForm },
  { key: 'rel', Component: RelationshipHistoryForm },
  { key: 'comm', Component: CommunicationStyleForm },
  { key: 'partner', Component: PartnerPreferencesForm },
  { key: 'social', Component: SocialFootprintsForm },
] as const;

export default function QuestionnairePage() {
  const defaultValues = useMemo<FormShape>(() => loadDraft<FormShape>({}), []);
  const form = useForm<FormShape>({
    mode: 'onChange',
    defaultValues,
  });

  const { handleSubmit, trigger, control } = form;

  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);

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

  // Final submit: push to Firebase
  const { user } = useAuth();

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

  return (
    <>
      <Header />

      <main className="min-h-screen">
        <FormProvider {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-3xl mx-auto p-4 pt-16 space-y-6"
          >
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
