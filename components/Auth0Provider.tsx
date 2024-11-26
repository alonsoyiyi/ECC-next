'use client';

import { Auth0Provider } from '@auth0/auth0-react';

export const Auth0ProviderWithHistory = ({ children }: { children: React.ReactNode }) => {
  const domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN || '';
  const clientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID || '';

  if (!domain || !clientId) {
    throw new Error('Auth0 configuration is missing');
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: typeof window !== 'undefined' ? window.location.origin : '',
      }}
    >
      {children}
    </Auth0Provider>
  );
};