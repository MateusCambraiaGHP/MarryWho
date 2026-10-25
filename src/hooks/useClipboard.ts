import { useCallback, useEffect, useRef, useState } from 'react';

export type CopyStatus = 'idle' | 'copied' | 'failed';

async function writeToClipboard(text: string): Promise<boolean> {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
    }
  }

  const previouslyFocused = document.activeElement;
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.setAttribute('aria-hidden', 'true');
  textarea.style.position = 'fixed';
  textarea.style.top = '0';
  textarea.style.left = '-9999px';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  textarea.setSelectionRange(0, text.length);

  let copied = false;
  try {
    copied = document.execCommand('copy');
  } catch {
    copied = false;
  }

  textarea.remove();

  if (previouslyFocused instanceof HTMLElement) {
    previouslyFocused.focus();
  }

  return copied;
}

export function useClipboard(resetDelay = 2400) {
  const [status, setStatus] = useState<CopyStatus>('idle');
  const resetTimer = useRef<number | undefined>(undefined);

  const copy = useCallback(
    async (text: string) => {
      window.clearTimeout(resetTimer.current);
      const copied = await writeToClipboard(text);

      setStatus(copied ? 'copied' : 'failed');
      if (copied) {
        resetTimer.current = window.setTimeout(() => setStatus('idle'), resetDelay);
      }
    },
    [resetDelay],
  );

  useEffect(() => () => window.clearTimeout(resetTimer.current), []);

  return { status, copy };
}
