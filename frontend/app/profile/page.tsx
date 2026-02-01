'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/Button';

function ProfileContent() {
  const { user, token, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !token) {
      router.push('/auth');
    }
  }, [token, loading, router]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!token) return null;

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-semibold mb-8">Your Profile</h1>
        <div className="space-y-4 mb-8">
          <p><span className="text-muted">Name:</span> {user?.name || '—'}</p>
          <p><span className="text-muted">Email:</span> {user?.email}</p>
          <p><span className="text-muted">Age:</span> {user?.age ?? '—'}</p>
          <p><span className="text-muted">Height:</span> {user?.height ? `${user.height} cm` : '—'}</p>
          <p><span className="text-muted">Weight:</span> {user?.weight ? `${user.weight} kg` : '—'}</p>
          <p><span className="text-muted">Body type:</span> {user?.bodyType || '—'}</p>
        </div>
        <div className="flex gap-3">
          <Link href="/profile/edit">
            <Button variant="outline">Edit profile</Button>
          </Link>
          <Link href="/results">
            <Button variant="ghost">View my style</Button>
          </Link>
          <Button variant="ghost" onClick={() => { logout(); router.push('/'); }}>
            Sign out
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return <ProfileContent />;
}
