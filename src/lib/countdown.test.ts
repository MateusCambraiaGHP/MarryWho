import { describe, expect, it } from 'vitest';
import { formatCountdownValue, getCountdown } from './countdown';

const target = Date.parse('2027-04-25T16:00:00-03:00');

describe('getCountdown', () => {
  it('breaks the remaining time into days, hours, minutes and seconds', () => {
    const remainingMilliseconds = (((2 * 24 + 3) * 60 + 4) * 60 + 5) * 1000;
    const result = getCountdown(target, target - remainingMilliseconds);

    expect(result).toEqual({
      days: 2,
      hours: 3,
      minutes: 4,
      seconds: 5,
      isComplete: false,
      totalMilliseconds: remainingMilliseconds,
    });
  });

  it('floors partial seconds instead of rounding up', () => {
    const result = getCountdown(target, target - 1999);

    expect(result.seconds).toBe(1);
    expect(result.isComplete).toBe(false);
  });

  it('never returns negative values after the ceremony starts', () => {
    const result = getCountdown(target, target + 60 * 60 * 1000);

    expect(result).toEqual({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isComplete: true,
      totalMilliseconds: 0,
    });
  });

  it('marks the exact ceremony instant as complete', () => {
    expect(getCountdown(target, target).isComplete).toBe(true);
  });

  it('does not mark the last second before the ceremony as complete', () => {
    expect(getCountdown(target, target - 999).isComplete).toBe(false);
  });
});

describe('formatCountdownValue', () => {
  it('pads single digits to two characters', () => {
    expect(formatCountdownValue(0)).toBe('00');
    expect(formatCountdownValue(7)).toBe('07');
  });

  it('keeps values with two or more digits unchanged', () => {
    expect(formatCountdownValue(12)).toBe('12');
    expect(formatCountdownValue(365)).toBe('365');
  });
});
