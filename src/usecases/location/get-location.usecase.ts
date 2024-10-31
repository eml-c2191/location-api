import { LocationModel } from "src/domain/model/location";
import { ILocationRepository } from "src/domain/repositories/locationRepository.interface";

export class getLocationUseCases {
    constructor(private readonly locationRepository: ILocationRepository) {}
  
    async execute(id: number): Promise<LocationModel> {
      const result = await this.locationRepository.findById(id);
      return result;
    }
  }