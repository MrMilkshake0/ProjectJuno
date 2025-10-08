// src/pages/QuestionnairePageOld.tsx
import { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ZUser } from '@/lib/zod';
import type { ZUserType } from '@/lib/zod';
import { loadDraft, saveDraft } from '@/lib/persistence';
import { buildOutput } from '@/lib/buildOutput';
import SocialFootprintsForm from '@/sections/SocialFootprintsForm';
import DemographicsForm from '@/sections/DemographicsForm';
import PartnerPreferencesForm from '@/sections/PartnerPreferencesForm';
import ValuesBeliefsForm from '@/sections/ValuesBeliefsForm';
import RelationshipHistoryForm from '@/sections/RelationshipHistoryForm';
import LifestyleForm from '@/sections/LifestyleForm';
import PhysicalInfoForm from '@/sections/PhysicalInfoForm';
import CommunicationStyleForm from '@/sections/CommunicationStyleForm';
import { SECTION_FIELDS } from '@/lib/sectionFields';
import StepNav from '@/components/StepNav';
import { saveQuestionnaire } from '@/lib/saveQuestionnaire';
import Header from '@/components/Header';

// OPTIONAL: If you use shadcn's toast
// import { useToast } from "@/components/ui/use-toast";

const SECTIONS = [
  { key: 'demo', title: 'Demographics', node: <DemographicsForm/> },
  { key: 'phys', title: 'Physical Info', node: <PhysicalInfoForm/> },
  { key: 'life', title: 'Lifestyle', node: <LifestyleForm/> },
  { key: 'values', title: 'Values & Beliefs', node: <ValuesBeliefsForm/> },
  { key: 'rel', title: 'Relationship History', node: <RelationshipHistoryForm/> },
  { key: 'comm', title: 'Communication Style', node: <CommunicationStyleForm/> },
  { key: 'partner', title: 'Partner Preferences', node: <PartnerPreferencesForm/> },
  { key: 'social', title: 'Social Footprints', node: <SocialFootprintsForm/> },
] as const;

const DEFAULTS: ZUserType = {
  user_id: crypto.randomUUID(),
  demographics: { age: 18, gender: 'other', location: { country: '' } },
  relationship_history: { desired_relationship_type: 'casual' },
  partner_preferences: {
    demographics: { genders: [] },
    values_beliefs: { religion: [], religious_observance: [], political_ideology: [] },
    lifestyle: { smoking: [], dietary_preferences: [] },
    physical_preferences: { body_types: [] },
    communication_style: { conflict_resolution: [] },
  },
  lifestyle: { dietary_preferences: [], hobbies: [], pet_ownership: [] },
};

function normalizeDraft(draft: Partial<ZUserType> | undefined): Partial<ZUserType> | undefined {
  if (!draft) return draft;
  const up = (v: unknown) => (Array.isArray(v) ? v : typeof v === 'string' ? [v] : v == null ? [] : v);

  const d = structuredClone(draft);
  d.partner_preferences ??= {};
  d.partner_preferences.values_beliefs ??= {};
  d.partner_preferences.lifestyle ??= {};
  d.partner_preferences.physical_preferences ??= {};
  d.partner_preferences.demographics ??= {};
  d.partner_preferences.communication_style ??= {};

  d.partner_preferences.values_beliefs.religion = up(d.partner_preferences.values_beliefs.religion) as any;
  d.partner_preferences.values_beliefs.religious_observance = up(d.partner_preferences.values_beliefs.religious_observance) as any;
  d.partner_preferences.values_beliefs.political_ideology = up(d.partner_preferences.values_beliefs.political_ideology) as any;
  d.partner_preferences.lifestyle.smoking = up(d.partner_preferences.lifestyle.smoking) as any;
  d.partner_preferences.lifestyle.dietary_preferences = up(d.partner_preferences.lifestyle.dietary_preferences) as any;
  d.partner_preferences.physical_preferences.body_types = up(d.partner_preferences.physical_preferences.body_types) as any;
  d.partner_preferences.communication_style.conflict_resolution = up(d.partner_preferences.communication_style.conflict_resolution) as any;
  d.partner_preferences.demographics.genders = up(d.partner_preferences.demographics.genders) as any;

  d.lifestyle ??= {};
  d.lifestyle.dietary_preferences = up(d.lifestyle.dietary_preferences) as any;
  d.lifestyle.hobbies = up(d.lifestyle.hobbies) as any;
  d.lifestyle.pet_ownership = up(d.lifestyle.pet_ownership) as any;
  return d;
}

export default function QuestionnairePage() {
  // const { toast } = useToast(); // if using shadcn toast
  const form = useForm<ZUserType>({
    resolver: zodResolver(ZUser),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: (() => {
      const loaded = loadDraft(DEFAULTS) as Partial<ZUserType> | undefined;
      return { ...DEFAULTS, ...normalizeDraft(loaded) } as ZUserType;
    })(),
  });

  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const sub = form.watch((v) => saveDraft(v as any));
    return () => sub.unsubscribe();
  }, [form]);

  const handleNext = async () => {
    type SectionKey = keyof typeof SECTION_FIELDS;
    const sectionKey = SECTIONS[step].key as SectionKey;
    const getNames = SECTION_FIELDS[sectionKey] ?? (() => [] as string[]);
    const names = getNames(form);
    const ok = await form.trigger(names);
    if (ok) setStep((s) => Math.min(SECTIONS.length - 1, s + 1));
  };

  const handleSubmitClick = async () => {
    const getNames =
      SECTION_FIELDS[SECTIONS[step].key as keyof typeof SECTION_FIELDS] ?? (() => [] as string[]);
    const names = getNames(form);
    const ok = await form.trigger(names);
    if (!ok) return;
    await form.handleSubmit(onSubmit)();
  };

  const onSubmit = async (v: ZUserType) => {
    try {
      setSubmitting(true);

      // 1) Build your normalized output exactly as before
      const payload = buildOutput(v);

      // 2) Save to Firestore
      const res = await saveQuestionnaire(payload);

      if (res.ok) {
        // Clear draft after successful write
        localStorage.removeItem('questionnaire_draft_v1');

        // Optional toast UX
        // toast({ title: "Saved!", description: `Submission ID: ${res.id}` });

        // Optional: navigate or show a confirmation UI instead of downloading
        alert(`Submitted! ID: ${res.id}`);
      } else {
        // toast({ title: "Error", description: res.error, variant: "destructive" });
        alert(`Error: ${res.error}`);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
    
      <Header /> {/* ⬅️ render the sticky header */}
      <main className="min-h-screen">
        <FormProvider {...form}>
          {/* pt-16 offsets the 56px (h-14) sticky header */}
          <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-3xl mx-auto p-4 pt-16 space-y-6">
            <div>{SECTIONS[step].node}</div>

            <StepNav
              canPrev={step > 0}
              canNext={true}
              onPrev={() => setStep((s) => Math.max(0, s - 1))}
              onNext={handleNext}
              onSubmitClick={handleSubmitClick}
              isLast={step === SECTIONS.length - 1}
            />

            {submitting && <p className="text-sm text-muted-foreground">Submitting…</p>}
          </form>
        </FormProvider>
      </main>
    </>
  );
}
