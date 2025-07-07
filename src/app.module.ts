import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FeeModule } from './fee/fee.module';
import { BuildingModule } from './building/building.module';
import { ElevatorModule } from './elevator/elevator.module';

@Module({
  imports: [FeeModule, BuildingModule, ElevatorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
