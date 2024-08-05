import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Request, Response } from 'express';
import { BaseInfrastructureError } from '@libs/core-infrastructure/base.errors';

@Catch(BaseInfrastructureError)
export class InfrastructureErrorExceptionFilter implements ExceptionFilter {
  catch(exception: BaseInfrastructureError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const errorCode = exception.getErrorCode();
    const message = exception.message
      ? `${errorCode}: ${exception.message}`
      : 'Something went wrong. Please try again later';
    const stack =
      process.env.NODE_ENV !== 'production' ? exception.stack : undefined;

    return response.status(status).json({
      code: status,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
      stack,
    });
  }
}
