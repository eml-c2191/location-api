import { Injectable, NotFoundException } from "@nestjs/common";
import { ILocationRepository } from "src/domain/repositories/locationRepository.interface";
import { Location } from "../entities/location.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { TreeRepository } from "typeorm";
import { LocationModel } from "src/domain/model/location";

@Injectable()
export class LocationRepository implements ILocationRepository {
    constructor(
        @InjectRepository(Location)
        private readonly locationEntityRepository: TreeRepository<Location>,
      ) {}
    async  insert(location: LocationModel): Promise<LocationModel> {
        const locationEntity = await this.toLocationEntity(location);
        const result = await this.locationEntityRepository.save(locationEntity);
        return this.toLocationModel(result);
    }
    async findAll(): Promise<LocationModel[]> {
        const locationsEntity = await this.locationEntityRepository.findTrees();
        return locationsEntity.map((locationsEntity) => this.toLocationModel(locationsEntity));
    }
    async findById(id: number): Promise<LocationModel> {
        const location = await this.locationEntityRepository.findOne({ where: { id: id } });

        if (!location) {
            throw new NotFoundException(`Location with id ${id} not found`);
        }
        return this.toLocationModel(location);
    }
    async updateLocation(updateData: LocationModel): Promise<void> {
            const location = await this.locationEntityRepository.findOneBy({id: updateData.id  });

            if (!location) {
                throw new NotFoundException(`Location with id ${updateData.id} not found`);
            }
            location.name = updateData.name;
            location.level = updateData.level;
            location.area = updateData.area;

            if (updateData.parentId !== undefined) {
                location.parent = updateData.parentId ? { id: updateData.parentId } as Location : null;
            }

            await this.locationEntityRepository.save(location);
    }
    async deleteById(id: number): Promise<void> {
        const location = await this.locationEntityRepository.findOne({
            where: { id },
            relations: ['children'] 
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
        locationModel.level = locationEntity.level;
        
        if (locationEntity.children && locationEntity.children.length > 0) {
            locationModel.children = locationEntity.children.map(child => this.toLocationModel(child));
          }
        return locationModel;
      }
    private async toLocationEntity(location: LocationModel): Promise<Location> {
        const locationEntity: Location = new Location();
        
        locationEntity.id = location.id;
        locationEntity.area = location.area;
        locationEntity.name = location.name;
        locationEntity.level = location.level

        if (location.parentId) {
            const parent = await this.locationEntityRepository.findOneBy({ id :location.parentId });
            locationEntity.parent = parent;
          }
        return locationEntity;
      }
}