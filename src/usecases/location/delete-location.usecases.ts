import { ILogger } from "src/domain/logger/logger.interface";
import { ILocationRepository } from "src/domain/repositories/locationRepository.interface";

export class deleteLocationUseCases {
    constructor(private readonly logger: ILogger, private readonly locationRepository: ILocationRepository) {}
  
    async execute(id : number ): Promise<void> {
      await this.locationRepository.deleteById(id);
      this.logger.log('deleteLocationUseCases execute', `Location ${id} have been deleted`);
    }
  }