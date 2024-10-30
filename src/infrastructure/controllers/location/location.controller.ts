import { Body, Controller, Get, Inject, Post, Put } from "@nestjs/common";
import { ApiExtraModels, ApiResponse, ApiTags } from "@nestjs/swagger";
import { LocationPresenter } from "./location.presenter";
import { UsecasesProxyModule } from "src/infrastructure/usecases-proxy/usecases-proxy.module";
import { UseCaseProxy } from "src/infrastructure/usecases-proxy/usecase-proxy";
import { addLocationUseCases } from "src/usecases/location/add-location.usecases";
import { ApiResponseType } from "src/infrastructure/common/swagger/response.decorator";
import { AddLocationDto } from "./location.dto";
import { getLocationsUseCases } from "src/usecases/location/get-locations.usecases";
import { updateLocationUseCases } from "src/usecases/location/update-location.usecases";

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
      ) {}
      @Post('location')
      @ApiResponseType(LocationPresenter, true)
      async addLocation(@Body() addLocationDto: AddLocationDto) {
        const locationCreated = await this.postlocationUsecaseProxy.getInstance().execute(addLocationDto);
        return new LocationPresenter(locationCreated);
      }
      @Get('location')
      @ApiResponseType(LocationPresenter, true)
      async getLocations() {
        const locations = await this.getlocationsUsecaseProxy.getInstance().execute();
        return locations.map((todo) => new LocationPresenter(todo));
      }
      @Put('location')
      @ApiResponseType(LocationPresenter, true)
      async updateTodo(@Body() updateLocationDto: AddLocationDto) {
        await this.updateLocationUsecaseProxy.getInstance().execute(updateLocationDto);
        return 'success';
      }
}