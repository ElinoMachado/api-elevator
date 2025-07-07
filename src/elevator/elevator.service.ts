import { Injectable } from '@nestjs/common';
import { CreateElevatorDto } from './dto/create-elevator.dto';
import { UpdateElevatorDto } from './dto/update-elevator.dto';

@Injectable()
export class ElevatorService {
  create(createElevatorDto: CreateElevatorDto) {
    return 'This action adds a new elevator';
  }

  findAll() {
    return `This action returns all elevator`;
  }

  findOne(id: number) {
    return `This action returns a #${id} elevator`;
  }

  update(id: number, updateElevatorDto: UpdateElevatorDto) {
    return `This action updates a #${id} elevator`;
  }

  remove(id: number) {
    return `This action removes a #${id} elevator`;
  }
}
