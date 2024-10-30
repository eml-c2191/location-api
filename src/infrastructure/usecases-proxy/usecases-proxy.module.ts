import { DynamicModule, Module } from '@nestjs/common';
import { LoggerModule } from '../logger/logger.module';
import { RepositoriesModule } from '../repositories/repositories.module';
import { ExceptionsModule } from '../exceptions/exceptions.module';
import { LoggerService } from '../logger/logger.service';
import { LocationRepository } from '../repositories/location.repository';
import { UseCaseProxy } from './usecase-proxy';
import { addLocationUseCases } from 'src/usecases/location/add-location.usecases';
import { getLocationsUseCases } from 'src/usecases/location/get-locations.usecases';

@Module({
    imports: [LoggerModule, RepositoriesModule, ExceptionsModule],
})
export class UsecasesProxyModule {
    static POST_LOCATION_USECASES_PROXY = 'postLocationUsecasesProxy';
    static GET_LOCATIONS_USECASES_PROXY = 'getLocationsUsecasesProxy';

    static register(): DynamicModule {
      return {
        module: UsecasesProxyModule,
        providers: [
          {
            inject: [LoggerService, LocationRepository],
            provide: UsecasesProxyModule.POST_LOCATION_USECASES_PROXY,
            useFactory: (logger: LoggerService, locationRepository: LocationRepository) =>
              new UseCaseProxy(new addLocationUseCases(logger, locationRepository)),
          },
          {
            inject: [LocationRepository],
            provide: UsecasesProxyModule.GET_LOCATIONS_USECASES_PROXY,
            useFactory: (locationRepository: LocationRepository) => new UseCaseProxy(new getLocationsUseCases(locationRepository)),
          },
        ],
        exports: [
          UsecasesProxyModule.POST_LOCATION_USECASES_PROXY,
          UsecasesProxyModule.GET_LOCATIONS_USECASES_PROXY
        ],
      };
    }
}
