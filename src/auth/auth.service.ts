import { Injectable, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
// import { UserService } from '../user/user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { CustomHttpException } from '../helpers/custom-http-filter';
import UserService from 'src/user/user.service';
// import SYS_MSG from '../helpers/SystemMessages';
export const USER_CREATED_SUCCESSFULLY = 'User Created Successfully';
export const INVALID_CREDENTIALS = 'Invalid credentials';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDTO) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.password = hashedPassword;
    await this.userService.createUser(createUserDto);
    return { message: USER_CREATED_SUCCESSFULLY };
  }

  async login(loginDto: LoginDto) {
    const user = await this.userService.getUserRecord({
      identifier: loginDto.email,
      identifierType: 'email',
    });

    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
      throw new CustomHttpException(
        INVALID_CREDENTIALS,
        HttpStatus.UNAUTHORIZED,
      );
    }

    const payload = { email: user.email, id: user.id };
    const accessToken = this.jwtService.sign(payload);

    return {
      access_token: accessToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  }
}
