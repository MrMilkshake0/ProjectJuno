// src/lib/buildOutput.ts
import type { ZUserType } from './zod';

export function buildOutput(data: ZUserType) {
  const out: any = { ...data };
  delete out.psychometrics;
  if (out.partner_preferences) delete out.partner_preferences.psychometrics;

  const scrub = (obj: any) => {
    if (!obj || typeof obj !== 'object') return;
    Object.keys(obj).forEach(k => {
      if (k.endsWith('_otherText')) delete obj[k];
      else scrub(obj[k]);
    });
  };
  scrub(out);
  return out;
}
