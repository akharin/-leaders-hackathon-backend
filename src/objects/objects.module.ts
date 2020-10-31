import { Module } from '@nestjs/common';
import { ObjectsService } from './services/objects/objects.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ObjectSchema } from './schemas/object.schema';
import { ObjectsController } from './controller/objects/objects.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Object', schema: ObjectSchema }])],
  providers: [ObjectsService],
  controllers: [ObjectsController]
})
export class ObjectsModule {}
