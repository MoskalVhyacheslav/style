'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/Button';
import { useAuth } from '@/lib/auth-context';
import { users } from '@/lib/api';

const BODY_TYPES = [
  { id: 'slim', label: 'Slim' },
  { id: 'athletic', label: 'Athletic' },
  { id: 'regular', label: 'Regular' },
  { id: 'broad', label: 'Broad' },
  { id: 'stocky', label: 'Stocky' }
];

function ProfileEditContent() {
  const { user, token, loading: authLoading, refreshUser } = useAuth();
  const router = useRouter();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bodyType, setBodyType] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && !token) router.push('/auth');
  }, [token, authLoading, router]);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setAge(user.age?.toString() || '');
      setHeight(user.height?.toString() || '');
      setWeight(user.weight?.toString() || '');
      setBodyType(user.bodyType || '');
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await users.updateMe({
        name: name || undefined,
        age: age ? parseInt(age, 10) : undefined,
        height: height ? parseInt(height, 10) : undefined,
        weight: weight ? parseInt(weight, 10) : undefined,
        bodyType: bodyType || undefined
      });
      await refreshUser();
      router.push('/profile');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!token) return null;

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-md mx-auto">
        <Link href="/profile" className="text-sm text-muted hover:text-ink mb-4 inline-block">← Back</Link>
        <h1 className="text-2xl font-semibold mb-8">Edit profile</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-[#e5e5e5] rounded-lg bg-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Age</label>
            <input
              type="number"
              min={18}
              max={99}
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full px-4 py-3 border border-[#e5e5e5] rounded-lg bg-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Height (cm)</label>
            <input
              type="number"
              min={140}
              max={220}
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full px-4 py-3 border border-[#e5e5e5] rounded-lg bg-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Weight (kg)</label>
            <input
              type="number"
              min={40}
              max={200}
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full px-4 py-3 border border-[#e5e5e5] rounded-lg bg-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Body type</label>
            <div className="flex flex-wrap gap-2">
              {BODY_TYPES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setBodyType(t.id)}
                  className={`px-4 py-2 rounded-lg border text-sm transition-colors ${
                    bodyType === t.id ? 'border-ink bg-ink text-paper' : 'border-[#e5e5e5] hover:border-ink/50'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button type="submit" fullWidth disabled={loading}>
            {loading ? 'Saving...' : 'Save changes'}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default function ProfileEditPage() {
  return <ProfileEditContent />;
}
