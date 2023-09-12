import { Module } from '@nestjs/common';
import { PortalsService } from './portals.service';
import { PortalsController } from './portals.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [PortalsController],
  providers: [PortalsService],
})
export class PortalsModule {}
