import { Body, Controller, Delete, Get, Inject, ParseIntPipe, Post, Put, Query } from "@nestjs/common";
import { ApiExtraModels, ApiResponse, ApiTags } from "@nestjs/swagger";
import { LocationPresenter } from "./location.presenter";
import { UsecasesProxyModule } from "src/infrastructure/usecases-proxy/usecases-proxy.module";
import { UseCaseProxy } from "src/infrastructure/usecases-proxy/usecase-proxy";
import { addLocationUseCases } from "src/usecases/location/add-location.usecases";
import { ApiResponseType } from "src/infrastructure/common/swagger/response.decorator";
import { LocationDto, UpdateLocationDto } from "./location.dto";
import { getLocationsUseCases } from "src/usecases/location/get-locations.usecases";
import { updateLocationUseCases } from "src/usecases/location/update-location.usecases";
import { deleteLocationUseCases } from "src/usecases/location/delete-location.usecases";

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
        @Inject(UsecasesProxyModule.PUT_LOCATION_USECASES_PROXY)
        private readonly updateLocationUsecaseProxy: UseCaseProxy<updateLocationUseCases>,
        @Inject(UsecasesProxyModule.DELETE_LOCATION_USECASES_PROXY)
        private readonly deleteLocationUsecaseProxy: UseCaseProxy<deleteLocationUseCases>,
      ) {}
      @Post('')
      @ApiResponseType(LocationPresenter, true)
      async addLocation(@Body() addLocationDto: LocationDto) {
        const locationCreated = await this.postlocationUsecaseProxy.getInstance().execute(addLocationDto);
        return new LocationPresenter(locationCreated);
      }
      @Get('')
      @ApiResponseType(LocationPresenter, true)
      async getLocations() {
        const locations = await this.getlocationsUsecaseProxy.getInstance().execute();
        return locations.map((location) => new LocationPresenter(location));
      }
      @Put('')
      @ApiResponseType(LocationPresenter, true)
      async updateLocation(@Body() updateLocationDto: UpdateLocationDto) {
        await this.updateLocationUsecaseProxy.getInstance().execute(updateLocationDto);
      }
      @Delete('')
      @ApiResponseType(LocationPresenter, true)
      async deleteLocation(@Query('id', ParseIntPipe) id: number) {
        await this.deleteLocationUsecaseProxy.getInstance().execute(id);
      }
}