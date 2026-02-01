const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
}

export async function api<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers
  };
  if (token) {
    (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  }
  const res = await fetch(`${API_URL}${path}`, { ...options, headers });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || res.statusText);
  }
  return res.json();
}

export const auth = {
  register: (data: { email: string; password: string; name?: string }) =>
    api<{ user: { id: string; email: string; name?: string }; token: string }>(
      '/api/auth/register',
      { method: 'POST', body: JSON.stringify(data) }
    ),
  login: (data: { email: string; password: string }) =>
    api<{ user: { id: string; email: string; name?: string }; token: string }>(
      '/api/auth/login',
      { method: 'POST', body: JSON.stringify(data) }
    )
};

export const users = {
  getMe: () => api<{ _id: string; email: string; name?: string; age?: number; height?: number; weight?: number; bodyType?: string }>('/api/users/me'),
  updateMe: (data: { name?: string; age?: number; height?: number; weight?: number; bodyType?: string }) =>
    api('/api/users/me', { method: 'PUT', body: JSON.stringify(data) })
};

export const quiz = {
  submit: (data: {
    preferredStyles: string[];
    lifestyle: string;
    favoriteBrands?: string[];
    budget: string;
  }) =>
    api<{
      resultId: string;
      styleProfile: { id: string; name: string; description: string; keywords: string[] };
      outfits: { id: string; title: string; images: { url: string; alt: string }[] }[];
    }>('/api/quiz/submit', { method: 'POST', body: JSON.stringify(data) })
};

export const results = {
  get: () =>
    api<{
      styleProfile: { id: string; name: string; description: string };
      outfits: { id: string; title: string; images: { url: string; alt: string }[] }[];
      shareToken: string;
    }>('/api/results'),
  save: () => api('/api/results/save', { method: 'POST' }),
  getByShareToken: (token: string) => api(`/api/results/share/${token}`)
};
