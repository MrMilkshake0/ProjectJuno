// src/lib/saveQuestionnaire.ts
import { addDoc, collection, serverTimestamp, setDoc, doc } from 'firebase/firestore';
import { auth, db, authReady } from './firebase';

export type SaveResult =
  | { ok: true; id: string }
  | { ok: false; error: string };

/**
 * Recursively removes undefined values from an object or array
 */
function removeUndefined<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map((v) => removeUndefined(v)) as T;
  } else if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>)
        .filter(([_, v]) => v !== undefined)
        .map(([k, v]) => [k, removeUndefined(v)])
    ) as T;
  }
  return value;
}

/**
 * Saves a questionnaire response under:
 *   users/{uid}/questionnaires/{autoId}
 * Returns the created document id.
 */
export async function saveQuestionnaire(payload: unknown): Promise<SaveResult> {
  try {
    // Ensure Firebase Auth is initialized
    await authReady;

    const uid = auth.currentUser?.uid ?? null;
    if (!uid) {
      return { ok: false, error: 'Not authenticated. Please sign in first.' };
    }

    // OPTIONAL (but nice): ensure a base user doc exists for future metadata
    // This is safe+idempotent; can be removed if you don't want it.
    await setDoc(
      doc(db, 'users', uid),
      { exists: true, lastActiveAt: serverTimestamp() },
      { merge: true }
    );

    // Clean payload before saving
    const cleanedPayload = removeUndefined(payload);

    // Write to users/{uid}/questionnaires
    const colRef = collection(db, 'users', uid, 'questionnaires');
    const docRef = await addDoc(colRef, {
      createdAt: serverTimestamp(),
      v: 1,
      data: cleanedPayload,
    });

    return { ok: true, id: docRef.id };
  } catch (err: any) {
    return { ok: false, error: err?.message || 'Unknown error' };
  }
}
