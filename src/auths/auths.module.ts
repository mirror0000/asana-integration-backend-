import { Module } from '@nestjs/common';
import { AuthController } from './auths.controller';
import { PassportModule } from '@nestjs/passport';
import { AuthsService } from './auths.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    // PassportModule.register({
    //   defaultStrategy: 'clickup',
    //   prompt: 'consent',
    //   access_type: 'offline',
    // }),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '7d' },
      }),
      inject: [ConfigService],
      global: true,
    }),
  ],
  providers: [AuthsService],
  controllers: [AuthController],
})
export class AuthsModule {}
