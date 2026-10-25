export type CountdownParts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isComplete: boolean;
  totalMilliseconds: number;
};

export function getCountdown(targetTimestamp: number, nowTimestamp: number): CountdownParts {
  const remaining = Math.max(0, targetTimestamp - nowTimestamp);
  const totalSeconds = Math.floor(remaining / 1000);

  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    isComplete: remaining === 0,
    totalMilliseconds: remaining,
  };
}

export function formatCountdownValue(value: number): string {
  return String(Math.max(0, value)).padStart(2, '0');
}
