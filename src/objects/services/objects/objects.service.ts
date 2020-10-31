import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { IDbObjectDoc } from '../../interfaces/object.interface';

@Injectable()
export class ObjectsService {
  constructor(@InjectModel('Object') private objectModel: Model<IDbObjectDoc>) {}

  find() {
    return this.objectModel.find({}).exec();
  }
}
