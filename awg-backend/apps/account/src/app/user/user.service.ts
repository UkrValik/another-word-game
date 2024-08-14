import { Injectable } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  async findById(_id: string) {
    const user = await this.userRepository.findById(_id);
    user.passwordHash = undefined;
    return user;
  }
}
