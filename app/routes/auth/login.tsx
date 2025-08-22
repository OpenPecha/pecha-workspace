import { Form, redirect } from 'react-router';
import { auth0Service } from '../../services/auth0.server';
import { useEffect, useRef } from 'react';

export function meta() {
  return [
    { title: 'rr7-auth0 Login page' },
    { name: 'description', content: 'Login page' }
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
    if(buttonRef.current){
      buttonRef.current.click();
    }
  }, []);

  return (

        <Form method="post" className="space-y-6">
          <button
            ref={buttonRef}
            type="submit"
            className="w-full px-6 py-3 text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transform transition-all hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            <div className="flex items-center justify-center space-x-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
              </svg>
              <span>Sign in with Auth0</span>
            </div>
          </button>
        </Form>
  );
}