import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ILocationRepository } from 'src/domain/repositories/locationRepository.interface';
import { Location } from '../entities/location.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, TreeRepository } from 'typeorm';
import { LocationModel } from 'src/domain/model/location';

@Injectable()
export class LocationRepository implements ILocationRepository {
  constructor(
    @InjectRepository(Location)
    private readonly locationEntityRepository: TreeRepository<Location>,
    private readonly dataSource: DataSource, // Use DataSource to run raw SQL
  ) {}
  async findDescendants(id: number): Promise<LocationModel[]> {
    const parent = await this.locationEntityRepository.findOne({
      where: { id: id },
    });

    if (!parent) {
      throw new NotFoundException(`Parent with id ${id} not found`);
    }
    const descendants =
      await this.locationEntityRepository.findDescendants(parent);
    return descendants.map((locationsEntity) =>
      this.toLocationModel(locationsEntity),
    );
  }
  async findAncestors(id: number): Promise<LocationModel[]> {
    const location = await this.locationEntityRepository.findOne({
      where: { id: id },
    });

    if (!location) {
      throw new NotFoundException(`Location with id ${id} not found`);
    }
    const locationsEntity =
      await this.locationEntityRepository.findAncestors(location);
    return locationsEntity.map((locationsEntity) =>
      this.toLocationModel(locationsEntity),
    );
  }
  async insert(location: LocationModel): Promise<LocationModel> {
    const existingLocation = await this.locationEntityRepository.findOne({
        where: {
          building: location.building,
          number: location.number,
        },
      });
  
      if (existingLocation) {
        throw new Error('A location with this building and number already exists');
      }
  
      // Proceed with saving if no duplicate is found
      const locationEntity = await this.toLocationEntity(location);
      const result = await this.locationEntityRepository.save(locationEntity);
      return this.toLocationModel(result);
  }
  async findAll(): Promise<LocationModel[]> {
    const locationsEntity = await this.locationEntityRepository.findTrees();
    return locationsEntity.map((locationsEntity) =>
      this.toLocationModel(locationsEntity),
    );
  }
  async findById(id: number): Promise<LocationModel> {
    const location = await this.locationEntityRepository.findOne({
      where: { id: id },
    });

    if (!location) {
      throw new NotFoundException(`Location with id ${id} not found`);
    }
    return this.toLocationModel(location);
  }

  // a la tro toi b , b la cha c, c la cha cua d,
  //=> Q: update a co cha la d đc hay k
  // implement validation check cha co hop le hay k

  async updateLocation(updateData: LocationModel): Promise<void> {
    //  Fetch the existing location
    const location = await this.locationEntityRepository.findOneBy({ id: updateData.id });
    if (!location) {
      throw new NotFoundException(`Location with id ${updateData.id} not found`);
    }

    //Check for circular dependency if a new parent is specified
    if (updateData.parentId !== undefined && updateData.parentId !== null) {
      // Run a recursive CTE to check if `updateData.parentId` is a descendant of `updateData.id`
      const descendants = await this.dataSource.query(
        `
        WITH RECURSIVE Descendants AS (
            SELECT id, number, name, building, area, parent_id
            FROM locations
            WHERE id = $1
      
            UNION ALL
      
            SELECT l.id, l.number, l.name, l.building, l.area, l.parent_id
            FROM locations l
            INNER JOIN Descendants d ON l.parent_id = d.id
        )
        SELECT * FROM Descendants;
        `,
        [updateData.id]
      );
      
      // If the query returns a result, it means a circular dependency would be created
      for(const descendant of descendants) {
        if (updateData.parentId === descendant.id) {
            throw new BadRequestException(
              'Cannot set a descendant as the parent; this would create a circular dependency'
            );
          }
      }
    }

    //  Update fields if no circular dependency was detected
    location.name = updateData.name;
    location.area = updateData.area;

    // Set the new parent, if specified
    if (updateData.parentId !== undefined) {
      location.parent = updateData.parentId ? { id: updateData.parentId } as Location : null;
    }

    // Step 4: Save the updated location
    await this.locationEntityRepository.save(location);
  }
  async deleteById(id: number): Promise<void> {
    const location = await this.locationEntityRepository.findOne({
      where: { id },
      relations: ['children'],
    });

    if (!location) {
      throw new NotFoundException(`Location with id ${id} not found`);
    }

    await this.locationEntityRepository.remove(location);
  }
  private toLocationModel(locationEntity: Location): LocationModel {
    const locationModel: LocationModel = new LocationModel();

    locationModel.id = locationEntity.id;
    locationModel.area = locationEntity.area;
    locationModel.name = locationEntity.name;
    locationModel.number = locationEntity.number;
    locationModel.building = locationEntity.building;
    if (locationEntity.parent) {
      locationModel.parentId = locationEntity.parent.id;
    }
    if (locationEntity.children && locationEntity.children.length > 0) {
      locationModel.children = locationEntity.children.map((child) =>
        this.toLocationModel(child),
      );
    }
    return locationModel;
  }
  private async toLocationEntity(location: LocationModel): Promise<Location> {
    const locationEntity: Location = new Location();

    locationEntity.id = location.id;
    locationEntity.area = location.area;
    locationEntity.name = location.name;
    locationEntity.number = location.number;
    locationEntity.building = location.building;

    if (location.parentId) {
      const parent = await this.locationEntityRepository.findOneBy({
        id: location.parentId,
      });
      locationEntity.parent = parent;
    }
    return locationEntity;
  }
}
