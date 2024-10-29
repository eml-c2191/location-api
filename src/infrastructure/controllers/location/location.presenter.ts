import { ApiProperty } from "@nestjs/swagger";
import { LocationModel } from "src/domain/model/location";

export class LocationPresenter {
    @ApiProperty()
    id: number;
    @ApiProperty()
    name: string;
    @ApiProperty()
    number: string;
    @ApiProperty()
    area: number;
    @ApiProperty()
    parentId?: number;
    constructor(locationModel: LocationModel) {
      this.id = locationModel.id;
      this.name = locationModel.name;
      this.number = locationModel.number;
      this.area = locationModel.area;
      this.parentId = locationModel.parentId
    }
}