'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { ResultsDashboard } from '@/components/ResultsDashboard';
import { LoadingAnimation } from '@/components/LoadingAnimation';
import { results } from '@/lib/api';

function ResultsContent() {
  const { token, loading: authLoading } = useAuth();
  const router = useRouter();
  const [data, setData] = useState<{
    styleProfile: { id: string; name: string; description: string };
    outfits: { id: string; title: string; images: { url: string; alt: string }[] }[];
    shareToken?: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!authLoading && !token) {
      router.push('/auth');
      return;
    }
    results
      .get()
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [token, authLoading, router]);

  if (authLoading || loading) return <LoadingAnimation />;
  if (!token) return null;
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        <p className="text-red-600 mb-4">{error}</p>
        <Link href="/quiz" className="text-ink underline">Back to quiz</Link>
      </div>
    );
  }
  if (!data) return null;

  return (
    <>
      <header className="border-b border-[#e5e5e5] py-4 px-6">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-semibold">Style DNA</Link>
          <Link href="/profile" className="text-sm text-muted hover:text-ink">Profile</Link>
        </div>
      </header>
      <ResultsDashboard
        styleProfile={data.styleProfile}
        outfits={data.outfits}
        shareToken={data.shareToken}
      />
    </>
  );
}

export default function ResultsPage() {
  return <ResultsContent />;
}
