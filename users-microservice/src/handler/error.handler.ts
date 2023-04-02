import { BadRequestException } from '@nestjs/common';

type Handle = {
  context: string;
  request: () => Promise<unknown>;
};

export class ErrorHandler {
  static async handle({ context, request }: Handle) {
    try {
      return await request();
    } catch (err) {
      throw new BadRequestException(err.message, {
        cause: err,
        description: context,
      });
    }
  }
}
