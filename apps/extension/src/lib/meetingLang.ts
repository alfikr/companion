// Meeting language preference for the extension.
//
// Stored as a flat `chrome.storage.local` key beside `lang` rather than inside
// the encrypted `Settings` blob: it holds no secret, and the content script
// cannot decrypt `Settings`. Resolution lives in `@meetcc/shared`.
import { asMeetingLangPref, MEETING_LANG_KEY, resolveMeetingLang, type MeetingLangPref } from '@meetcc/shared';
import { getLang, type Lang } from '@meetcc/shared/i18n';

export type { MeetingLangPref };

export async function loadMeetingLangPref(): Promise<MeetingLangPref> {
  try {
    const { [MEETING_LANG_KEY]: raw } = await chrome.storage.local.get(MEETING_LANG_KEY);
    return asMeetingLangPref(raw);
  } catch {
    /* storage unavailable — keep the platform's choice, as before */
    return 'keep';
  }
}

export function saveMeetingLangPref(pref: MeetingLangPref): void {
  try {
    void chrome.storage.local.set({ [MEETING_LANG_KEY]: pref });
  } catch {
    /* the choice still applies for this session */
  }
}

/** The language to request, or `null` to let the recognizer decide. `ui`
 *  resolves against the interface language already applied in this context. */
export async function loadMeetingLang(): Promise<Lang | null> {
  return resolveMeetingLang(await loadMeetingLangPref(), getLang());
}
