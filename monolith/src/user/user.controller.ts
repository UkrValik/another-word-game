import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserId } from '../guards/user.decorator';
import { JWTAuthGuard } from '../guards/jwt.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JWTAuthGuard)
  @Get('info')
  async getUserInfo(@UserId() userId: string) {
    return this.userService.findById(userId);
  }
}
