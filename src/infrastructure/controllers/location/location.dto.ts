import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class AddLocationDto {
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    readonly name: string;
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    readonly number: string;
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsNumber()
    readonly area: number;
    @ApiProperty()
    @IsNumber()
    parentId?: number;
  }
