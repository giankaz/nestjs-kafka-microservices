import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/databases/services/prisma.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'user-client',
            brokers: ['localhost:9092'],
          },
          producerOnlyMode: true,
          consumer: {
            groupId: 'application-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [PrismaService, UsersService],
})
export class UsersModule {}
