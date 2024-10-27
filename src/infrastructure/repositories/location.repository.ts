import { Injectable } from "@nestjs/common";
import { ILocationRepository } from "src/domain/repositories/locationRepository.interface";
import { Location } from "../entities/location.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { LocationModel } from "src/domain/model/location";

@Injectable()
export class DatabaseTodoRepository implements ILocationRepository {
    constructor(
        @InjectRepository(Location)
        private readonly locationEntityRepository: Repository<Location>,
      ) {}
    insert(location: LocationModel): Promise<void> {
        throw new Error("Method not implemented.");
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
}