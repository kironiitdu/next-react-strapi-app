'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser } from '../lib/auth';
import { useAuth } from '@/context/AuthContext'; // Import your auth context hook

export default function LoginPage() {
  const router = useRouter();
  const { login, token: contextToken } = useAuth();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [token, setToken] = useState('');
  const [success, setSuccess] = useState(false);
  const [copied, setCopied] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(token);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    try {
      const data = await loginUser(identifier, password);

      login(data.jwt); // Update context token and localStorage inside context

      setToken(data.jwt);
      setSuccess(true);
      setCountdown(10); // Start countdown
    } catch (err) {
      console.error(err);
      setError('Invalid credentials. Please try again.');
    }
  };

  useEffect(() => {
    if (countdown === null) return;
  // Redirect if already logged in via context token
    if (countdown === 0) {
      router.push('/dashboard');
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => (prev ?? 1) - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, router]);

  return (
    <section className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-md hover:shadow-2xl transition-shadow p-8 w-full max-w-md">
<h1 className="text-3xl font-bold mb-6">Login</h1>

      {/* Success Alert */}
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-800 px-4 py-3 rounded mb-6">
          <div className="flex justify-between items-start gap-4">
            <div>
              ✅ Login successful!<br />
              <span className="text-sm">Token: </span>
              <code className="text-xs break-all block mt-1">{token}</code>
            </div>
            <button
              className={`text-xs mt-1 border rounded px-2 py-1 ${
                copied
                  ? 'text-green-700 border-green-700 bg-green-200 cursor-default'
                  : 'text-green-600 border-green-600 hover:bg-green-200'
              }`}
              onClick={handleCopy}
              disabled={copied}
            >
              {copied ? 'Copied ✓' : 'Copy Token'}
            </button>
          </div>
          {countdown !== null && (
            <p className="text-sm mt-3">
              Redirecting to dashboard in <strong>{countdown}</strong> seconds...
            </p>
          )}
        </div>
      )}

      {/* Error Alert */}
      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium">Email / Username</label>
          <input
            type="text"
            placeholder="User Name"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
            className="w-full border rounded-md px-4 py-2"
            disabled={countdown !== null}
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border rounded-md px-4 py-2"
            disabled={countdown !== null}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-md hover:bg-neutral-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={countdown !== null}
        >
          Sign In
        </button>
      </form>
        </div>
      
    </section>
  );
}
