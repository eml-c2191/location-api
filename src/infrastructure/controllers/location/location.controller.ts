import { Controller } from "@nestjs/common";
import { ApiExtraModels, ApiResponse, ApiTags } from "@nestjs/swagger";
import { LocationPresenter } from "./location.presenter";

@Controller('location')
@ApiTags('location')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(LocationPresenter)
export class LocationController {

}