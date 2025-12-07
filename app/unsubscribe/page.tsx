'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';

function UnsubscribeContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get('e');
  const success = searchParams.get('success');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    // Handle one-click unsubscribe success
    if (success === '1') {
      setStatus('success');
    } else if (success === '0') {
      setStatus('error');
    }
  }, [success]);

  const handleUnsubscribe = async () => {
    if (!email) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error('Failed');
      setStatus('success');
    } catch (error) {
      setStatus('error');
    }
  };

  // One-click unsubscribe success
  if (success === '1' || status === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-background to-secondary/20">
        <div className="max-w-md w-full bg-card rounded-2xl p-8 shadow-lg border border-border text-center">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-gray-600 dark:text-gray-400" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-3">Unsubscribed</h1>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            You have been removed from the AllerLens waitlist and will not receive further emails.
          </p>
          <div className="space-y-3">
            <Link href="/" className="block">
              <Button className="w-full" size="lg">
                Return to Home
              </Button>
            </Link>
            <p className="text-xs text-muted-foreground">
              You can always sign up again if you change your mind.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (success === '0' || status === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-background to-secondary/20">
        <div className="max-w-md w-full bg-card rounded-2xl p-8 shadow-lg border border-border text-center">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-10 h-10 text-red-600 dark:text-red-400" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-3">Unsubscribe Failed</h1>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            We couldn't process your unsubscribe request. Please try again or contact support.
          </p>
          <div className="space-y-3">
            <Link href="/" className="block">
              <Button variant="outline" className="w-full" size="lg">
                Return to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Manual unsubscribe form (when email param is present)
  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-background to-secondary/20">
        <div className="max-w-md w-full bg-card rounded-2xl p-8 shadow-lg border border-border text-center">
          <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-10 h-10 text-yellow-600 dark:text-yellow-400" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-3">Invalid Link</h1>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            This unsubscribe link is invalid or has expired.
          </p>
          <Link href="/" className="block">
            <Button className="w-full" size="lg">
              Return to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Confirmation form
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-background to-secondary/20">
      <div className="max-w-md w-full bg-card rounded-2xl p-8 shadow-lg border border-border text-center">
        <h1 className="text-3xl font-bold text-foreground mb-3">Unsubscribe from AllerLens?</h1>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          Are you sure you want to unsubscribe <strong className="text-foreground">{email}</strong> from the waitlist? You will lose your spot in line.
        </p>
        
        <div className="space-y-3">
          <Button 
            variant="destructive" 
            onClick={handleUnsubscribe}
            disabled={status === 'loading'}
            className="w-full" 
            size="lg"
          >
            {status === 'loading' && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Yes, Unsubscribe Me
          </Button>
          <Link href="/" className="block">
            <Button variant="outline" className="w-full" size="lg">
              Cancel
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function UnsubscribePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    }>
      <UnsubscribeContent />
    </Suspense>
  );
}
