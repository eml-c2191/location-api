import { ILogger } from "src/domain/logger/logger.interface";
import { LocationModel } from "src/domain/model/location";
import { ILocationRepository } from "src/domain/repositories/locationRepository.interface";
import { AddLocationDto } from "src/infrastructure/controllers/location/location.dto";

export class updateLocationUseCases {
    constructor(private readonly logger: ILogger, private readonly locationRepository: ILocationRepository) {}
  
    async execute(locationDto : AddLocationDto ): Promise<void> {
     const locationModel = new LocationModel();
      locationModel.area = locationDto.area;
      locationModel.name = locationDto.name;
      locationModel.number = locationDto.number;
      locationModel.parentId = locationDto.parentId
      await this.locationRepository.updateLocation(locationModel);
      this.logger.log('updateLocationUseCases execute', `Location ${locationModel.id} have been updated`);
    }
  }