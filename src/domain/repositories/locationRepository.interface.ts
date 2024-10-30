import { LocationModel } from "../model/location";

export interface ILocationRepository {
    insert(location: LocationModel): Promise<LocationModel>;
    findAll(): Promise<LocationModel[]>;
    findById(id: number): Promise<LocationModel>;
    updateLocation(updateData: LocationModel): Promise<void>;
    deleteById(id: number): Promise<void>;
  }