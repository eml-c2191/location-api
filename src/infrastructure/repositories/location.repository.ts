import { Injectable } from "@nestjs/common";
import { ILocationRepository } from "src/domain/repositories/locationRepository.interface";
import { Location } from "../entities/location.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { LocationModel } from "src/domain/model/location";

@Injectable()
export class LocationRepository implements ILocationRepository {
    constructor(
        @InjectRepository(Location)
        private readonly locationEntityRepository: Repository<Location>,
      ) {}
    async  insert(location: LocationModel): Promise<LocationModel> {
        const locationEntity = await this.toLocationEntity(location);
        const result = await this.locationEntityRepository.insert(locationEntity);
        return this.toLocationModel(result.generatedMaps[0] as Location);
    }
    findAll(): Promise<LocationModel[]> {
        throw new Error("Method not implemented.");
    }
    findById(id: number): Promise<LocationModel> {
        throw new Error("Method not implemented.");
    }
    updateLocation(id: number, updateData: LocationModel): Promise<void> {
        throw new Error("Method not implemented.");
    }
    deleteById(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
    private toLocationModel(locationEntity: Location): LocationModel {
        const locationModel: LocationModel = new LocationModel();
    
        locationModel.id = locationEntity.id;
        locationModel.area = locationEntity.area;
        locationModel.name = locationEntity.name;
        locationModel.number = locationEntity.number;
        
        return locationModel;
      }
    private async toLocationEntity(location: LocationModel): Promise<Location> {
        const locationEntity: Location = new Location();
        
        locationEntity.id = location.id;
        locationEntity.area = location.area;
        locationEntity.name = location.name;
        locationEntity.number = location.number

        if (location.parentId) {
            const parent = await this.locationEntityRepository.findOneOrFail({ where: { id :location.parentId } });
            locationEntity.parent = parent;
          }
        return locationEntity;
      }
}