export type JwtPayloadType = {
  userId: number;
  sessionId: string;
  iat: number;
  exp: number;
};
