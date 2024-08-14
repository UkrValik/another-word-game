import { Body, Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { AccountGetInfo } from '@awg-backend/contracts';

@Controller()
export class UserQueries {
  constructor(
    private readonly userService: UserService,
  ) {}

  @RMQValidate()
  @RMQRoute(AccountGetInfo.topic)
  async getUserInfo(@Body() { _id }: { _id: string }) {
    return this.userService.findById(_id);
  }
}
