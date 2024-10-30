import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class LocationDto {
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    readonly name: string;
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    readonly level: string;
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsNumber()
    readonly area: number;
    @ApiProperty()
    @IsNumber()
    parentId?: number;
  }
  export class  UpdateLocationDto extends LocationDto {
    @ApiProperty()
    @IsNumber()
    id?: number;
} 