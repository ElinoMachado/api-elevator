import { Injectable } from '@nestjs/common';
import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';
import { BuildingsSummary } from './dto/buildings-summary.dto';

@Injectable()
export class BuildingService {
  buildingsDataBase: CreateBuildingDto[] = this.generateMockBuildings(30);

  create(createBuildingDto: CreateBuildingDto) {
    this.buildingsDataBase.push(createBuildingDto);
    return createBuildingDto;
  }

  findAll() {
    return this.normalizeBuildingsData(this.buildingsDataBase);
  }

  findOne(id: string) {
    return this.buildingsDataBase.find((building) => building.id === id);
  }

  update(id: string, updateBuildingDto: UpdateBuildingDto) {
    const buildingIndex = this.buildingsDataBase.findIndex(
      (building) => building.id === id,
    );
    if (buildingIndex !== -1) {
      this.buildingsDataBase[buildingIndex] = {
        ...this.buildingsDataBase[buildingIndex],
        ...updateBuildingDto,
      };
      return this.normalizeBuildingsData([
        this.buildingsDataBase[buildingIndex],
      ]).buildings[0];
    }
    return null;
  }

  remove(id: string) {
    const buildingIndex = this.buildingsDataBase.findIndex(
      (building) => building.id === id,
    );
    if (buildingIndex !== -1) {
      this.buildingsDataBase.splice(buildingIndex, 1);
      return true;
    }
    return false;
  }
  normalizeBuildingsData(buildings: CreateBuildingDto[]): BuildingsSummary {
    let globalMonthlyProfit = 0;
    let globalAnnualProfit = 0;
    let globalTotalProfit = 0;

    const normalizedBuildings = buildings.map((building) => {
      let totalMonthlyProfit = 0;
      let totalAnnualProfit = 0;
      let totalProfit = 0;

      const normalizedElevators = building.elevators.map((elevator) => {
        const monthlyProfit = elevator.monthlyProfit ?? 0;
        const annualProfit = monthlyProfit * 12;
        const totalProfitElevator =
          (elevator.saleValue ?? 0) - (elevator.totalExpenses ?? 0);

        totalMonthlyProfit += monthlyProfit;
        totalAnnualProfit += annualProfit;
        totalProfit += totalProfitElevator;

        return {
          ...elevator,
          monthlyProfit,
          annualProfit,
          totalProfit: totalProfitElevator,
        };
      });

      globalMonthlyProfit += totalMonthlyProfit;
      globalAnnualProfit += totalAnnualProfit;
      globalTotalProfit += totalProfit;

      return {
        ...building,
        elevators: normalizedElevators,
        monthlyProfit: totalMonthlyProfit,
        annualProfit: totalAnnualProfit,
        totalProfit: totalProfit,
      };
    });

    return {
      buildings: normalizedBuildings,
      summary: {
        totalMonthlyProfit: globalMonthlyProfit,
        totalAnnualProfit: globalAnnualProfit,
        totalProfit: globalTotalProfit,
      },
    };
  }
  private generateMockBuildings(count: number): CreateBuildingDto[] {
    const statuses = [
      'High Profitability',
      'Moderate',
      'critical',
      'defective',
    ];

    const statusColorMap: Record<string, string> = {
      'High Profitability': '#7FBE8B',
      Moderate: '#D9D9D9',
      critical: '#ED7171',
      defective: '#D9BD6F',
    };

    return Array.from({ length: count }, (_, i) => {
      const status = statuses[i % statuses.length];
      const profitBase = 1000 * (i + 1);

      return {
        id: `bld-${i + 1}`,
        name: `Building ${i + 1}`,
        address: `Street ${i + 1}, Number ${100 + i}`,
        residents: Math.floor(Math.random() * 200) + 10,
        maintenanceCount: Math.floor(Math.random() * 10),
        status,
        totalProfit: profitBase * 12,
        annualProfit: profitBase,
        monthlyProfit: Math.round(profitBase / 12),
        elevators: Array.from(
          { length: Math.floor(Math.random() * 5) + 1 },
          (_, j) => ({
            id: `elev-${i + 1}-${j + 1}`,
            name: `Elevator ${j + 1}`,
            model: `Model ${j + 1}`,
            status: 'Operational',
            installationDate: new Date(2020, 0, 1 + j),
            lastMaintenance: new Date(2023, 0, 1 + j),
            saleValue: 50000 + j * 10000,
            maintenanceCost: 2000 + j * 500,
            capacity: 8 + j,
            speed: 1.5 + j * 0.1,
            manufacturer: `Manufacturer ${j + 1}`,
            totalExpenses: 10000 + j * 1000,
            technicalNotes: `Technical notes for elevator ${j + 1}`,
            totalProfit: 20000 + j * 2000,
            annualProfit: 5000 + j * 500,
            monthlyProfit: 400 + j * 40,
          }),
        ),
        color: statusColorMap[status],
      };
    });
  }
}
