import { Body, Controller, Inject, Post } from "@nestjs/common";
import { ApiExtraModels, ApiResponse, ApiTags } from "@nestjs/swagger";
import { LocationPresenter } from "./location.presenter";
import { UsecasesProxyModule } from "src/infrastructure/usecases-proxy/usecases-proxy.module";
import { UseCaseProxy } from "src/infrastructure/usecases-proxy/usecase-proxy";
import { addLocationUseCases } from "src/usecases/location/add-location.usecases";
import { ApiResponseType } from "src/infrastructure/common/swagger/response.decorator";
import { AddLocationDto } from "./location.dto";

@Controller('')
@ApiTags('location')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(LocationPresenter)
export class LocationController {
    constructor(
        @Inject(UsecasesProxyModule.POST_LOCATION_USECASES_PROXY)
        private readonly postlocationUsecaseProxy: UseCaseProxy<addLocationUseCases>,
      ) {}
      @Post('locations')
      @ApiResponseType(LocationPresenter, true)
      async addLocation(@Body() addLocationDto: AddLocationDto) {
        const locationCreated = await this.postlocationUsecaseProxy.getInstance().execute(addLocationDto);
        return new LocationPresenter(locationCreated);
      }
}