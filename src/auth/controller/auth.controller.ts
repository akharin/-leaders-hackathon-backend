import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() data) {
    return this.authService.login(data.phone, data.password);
  }

  @Post('logout')
  logout() {
    return this.authService.logout();
  }

  @Post('register')
  register(@Body() data) {
    return this.authService.register(
      data.phone,
      data.password,
      data.name,
      data.organization,
      data.position,
    );
  }
}
