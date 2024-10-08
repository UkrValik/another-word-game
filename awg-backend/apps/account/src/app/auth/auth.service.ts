import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user/repositories/user.repository';
import { UserEntity } from '../user/entities/user.entity';
import { UserRole } from '@awg-backend/interfaces';
import { JwtService } from '@nestjs/jwt';
import { AccountRegister } from '@awg-backend/contracts';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async register({ email, password, userName, displayName }: AccountRegister.Request) {
    const oldUser = await this.userRepository.findUser(email);
    if (oldUser) {
      throw new Error('This user is already registered');
    }
    const newUserEntity = await new UserEntity({
      displayName,
      userName,
      email,
      passwordHash: '',
      role: UserRole.Regular,
    }).setPassword(password);
    const newUser = await this.userRepository.createUser(newUserEntity);
    newUser.passwordHash = '';
    const { access_token } = await this.login(newUser._id);
    return { user: newUser, access_token };
  }

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findUser(email);
    if (!user) {
      throw new Error('Wrong login or password');
    }
    const userEntity = new UserEntity(user);
    const isCorrectPassword = await userEntity.validatePassword(password);
    if (!isCorrectPassword) {
      throw new Error('Wrong login or password');
    }
    return { id: user._id };
  }

  async login(id: string) {
    return {
      access_token: await this.jwtService.signAsync({ id }),
    };
  }
}
