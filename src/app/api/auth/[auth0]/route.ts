import { handleAuth, handleLogin } from "@auth0/nextjs-auth0";

export const dynamic = "force-dynamic";
export const GET = handleAuth({
  login: handleLogin({
    authorizationParams:{
      redirect_uri: process.env.AUTH0_CALLBACK_URL,
    }
  })
});
