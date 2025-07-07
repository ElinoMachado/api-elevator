import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ElevatorService } from './elevator.service';
import { CreateElevatorDto } from './dto/create-elevator.dto';
import { UpdateElevatorDto } from './dto/update-elevator.dto';

@Controller('elevator')
export class ElevatorController {
  constructor(private readonly elevatorService: ElevatorService) {}

  @Post()
  create(@Body() createElevatorDto: CreateElevatorDto) {
    return this.elevatorService.create(createElevatorDto);
  }

  @Get()
  findAll() {
    return this.elevatorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.elevatorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateElevatorDto: UpdateElevatorDto) {
    return this.elevatorService.update(+id, updateElevatorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.elevatorService.remove(+id);
  }
}
