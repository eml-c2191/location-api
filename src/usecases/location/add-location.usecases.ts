import { ILogger } from "src/domain/logger/logger.interface";
import { LocationModel } from "src/domain/model/location";
import { ILocationRepository } from "src/domain/repositories/locationRepository.interface";
import { LocationDto } from "src/infrastructure/controllers/location/location.dto";

export class addLocationUseCases {
    constructor(private readonly logger: ILogger, private readonly locationRepository: ILocationRepository) {}
  
    async execute(locationDto : LocationDto ): Promise<LocationModel> {
      const locationModel = new LocationModel();
      locationModel.area = locationDto.area;
      locationModel.name = locationDto.name;
      locationModel.level = locationDto.level;
      locationModel.parentId = locationDto.parentId
      const result = await this.locationRepository.insert(locationModel);
      this.logger.log('addLocationUseCases execute', 'New location have been inserted');
      return result;
    }
  }