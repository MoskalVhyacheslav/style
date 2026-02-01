'use client';

import Link from 'next/link';
import { Button } from './ui/Button';

export function WelcomeScreen() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="max-w-lg text-center">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-ink mb-4">
          Style DNA
        </h1>
        <p className="text-lg text-muted mb-2">
          Define your personal style and get visual outfit recommendations tailored to you.
        </p>
        <p className="text-base text-muted/80 mb-12">
          A quick style quiz, then your curated moodboards.
        </p>
        <Link href="/auth">
          <Button size="lg" className="min-w-[200px]">
            Get started
          </Button>
        </Link>
      </div>
    </div>
  );
}
