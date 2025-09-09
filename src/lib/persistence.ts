const KEY = 'questionnaire_draft_v1';
export const saveDraft = (data: unknown) => localStorage.setItem(KEY, JSON.stringify(data));
export const loadDraft = <T>(fallback: T): T => {
  try { const raw = localStorage.getItem(KEY); return raw ? JSON.parse(raw) as T : fallback; } catch { return fallback; }
};
export const clearDraft = () => localStorage.removeItem(KEY);