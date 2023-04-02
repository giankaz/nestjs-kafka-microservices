import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/databases/services/prisma.service';
import { ErrorHandler } from 'src/handler/error.handler';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}
  create(createUserDto: CreateUserDto) {
    return ErrorHandler.handle({
      context: 'Users - Create',
      request: async () => {
        return this.prismaService.user.create({
          data: { id: createUserDto.id },
        });
      },
    });
  }

  remove(id: number) {
    return ErrorHandler.handle({
      context: 'Users - Remove',
      request: async () => {
        return this.prismaService.user.delete({
          where: {
            id,
          },
        });
      },
    });
  }
}
