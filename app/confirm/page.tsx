'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';

function ConfirmContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const confirmed = searchParams.get('confirmed');
    if (confirmed === '1') {
      setStatus('success');
      setMessage('Your email has been confirmed! Check your inbox for the welcome email.');
    } else if (confirmed === '0') {
      setStatus('error');
      setMessage('Invalid or expired confirmation link. Please try signing up again.');
    } else {
      // If no query param, we're still processing
      setStatus('loading');
    }
  }, [searchParams]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Confirming your subscription...</p>
        </div>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-background to-secondary/20">
        <div className="max-w-md w-full bg-card rounded-2xl p-8 shadow-lg border border-border text-center">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-3">You're confirmed! 🎉</h1>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            {message}
          </p>
          <div className="space-y-3">
            <Link href="/" className="block">
              <Button className="w-full" size="lg">
                Return to Home
              </Button>
            </Link>
            <p className="text-xs text-muted-foreground">
              We'll send you updates when AllerLens is ready.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-background to-secondary/20">
      <div className="max-w-md w-full bg-card rounded-2xl p-8 shadow-lg border border-border text-center">
        <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle className="w-10 h-10 text-red-600 dark:text-red-400" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-3">Confirmation Failed</h1>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          {message}
        </p>
        <div className="space-y-3">
          <Link href="/" className="block">
            <Button variant="outline" className="w-full" size="lg">
              Return to Home
            </Button>
          </Link>
          <Link href="/#waitlist" className="block">
            <Button className="w-full" size="lg">
              Try Signing Up Again
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ConfirmPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    }>
      <ConfirmContent />
    </Suspense>
  );
}

