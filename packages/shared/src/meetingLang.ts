// Meeting language: the language people speak, not the one the interface is in.
//
// Deliberately separate from `i18n.ts`. An English interface over Indonesian
// meetings is an ordinary setup, and the interface setting says it changes the
// interface only. Speech recognition — an imported recording today, the
// caption language on Meet/Teams later — needs to know what is being spoken.
//
// Framework-free: no React, no DOM, no `chrome.*`. Persistence lives in each
// app, like the interface language.
import type { Lang } from './i18n';

/**
 * `keep` leaves the platform's own choice alone (today's behaviour, and the
 * default); `ui` follows the interface language; otherwise a fixed language.
 */
export type MeetingLangPref = 'keep' | 'ui' | Lang;

/** The order the settings control lists them in. */
export const MEETING_LANG_PREFS: readonly MeetingLangPref[] = ['keep', 'ui', 'id', 'en'];

/** A flat `chrome.storage.local` key, beside `lang`, so the content script —
 *  which ships unbundled and cannot decrypt `Settings` — can read it too. */
export const MEETING_LANG_KEY = 'meetingLang';

/** Narrow an unvalidated stored value back to a preference. */
export function asMeetingLangPref(value: unknown): MeetingLangPref {
  return value === 'ui' || value === 'id' || value === 'en' ? value : 'keep';
}

/**
 * The language to ask a recognizer for, or `null` to send nothing and let it
 * decide. `uiLang` is the interface language already resolved in the caller's
 * context, so `system` has been settled before it gets here.
 */
export function resolveMeetingLang(pref: MeetingLangPref, uiLang: Lang): Lang | null {
  if (pref === 'keep') return null;
  return pref === 'ui' ? uiLang : pref;
}
