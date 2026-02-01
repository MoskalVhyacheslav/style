'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from './ui/Button';
import { ProgressBar } from './ui/ProgressBar';
import { quiz } from '@/lib/api';
import {
  PREFERRED_STYLES,
  LIFESTYLE_OPTIONS,
  BUDGET_OPTIONS,
  QUIZ_STEPS
} from '@/lib/quiz-config';

type Step = 'styles' | 'lifestyle' | 'budget';

export function StyleQuiz() {
  const [step, setStep] = useState<Step>('styles');
  const [preferredStyles, setPreferredStyles] = useState<string[]>([]);
  const [lifestyle, setLifestyle] = useState('');
  const [budget, setBudget] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const stepIndex = QUIZ_STEPS.findIndex((s) => s.id === step);
  const progress = ((stepIndex + 1) / QUIZ_STEPS.length) * 100;

  const toggleStyle = (id: string) => {
    setPreferredStyles((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const nextStep = () => {
    if (step === 'styles') setStep('lifestyle');
    else if (step === 'lifestyle') setStep('budget');
  };

  const canNext = () => {
    if (step === 'styles') return preferredStyles.length > 0;
    if (step === 'lifestyle') return !!lifestyle;
    if (step === 'budget') return !!budget;
    return false;
  };

  const handleSubmit = async () => {
    if (!budget) return;
    setError('');
    setLoading(true);
    try {
      await quiz.submit({
        preferredStyles,
        lifestyle,
        budget
      });
      router.push('/results');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <ProgressBar value={progress} max={100} />
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-6">
            {QUIZ_STEPS[stepIndex]?.title}
          </h2>

          {step === 'styles' && (
            <div className="flex flex-wrap gap-2">
              {PREFERRED_STYLES.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => toggleStyle(s.id)}
                  className={`px-4 py-2.5 rounded-lg border text-sm transition-colors ${
                    preferredStyles.includes(s.id)
                      ? 'border-ink bg-ink text-paper'
                      : 'border-[#e5e5e5] hover:border-ink/50'
                  }`}
                >
                  {s.label}
                </button>
              ))}
              <p className="w-full text-sm text-muted mt-2">
                Select one or more styles that resonate with you
              </p>
            </div>
          )}

          {step === 'lifestyle' && (
            <div className="space-y-2">
              {LIFESTYLE_OPTIONS.map((o) => (
                <button
                  key={o.id}
                  type="button"
                  onClick={() => setLifestyle(o.id)}
                  className={`w-full px-4 py-3 rounded-lg border text-left transition-colors ${
                    lifestyle === o.id
                      ? 'border-ink bg-ink text-paper'
                      : 'border-[#e5e5e5] hover:border-ink/50'
                  }`}
                >
                  {o.label}
                </button>
              ))}
            </div>
          )}

          {step === 'budget' && (
            <div className="space-y-2">
              {BUDGET_OPTIONS.map((o) => (
                <button
                  key={o.id}
                  type="button"
                  onClick={() => setBudget(o.id)}
                  className={`w-full px-4 py-3 rounded-lg border text-left transition-colors ${
                    budget === o.id
                      ? 'border-ink bg-ink text-paper'
                      : 'border-[#e5e5e5] hover:border-ink/50'
                  }`}
                >
                  <span className="font-medium">{o.label}</span>
                  <span className={`block text-sm mt-0.5 ${budget === o.id ? 'text-paper/80' : 'text-muted'}`}>
                    {o.sub}
                  </span>
                </button>
              ))}
            </div>
          )}

          {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

          <div className="mt-10 flex gap-3">
            {step !== 'styles' && (
              <Button
                variant="ghost"
                onClick={() =>
                  setStep(
                    step === 'budget' ? 'lifestyle' : 'styles'
                  )
                }
              >
                Back
              </Button>
            )}
            {step !== 'budget' ? (
              <Button onClick={nextStep} disabled={!canNext()}>
                Next
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={loading}>
                {loading ? 'Generating...' : 'See my style'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
