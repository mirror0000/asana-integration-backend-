import { AuthsService } from './auths.service';
import { Controller, Get, UseGuards, Req, Res } from '@nestjs/common';
import { JwtAuthGuard } from './guard/jwt.auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthsService) {}

  @Get() 
  jiraLogin(@Res() res) {
    res.redirect(this.authService.getAsanaLoginUrl());
  }

  @Get('callback') 
  async asanaCallback(@Req() req) {
    try {
      const data = await this.authService.authorize(req.query.code);
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  // @Get('/profile')
  // // @UseGuards(JwtAuthGuard)
  // async getAccessible(@Req() req) {
  //   try {
  //     return this.authService.getAccessible(req.query.access_token);
  //   } catch (error) {
  //     console.log(error);
  //     return error;
  //   }
  // }
}
