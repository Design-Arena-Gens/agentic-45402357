"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { login } from '@/lib/auth';
import { LogIn, KeyRound } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const user = login(email, password);
    if (user) {
      router.push('/dashboard');
    } else {
      setError('Invalid email or password');
    }
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setResetSuccess(true);
    setTimeout(() => {
      setShowForgotPassword(false);
      setResetSuccess(false);
      setResetEmail('');
    }, 3000);
  };

  return (
    <main id="main-content" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
            <LogIn className="text-primary-600" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">School Management</h1>
          <p className="text-gray-600 mt-2">Sign in to your account</p>
        </div>

        {!showForgotPassword ? (
          <form onSubmit={handleSubmit}>
            <Input
              id="email"
              type="email"
              label="Email Address"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
            <Input
              id="password"
              type="password"
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg" role="alert">
                {error}
              </div>
            )}
            <Button type="submit" className="w-full mb-4">
              Sign In
            </Button>
            <button
              type="button"
              onClick={() => setShowForgotPassword(true)}
              className="text-sm text-primary-600 hover:text-primary-700 focus:outline-none focus:underline"
            >
              Forgot password?
            </button>
          </form>
        ) : (
          <form onSubmit={handleForgotPassword}>
            <div className="mb-6">
              <button
                type="button"
                onClick={() => setShowForgotPassword(false)}
                className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1"
              >
                ← Back to login
              </button>
            </div>
            <div className="text-center mb-6">
              <KeyRound className="inline-block text-primary-600 mb-2" size={40} />
              <h2 className="text-xl font-semibold">Reset Password</h2>
              <p className="text-gray-600 text-sm mt-2">
                Enter your email and we'll send you instructions to reset your password
              </p>
            </div>
            <Input
              id="reset-email"
              type="email"
              label="Email Address"
              placeholder="Enter your email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              required
              autoComplete="email"
            />
            {resetSuccess && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg" role="alert">
                Password reset instructions sent to your email!
              </div>
            )}
            <Button type="submit" className="w-full">
              Send Reset Link
            </Button>
          </form>
        )}

        <div className="mt-6 pt-6 border-t text-center">
          <p className="text-sm text-gray-600">
            Demo credentials: Use any email from the system with password: <strong>password</strong>
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Try: admin@school.com, john@school.com, alice@school.com, bob@school.com
          </p>
        </div>
      </div>
    </main>
  );
}
