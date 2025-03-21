import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, IsPositive, IsInt, IsBase64, MaxLength } from 'class-validator';

export class UpdateProductDto {
  @ApiProperty({
    description: 'Updated product name (optional, max length 64)',
    example: 'New Cool Gadget',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(64)
  name?: string;

  @ApiProperty({
    description: 'Updated product description (optional, max length 2048)',
    example: 'An improved version of our cool gadget.',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(2048)
  description?: string;

  @ApiProperty({
    description: 'Updated product image in Base64 (optional)',
    example: 'data:image/png;base64,...',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsBase64()
  image?: string;

  @ApiProperty({
    description: 'Updated product price (optional, positive number)',
    example: 59.99,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  price?: number;

  @ApiProperty({
    description: 'Updated product stock (optional, positive integer)',
    example: 50,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @IsPositive()
  stock?: number;
}
