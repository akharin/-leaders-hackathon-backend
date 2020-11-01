import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  greeting() {
    return {
      title: 'Привет!',
      description: 'Это серверное приложение Цифрового строительства'
    };
  }
}
