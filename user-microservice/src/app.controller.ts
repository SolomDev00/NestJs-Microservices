import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Message Pattern ( Res - Req )
  @MessagePattern({ cmd: 'GET_ALL_USERS' })
  getAllUser() {
    return this.appService.getAllUsers();
  }

  // Event Pattern ( Event - Driven )
  @EventPattern({ cmd: 'CREATE_USER' })
  createUser(user: { name: string; email: string }) {
    return this.appService.createUser(user);
  }
}
