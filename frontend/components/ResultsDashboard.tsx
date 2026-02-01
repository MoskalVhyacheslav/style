'use client';

import { useState } from 'react';
import { Button } from './ui/Button';
import { results } from '@/lib/api';
import { useAuth } from '@/lib/auth-context';
import { generatePDF } from '@/lib/pdf';

type Outfit = {
  id: string;
  title: string;
  images: { url: string; alt: string }[];
};

type StyleProfile = {
  id: string;
  name: string;
  description: string;
};

type Props = {
  styleProfile: StyleProfile;
  outfits: Outfit[];
  shareToken?: string;
};

export function ResultsDashboard({
  styleProfile,
  outfits,
  shareToken
}: Props) {
  const [saved, setSaved] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [loading, setLoading] = useState<string | null>(null);
  const { token } = useAuth();

  const shareUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/share/${shareToken || ''}`
      : '';

  const handleSave = async () => {
    if (!token) return;
    setLoading('save');
    try {
      await results.save();
      setSaved(true);
    } finally {
      setLoading(null);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(shareUrl);
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2000);
  };

  const handleDownloadPDF = () => {
    setLoading('pdf');
    generatePDF(styleProfile, outfits)
      .catch(console.error)
      .finally(() => setLoading(null));
  };

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <section className="mb-12">
          <h1 className="text-3xl font-semibold mb-2">Your Style Profile</h1>
          <p className="text-2xl text-muted mb-4">{styleProfile.name}</p>
          <p className="text-base text-ink/90 leading-relaxed">
            {styleProfile.description}
          </p>
        </section>

        <div className="flex flex-wrap gap-3 mb-12">
          {token && (
            <Button
              variant={saved ? 'secondary' : 'primary'}
              onClick={handleSave}
              disabled={saved || loading === 'save'}
            >
              {saved ? 'Saved' : 'Save results'}
            </Button>
          )}
          {shareToken && (
            <Button variant="outline" onClick={handleShare}>
              {shareCopied ? 'Copied!' : 'Share link'}
            </Button>
          )}
          <Button
            variant="outline"
            onClick={handleDownloadPDF}
            disabled={loading === 'pdf'}
          >
            {loading === 'pdf' ? 'Generating...' : 'Download PDF'}
          </Button>
        </div>

        <section>
          <h2 className="text-xl font-semibold mb-6">Outfit Moodboards</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {outfits.map((outfit) => (
              <div
                key={outfit.id}
                className="rounded-xl overflow-hidden border border-[#e5e5e5] bg-white"
              >
                <div className="aspect-[4/5] relative bg-[#f5f5f5] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={outfit.images[0]?.url}
                    alt={outfit.images[0]?.alt || outfit.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium">{outfit.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
