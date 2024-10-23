// import { Injectable } from '@nestjs/common';
// import { Repository } from 'typeorm';
// import { InjectRepository } from '@nestjs/typeorm';
// import { User } from './entities/user.entity';
// import CreateUserDTO from '../auth/dto/create-user.dto';

// @Injectable()
// export default class UserService {
//   constructor(
//     @InjectRepository(User)
//     private userRepository: Repository<User>,
//   ) {}

//   async createUser(createUserDto: CreateUserDTO): Promise<User> {
//     const newUser = this.userRepository.create(createUserDto);
//     return this.userRepository.save(newUser);
//   }

//   async getUserRecord(query: {
//     identifier: string;
//     identifierType: 'email' | 'id';
//   }): Promise<User | null> {
//     if (query.identifierType === 'email') {
//       return this.userRepository.findOne({
//         where: { email: query.identifier },
//       });
//     }
//     return this.userRepository.findOne({ where: { id: query.identifier } });
//   }
// }
