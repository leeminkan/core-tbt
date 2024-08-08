import { Request } from '@nestjs/common';

import { JwtRefreshPayloadType } from './strategies/types/jwt-refresh-payload.type';

export type _UserRequest = Request & {
  user: JwtRefreshPayloadType;
};
