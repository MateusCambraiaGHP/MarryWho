import { useEffect, useState } from 'react';
import { couple } from '../content/couple';
import { formatCountdownValue, getCountdown } from '../lib/countdown';

const countdownUnits = [
  { key: 'days', label: 'dias' },
  { key: 'hours', label: 'horas' },
  { key: 'minutes', label: 'minutos' },
  { key: 'seconds', label: 'segundos' },
] as const;

export function Countdown() {
  const [countdown, setCountdown] = useState(() => getCountdown(couple.weddingTimestamp, Date.now()));

  useEffect(() => {
    const updateCountdown = () => setCountdown(getCountdown(couple.weddingTimestamp, Date.now()));
    updateCountdown();
    const interval = window.setInterval(updateCountdown, 1000);
    return () => window.clearInterval(interval);
  }, []);

  if (countdown.isComplete) {
    return (
      <p className="countdown countdown--complete">
        <span className="countdown__label">Contagem regressiva</span>
        <strong>O grande dia chegou! 💛</strong>
      </p>
    );
  }

  return (
    <div className="countdown" role="timer">
      <p className="visually-hidden">
        Contagem regressiva para 25 de abril de 2027, às 16h. Faltam {countdown.days} dias,{' '}
        {countdown.hours} horas, {countdown.minutes} minutos e {countdown.seconds} segundos.
      </p>
      <p className="countdown__label" aria-hidden="true">
        Contagem regressiva
      </p>
      <div className="countdown__units" aria-hidden="true">
        {countdownUnits.map((unit) => (
          <div className="countdown__unit" key={unit.key}>
            <span className="countdown__value">{formatCountdownValue(countdown[unit.key])}</span>
            <span className="countdown__unit-label">{unit.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
