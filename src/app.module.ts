import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthsModule } from './auths/auths.module';
import { ConfigModule } from '@nestjs/config';
import { PortalsModule } from './portals/portals.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    AuthsModule,
    PortalsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
