import { ApiProperty } from "@nestjs/swagger";
import { LocationModel } from "src/domain/model/location";

export class LocationPresenter {
    @ApiProperty()
    id: number;
    @ApiProperty()
    name: string;
    @ApiProperty()
    level: string;
    @ApiProperty()
    area: number;
    @ApiProperty()
    parentId?: number;
    @ApiProperty()
    children ?: LocationModel[];
    constructor(locationModel: LocationModel) {
      this.id = locationModel.id;
      this.name = locationModel.name;
      this.level = locationModel.level;
      this.area = locationModel.area;
      this.parentId = locationModel.parentId;
      this.children = locationModel.children
    }
}