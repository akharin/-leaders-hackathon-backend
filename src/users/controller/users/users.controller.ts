import { Controller, Get } from '@nestjs/common';
import { UsersService } from '../../services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers() {
    const users = await this.usersService.find();
    return users.map(user => ({
      _id: user._id,
      phone: user.phone,
      name: user.name,
      organization: user.organization,
      position: user.position,
    }))
  }
}
