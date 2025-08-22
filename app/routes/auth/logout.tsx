import { destroySession, getSession } from '../../services/sessions.server';
import { auth0Service } from '~/services/auth0.server';

export function meta() {
  return [
    { title: 'rr7-auth0 Logout page' },
    { name: 'description', content: 'Logout page' }
  ];
}

export async function loader({ request }: { request: Request }) {
  const session = await getSession(request.headers.get('Cookie'));
  const headers = new Headers();

  // Clean session
  await auth0Service['cleanSession'](session);

  // Commit empty session
  headers.append('Set-Cookie', await destroySession(session));


  // Redirect to Auth0 logout
  return Response.redirect(auth0Service.getLogoutUrl(), 302, { headers });
}



export default function Logout() {
  return null;
}