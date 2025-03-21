import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt, IsPositive, IsDecimal, MaxLength, IsBase64 } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    description: 'Product name (required, max length 64)',
    example: 'Cool Gadget',
  })
  @IsString()
  @MaxLength(64)
  name: string;

  @ApiProperty({
    description: 'Product description (optional, max length 2048)',
    example: 'A very cool gadget that does amazing things.',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(2048)
  description?: string;

  @ApiProperty({
    description: 'Base64-encoded product image (required)',
    example: 'data:image/png;base64,...',
  })
  @IsString()
  @IsBase64()
  image: string;

  @ApiProperty({
    description: 'Product price (required, positive decimal number)',
    example: 49.99,
  })
  @IsDecimal()
  @IsPositive()
  price: number;

  @ApiProperty({
    description: 'Product stock (required, positive integer)',
    example: 100,
  })
  @IsInt()
  @IsPositive()
  stock: number;
}
