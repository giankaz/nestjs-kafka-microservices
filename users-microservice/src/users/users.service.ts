import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/databases/services/prisma.service';
import { ErrorHandler } from 'src/handler/error.handler';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject('USER_SERVICE')
    private readonly userKafkaClient: ClientKafka,
  ) {}

  public async create(createUserDto: CreateUserDto) {
    return ErrorHandler.handle({
      context: 'Users - Create',
      request: async () => {
        const user = await this.prismaService.user.create({
          data: createUserDto,
        });

        this.userKafkaClient.emit('users.created', JSON.stringify(user));

        return user;
      },
    });
  }

  public async findAll() {
    return ErrorHandler.handle({
      context: 'Users - FindAll',
      request: async () => await this.prismaService.user.findMany(),
    });
  }

  public async findOne(id: number) {
    return ErrorHandler.handle({
      context: 'Users - FindOne',
      request: async () =>
        await this.prismaService.user.findUniqueOrThrow({
          where: {
            id,
          },
        }),
    });
  }

  public async update(id: number, updateUserDto: UpdateUserDto) {
    return ErrorHandler.handle({
      context: 'Users - Update',
      request: async () =>
        await this.prismaService.user.update({
          where: {
            id,
          },
          data: updateUserDto,
        }),
    });
  }

  public async remove(id: number) {
    return ErrorHandler.handle({
      context: 'Users - Remove',
      request: async () => {
        await this.prismaService.user.delete({
          where: {
            id,
          },
        });

        this.userKafkaClient.emit('users.removed', id);
      },
    });
  }
}
