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
    building: string;
    @ApiProperty()
    area: number;
    @ApiProperty()
    parentId?: number;
    @ApiProperty()
    children ?: LocationModel[];
    constructor(locationModel: LocationModel) {
      this.id = locationModel.id;
      this.name = locationModel.name;
      this.number = locationModel.number;
      this.building = locationModel.building;
      this.area = locationModel.area;
      this.parentId = locationModel.parentId;
      this.children = locationModel.children
    }
}