// src/lib/saveQuestionnaire.ts
import { saveQuestionnaire as saveQuestionnaireAPI } from './api';

export type SaveResult =
  | { ok: true; id: string }
  | { ok: false; error: string };

/**
 * Saves a questionnaire response via the backend API.
 * All user data now goes through the backend for security and efficiency.
 */
export async function saveQuestionnaire(payload: unknown): Promise<SaveResult> {
  try {
    const result = await saveQuestionnaireAPI(payload);
    
    if (result.ok && result.id) {
      return { ok: true, id: result.id };
    }
    
    return { 
      ok: false, 
      error: result.error || result.details || 'Failed to save questionnaire' 
    };
  } catch (err: any) {
    return { 
      ok: false, 
      error: err?.message || 'Unknown error' 
    };
  }
}
