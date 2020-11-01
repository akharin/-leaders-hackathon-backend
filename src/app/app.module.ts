import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { LocationsModule } from '../locations/locations.module';
import { WorkShiftsModule } from '../work-shifts/work-shifts.module';
import { ObjectsModule } from '../objects/objects.module';
import { UsersModule } from '../users/users.module';
import { AppController } from './controller/app.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/leaders-hackathon', {
      useNewUrlParser: true,
      useFindAndModify: false,
    }),
    AuthModule,
    LocationsModule,
    WorkShiftsModule,
    ObjectsModule,
    UsersModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
