import { Controller, Get, UseGuards } from '@nestjs/common';
import { JWTAuthGuard } from '../guards/jwt.guard';
import { UserId } from '../guards/user.decorator';
import { RMQService } from 'nestjs-rmq';
import { AccountGetInfo } from '@awg-backend/contracts';

@Controller('user')
export class UserController {  
  constructor(
    private readonly rmqService: RMQService,
  ) {}
  
  @UseGuards(JWTAuthGuard)
  @Get('info')
  async getUserInfo(@UserId() userId: string) {
    return await this.rmqService.send<AccountGetInfo.Request, AccountGetInfo.Response>(AccountGetInfo.topic, { _id: userId });
  }
}
