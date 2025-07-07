import { CreateElevatorDto } from 'src/elevator/dto/create-elevator.dto';

export class CreateBuildingDto {
  id: string;
  name: string;
  address: string;
  residents: number;
  maintenanceCount: number;
  status: string;
  totalProfit: number;
  annualProfit: number;
  monthlyProfit: number;
  elevators: CreateElevatorDto[];
  color: string;
}
