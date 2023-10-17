import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Prisma } from '@prisma/client'
import { BaseExceptionFilter } from '@nestjs/core';

// To ensure that this filter catches 'PrismaClientKnownRequestError' we added it here in the @Catch() decorator
@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    console.error(exception.message);

    super.catch(exception, host);

  }
}
