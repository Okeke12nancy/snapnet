import { Request } from 'express';
import { User } from 'src/user/entities/user.entity';

export interface IRequest extends Request {
  user: User;
}
