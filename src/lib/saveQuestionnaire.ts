// src/lib/saveQuestionnaire.ts
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { auth, db, authReady } from './firebase';

export type SaveResult =
  | { ok: true; id: string }
  | { ok: false; error: string };

export async function saveQuestionnaire(payload: unknown): Promise<SaveResult> {
  try {
    // wait until we have an auth user (anonymous ok)
    await authReady;
    const uid = auth.currentUser?.uid ?? null;

    const docRef = await addDoc(collection(db, 'questionnaires'), {
      uid,
      createdAt: serverTimestamp(),
      // You can also add a version, or schema hash if you want
      v: 1,
      data: payload,
    });
    return { ok: true, id: docRef.id };
  } catch (err: any) {
    return { ok: false, error: err?.message || 'Unknown error' };
  }
}
