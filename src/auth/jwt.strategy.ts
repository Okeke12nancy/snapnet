import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import UserService from 'src/user/user.service';
import { JwtPayload } from './jwt-payload-interface';
import appConfig from '../../config/auth.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: appConfig().jwtSecret,
    });
  }

  async validate(payload: JwtPayload) {
    console.log({ payload });
    const user = await this.userService.getUserRecord({
      identifier: payload.email,
      identifierType: 'email',
    });
    console.log(user);
    if (!user) {
      throw new UnauthorizedException();

      return user;
    }
  }
}
