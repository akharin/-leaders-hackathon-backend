import { Controller, Get } from '@nestjs/common';
import { ObjectsService } from '../../services/objects/objects.service';

@Controller('objects')
export class ObjectsController {
  constructor(private readonly objectsService: ObjectsService) {}

  @Get()
  getObjects() {
    return this.objectsService.find();
  }
}
