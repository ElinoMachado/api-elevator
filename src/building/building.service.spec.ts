import { Test, TestingModule } from '@nestjs/testing';
import { BuildingService } from './building.service';
import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';

describe('BuildingService', () => {
  let service: BuildingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BuildingService],
    }).compile();

    service = module.get<BuildingService>(BuildingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a building', () => {
    const dto: CreateBuildingDto = {
      id: 'custom-id',
      name: 'New Building',
      address: '123 Test St',
      residents: 20,
      maintenanceCount: 1,
      status: 'Moderate',
      totalProfit: 0,
      annualProfit: 0,
      monthlyProfit: 0,
      elevators: [],
      color: '#CCCCCC',
    };

    const result = service.create(dto);
    expect(result).toEqual(dto);
    expect(service.findOne('custom-id')).toEqual(dto);
  });

  it('should find all buildings and summary', () => {
    const all = service.findAll();
    expect(all).toHaveProperty('buildings');
    expect(all).toHaveProperty('summary');
    expect(Array.isArray(all.buildings)).toBe(true);
  });

  it('should find one building by ID', () => {
    const building = service.findOne('bld-1');
    expect(building).toBeDefined();
    expect(building?.id).toBe('bld-1');
  });

  it('should update an existing building', () => {
    const updateDto: UpdateBuildingDto = { name: 'Updated Name' };
    const updated = service.update('bld-1', updateDto);
    expect(updated).toBeDefined();
    expect(updated && updated.name).toBe('Updated Name');
  });

  it('should not update a non-existing building', () => {
    const result = service.update('non-existent-id', { name: 'Test' });
    expect(result).toBeNull();
  });

  it('should remove an existing building', () => {
    const removed = service.remove('bld-1');
    expect(removed).toBe(true);
    expect(service.findOne('bld-1')).toBeUndefined();
  });

  it('should not remove a non-existing building', () => {
    const result = service.remove('non-existent-id');
    expect(result).toBe(false);
  });
});
