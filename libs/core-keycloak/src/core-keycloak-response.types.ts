interface JWTHeader {
  alg: string;
  typ: string;
  kid: string;
}

interface JWTSignature {
  type: string;
  data: number[];
}

interface JWTContent {
  exp: number;
  iat: number;
  auth_time: number;
  jti: string;
  iss: string;
  aud: string;
  sub: string;
  typ: string;
  azp: string;
  session_state: string;
  acr: string;
  ['allowed-origins']: string[];
  realm_access: {
    roles: string[];
  };
  resource_access: {
    account: {
      roles: string[];
    };
  };
  scope: string;
  sid: string;
  email_verified: boolean;
  name: string;
  preferred_username: string;
  given_name: string;
  family_name: string;
  email: string;
}

interface Token {
  token: string;
  clientId?: string; // Optional for refresh token
  header: JWTHeader;
  content: JWTContent;
  signature: JWTSignature;
  signed?: string; // Optional
}

export interface ObtainFromCodeResponse {
  access_token: Token;
  refresh_token: Token;
  id_token: Token;
  token_type: string; // Bearer
  expires_in: number;
  __raw: string;
}

export interface UserProfileResponse {
  sub: string;
  email_verified: boolean;
  name: string;
  preferred_username: string;
  given_name: string;
  family_name: string;
  email: string;
}
