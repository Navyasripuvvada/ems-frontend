'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function SetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get('token');

  const [loading, setLoading] = useState(true);
  const [valid, setValid] = useState(false);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  // STEP 3: Validate token
  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setValid(false);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/invite/validate?token=${token}`);
        const data = await res.json();

        setValid(data.valid);
      } catch (err) {
        setValid(false);
      }

      setLoading(false);
    };

    validateToken();
  }, [token]);

  // STEP 5: Submit password
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const res = await fetch('/api/invite/set-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.message || 'Something went wrong');
        return;
      }

      router.push('/login');
    } catch (err) {
      setError('Server error');
    }
  };

  // STEP 3 UI states
  if (loading) {
    return <div className="p-6">Validating invite link...</div>;
  }

  if (!valid) {
    return (
      <div className="p-6 text-red-600">
        This invite link is invalid or has expired.
      </div>
    );
  }

  // STEP 4 UI form
  return (
    <div className="max-w-md mx-auto p-6 mt-10">
      <h1 className="text-xl font-bold mb-4">Set Your Password</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          placeholder="New password"
          className="w-full p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm password"
          className="w-full p-2 border rounded"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        <button
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          Set Password
        </button>
      </form>
    </div>
  );
}