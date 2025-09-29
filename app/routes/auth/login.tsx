import { Form, redirect, Link } from 'react-router';
import { auth0Service } from '../../services/auth0.server';
import { useEffect, useRef } from 'react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import Layout from '../../components/Layout';

export function meta() {
  return [
    { title: 'Sign In - Buddhist AI Studio' },
    { name: 'description', content: 'Sign in to access our suite of Buddhist study tools and resources.' }
  ];
}

export async function loader({ request }: { request: Request }) {
  const hasValidSession = await auth0Service.verifySession(request);
  if (hasValidSession) {
    return redirect('/');
  }
  return null;
}

export async function action() {
  const state = crypto.randomUUID();
  const loginUrl = auth0Service.getLoginUrl(state);
  return redirect(loginUrl);
}

export default function Login() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  useEffect(() => {
    // Auto-redirect on mount for seamless experience
    if (buttonRef.current) {
      buttonRef.current.click();
    }
  }, []);

  return (
    <Layout>
      <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 py-12 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <img
                src="/icon_logo.png"
                alt="Pecha Tools Logo"
                width={64}
                height={64}
                className="rounded-xl shadow-sm"
              />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Welcome Back</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Sign in to access your Buddhist study tools
            </p>
          </div>

          {/* Login Card */}
          <Card className="shadow-lg border-border/50">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-xl">Sign in to your account</CardTitle>
              <CardDescription>
                Continue your journey with our digital tools for Buddhist studies
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Form method="post" className="space-y-4">
                <Button
                  ref={buttonRef}
                  type="submit"
                  className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground"
                  size="lg"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                  Continue with Auth0
                </Button>
              </Form>
              
              <div className="text-center">
                <p className="text-xs text-muted-foreground">
                  By signing in, you agree to our{' '}
                  <Link to="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Back to Home */}
          <div className="text-center">
            <Link 
              to="/" 
              className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              Back to homepage
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}