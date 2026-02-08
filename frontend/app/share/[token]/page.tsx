'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ResultsDashboard } from '@/components/ResultsDashboard';
import { results } from '@/lib/api';
import Link from 'next/link';

type SharedResult = {
  styleProfile: { id: string; name: string; description: string };
  outfits: { id: string; title: string; images: { url: string; alt: string }[] }[];
  shareToken?: string;
};

export default function SharePage() {
  const params = useParams();
  const token = (params?.token ?? '') as string;

  const [data, setData] = useState<SharedResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    // If token is missing/invalid, fail fast (prevents unnecessary API call)
    if (!token) {
      setLoading(false);
      setError('Invalid share link');
      return () => {
        cancelled = true;
      };
    }

    (async () => {
      try {
        setLoading(true);

        // results.getByShareToken is currently typed as Promise<unknown>,
        // so we cast to the expected shape here to satisfy TypeScript.
        const value = (await results.getByShareToken(token)) as SharedResult;

        if (!cancelled) setData(value);
      } catch (e: any) {
        if (!cancelled) setError(e?.message ?? 'Unknown error');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted">Loading...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        <p className="text-red-600 mb-4">{error || 'Results not found'}</p>
        <Link href="/" className="text-ink underline">
          Back to Style DNA
        </Link>
      </div>
    );
  }

  return (
    <>
      <header className="border-b border-[#e5e5e5] py-4 px-6">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="text-xl font-semibold">
            Style DNA
          </Link>
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
