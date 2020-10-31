import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IDbUserDoc } from '../interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(@InjectModel('User') private userModel: Model<IDbUserDoc>) {}

  async login(phone: string, password: string) {
    const user = await this.userModel.findOne({ phone, password });
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
    return this.userModel.create({
      phone,
      password,
      name,
      organization,
      position,
    });
  }
}
