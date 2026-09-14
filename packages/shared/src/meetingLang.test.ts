import { describe, expect, it } from 'vitest';
import { asMeetingLangPref, MEETING_LANG_PREFS, resolveMeetingLang } from './meetingLang';

describe('meeting language', () => {
  it('defaults anything unrecognised to keep, so existing users see no change', () => {
    expect(asMeetingLangPref(undefined)).toBe('keep');
    expect(asMeetingLangPref('system')).toBe('keep');
    expect(asMeetingLangPref('fr')).toBe('keep');
    expect(asMeetingLangPref(1)).toBe('keep');
  });

  it('round-trips every preference the control offers', () => {
    for (const pref of MEETING_LANG_PREFS) expect(asMeetingLangPref(pref)).toBe(pref);
  });

  it('sends no language when told to keep the platform choice', () => {
    expect(resolveMeetingLang('keep', 'id')).toBeNull();
  });

  it('follows the interface language only when asked to', () => {
    expect(resolveMeetingLang('ui', 'id')).toBe('id');
    expect(resolveMeetingLang('ui', 'en')).toBe('en');
  });

  it('lets a fixed meeting language differ from the interface', () => {
    expect(resolveMeetingLang('id', 'en')).toBe('id');
    expect(resolveMeetingLang('en', 'id')).toBe('en');
  });
});
