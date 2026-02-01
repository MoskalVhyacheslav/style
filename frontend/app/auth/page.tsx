'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { AuthForm } from '@/components/AuthForm';

export default function AuthPage() {
  const { token, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && token) {
      router.push('/profile/setup');
    }
  }, [token, loading, router]);

  if (loading) return null;
  if (token) return null;
  return <AuthForm />;
}
