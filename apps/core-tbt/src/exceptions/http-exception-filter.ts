import {
  Catch,
  ArgumentsHost,
  HttpException,
  ExceptionFilter,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ValidationFailedError } from './index';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const message =
      exception.message ?? 'Something went wrong. Please try again later';
    const stack =
      process.env.NODE_ENV !== 'production' ? exception.stack : undefined;

    if (exception instanceof ValidationFailedError) {
      return response.status(status).json({
        code: status,
        message,
        errors: exception.getErrors(),
        timestamp: new Date().toISOString(),
        path: request.url,
        stack,
      });
    }

    return response.status(status).json({
      code: status,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
      stack,
    });
  }
}
