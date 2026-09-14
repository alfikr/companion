// The worker's speech-to-text entry point: `@meetcc/meeting`'s `transcribeAudio`
// with the Meeting language preference attached.
//
// Same name and signature on purpose, so `handleDb` in `db.ts` imports this one
// and calls it unchanged. That dispatch is already past ForgeGuard's complexity
// limit, and any line changed inside it blocks the merge.
import { transcribeAudio as transcribe } from '@meetcc/meeting';
import { withMeetingLang } from './meetingLang';

export async function transcribeAudio(
  ...[file, filename, config, fetchImpl]: Parameters<typeof transcribe>
): Promise<string> {
  return transcribe(file, filename, await withMeetingLang(config), fetchImpl);
}
