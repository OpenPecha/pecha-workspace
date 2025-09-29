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

  // Use the proper logout method that revokes tokens
  await auth0Service.logout(session);

  headers.append('Set-Cookie', await destroySession(session));
  return new Response(null, {
    status: 302,
    headers: {
      ...headers,
      // Use federated logout to ensure complete logout from Auth0 and all identity providers
      Location: auth0Service.getLogoutUrl(true)
    }
  });
}



export default function Logout() {
  return null;
}