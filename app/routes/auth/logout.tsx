import { redirect } from 'react-router';
import { auth0Service } from '../../services/auth0.server';
import { destroySession, getSession } from '../../services/sessions.server';
import type { Route } from './+types/logout';

export function meta() {
  return [
    { title: 'rr7-auth0 Logout page' },
    { name: 'description', content: 'Logout page' }
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  try {
    const session = await getSession(request.headers.get('Cookie'));
    
    const headers = new Headers();
    headers.append('Set-Cookie', await destroySession(session));
    return redirect('/', { headers });
  } catch (error) {
    console.error('Error during logout:', error);
    // Redirect to homepage with logout flag instead of login page
    return redirect('/');
  }
}

export default function Logout() {
  return null;
}