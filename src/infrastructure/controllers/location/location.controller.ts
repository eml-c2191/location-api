import { Body, Controller, Get, Inject, Post } from "@nestjs/common";
import { ApiExtraModels, ApiResponse, ApiTags } from "@nestjs/swagger";
import { LocationPresenter } from "./location.presenter";
import { UsecasesProxyModule } from "src/infrastructure/usecases-proxy/usecases-proxy.module";
import { UseCaseProxy } from "src/infrastructure/usecases-proxy/usecase-proxy";
import { addLocationUseCases } from "src/usecases/location/add-location.usecases";
import { ApiResponseType } from "src/infrastructure/common/swagger/response.decorator";
import { AddLocationDto } from "./location.dto";
import { getLocationsUseCases } from "src/usecases/location/get-locations.usecases";

@Controller('locations')
@ApiTags('locations')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(LocationPresenter)
export class LocationController {
    constructor(
        @Inject(UsecasesProxyModule.POST_LOCATION_USECASES_PROXY)
        private readonly postlocationUsecaseProxy: UseCaseProxy<addLocationUseCases>,
        @Inject(UsecasesProxyModule.GET_LOCATIONS_USECASES_PROXY)
        private readonly getlocationsUsecaseProxy: UseCaseProxy<getLocationsUseCases>,
      ) {}
      @Post('')
      @ApiResponseType(LocationPresenter, true)
      async addLocation(@Body() addLocationDto: AddLocationDto) {
        const locationCreated = await this.postlocationUsecaseProxy.getInstance().execute(addLocationDto);
        return new LocationPresenter(locationCreated);
      }
      @Get('')
      @ApiResponseType(LocationPresenter, true)
      async getLocations() {
        const locations = await this.getlocationsUsecaseProxy.getInstance().execute();
        return locations.map((todo) => new LocationPresenter(todo));
      }
}