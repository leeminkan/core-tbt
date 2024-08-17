export const authProviders = {
  internal: 'internal',
  keycloak: 'keycloak',
} as const;

export type AuthProvider = (typeof authProviders)[keyof typeof authProviders];
