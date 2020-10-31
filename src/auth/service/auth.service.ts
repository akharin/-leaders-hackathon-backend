import { ForbiddenException, Injectable } from '@nestjs/common';
import { UsersService } from '../../users/services/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async login(phone: string, password: string) {
    const user = await this.usersService.getModel().findOne({ phone, password }).exec();
    if (!user) {
      throw new ForbiddenException();
    }
    return user;
  }

  logout() {
    // TODO
  }

  register(
    phone: string,
    password: string,
    name: string,
    organization: string,
    position: string,
  ) {
    return this.usersService.getModel().create({
      phone,
      password,
      name,
      organization,
      position,
    });
  }
}
