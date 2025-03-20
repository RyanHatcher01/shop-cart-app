import { IsOptional, IsString, IsNumber, IsPositive, IsInt, IsBase64, MaxLength } from 'class-validator';

export class UpdateProductDto {

  //Very similar to createProductDto, but all fields are now optional as we may be updating a single field.
  @IsOptional()
  @IsString()
  @MaxLength(64)
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2048)
  description?: string;

  @IsOptional()
  @IsString()
  @IsBase64()
  image?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  price?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  stock?: number;
}