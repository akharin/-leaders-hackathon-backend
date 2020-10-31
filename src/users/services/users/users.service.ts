import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IDbUserDoc } from '../../interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<IDbUserDoc>) {}

  find() {
    return this.userModel.find({}).exec();
  }

  getModel() {
    return this.userModel;
  }
}
