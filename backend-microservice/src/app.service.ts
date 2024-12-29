import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserCreatedEvent } from './user.event';

@Injectable()
export class AppService {
  constructor(
    @Inject('USER_MICROSERVICE') private readonly userMicroservice: ClientProxy,
  ) {}

  getAllUsers() {
    return this.userMicroservice.send({ cmd: 'GET_ALL_USERS' }, {});
  }

  createUser(user: { name: string; email: string }) {
    return this.userMicroservice.emit(
      { cmd: 'CREATE_USER' },
      new UserCreatedEvent(user.name, user.email),
    );
  }
}
