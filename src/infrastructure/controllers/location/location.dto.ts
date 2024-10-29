import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class AddLocationDto {
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    readonly number: string;
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    readonly name: string;
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    readonly area: number;
  }