import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class AppService {
  private users = [];

  getAllUsers() {
    return this.users.length > 0
      ? this.users
      : new NotFoundException('Not users yet!');
  }

  createUser(user: any) {
      return this.users.push(user);
  }
}
