import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Request } from 'express';
import { MyLogger } from 'src/myLogger/logger.service';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private myLogger: MyLogger,
  ) {}
  catch(exception: HttpException, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const path = httpAdapter.getRequestUrl(req);

    let httpStatus: number;
    let errorContent: string;

    if (exception instanceof HttpException) {
      httpStatus = exception.getStatus();
      errorContent = exception.message;
    } else {
      httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
      errorContent = 'Internal Server Error';
    }

    const responseBody = {
      statusCode: httpStatus,
      message: errorContent,
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);

    const errorMessage = `${path} [${req.method}], query ${JSON.stringify(
      req.query,
    )},  body ${JSON.stringify(req.body)}, response status code ${httpStatus}`;

    if (exception instanceof HttpException) {
      this.myLogger.warn(errorMessage);
    } else {
      this.myLogger.error(errorMessage);
    }
  }
}
