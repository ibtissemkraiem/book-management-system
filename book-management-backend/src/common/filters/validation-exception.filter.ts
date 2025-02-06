import { ExceptionFilter, Catch, ArgumentsHost, BadRequestException } from '@nestjs/common';
import { Request, Response } from 'express';
import { ValidationError } from 'class-validator';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const exceptionResponse = exception.getResponse() as any;
    const validationErrors: ValidationError[] = exceptionResponse.message || [];  // Safe fallback if undefined

    const errorMessages = validationErrors.map((error) => {
      return {
        field: error.property,
        errors: Object.values(error.constraints || {}),  // Ensure constraints is never undefined
      };
    });

    response.status(400).json({
      statusCode: 400,
      message: 'Validation failed',
      errors: errorMessages,
      path: request.url,
    });
  }
}
