import { CreateBuildingDto } from './create-building.dto';

export class BuildingsSummary {
  buildings: CreateBuildingDto[];
  summary: {
    totalMonthlyProfit: number;
    totalAnnualProfit: number;
    totalProfit: number;
  };
}
