import { LocationModel } from "src/domain/model/location";
import { ILocationRepository } from "src/domain/repositories/locationRepository.interface";

export class getLocationsUseCases {
    constructor(private readonly locationRepository: ILocationRepository) {}
  
    async execute(): Promise<LocationModel[]> {
      const result = await this.locationRepository.findAll();
      return result;
    }
    async executeToGetDescendants(id:number): Promise<LocationModel[]> {
      const result = await this.locationRepository.findDescendants(id);
      return result;
    }
    async executeToGetAncestor(id:number): Promise<LocationModel[]> {
      const result = await this.locationRepository.findAncestors(id);
      return result;
    }
  }