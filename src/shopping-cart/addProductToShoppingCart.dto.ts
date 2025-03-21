import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsPositive } from 'class-validator';

export class AddProductToCartDto {
  @ApiProperty({
    description: 'ID of the product to add to the cart',
    example: 'product123',
  })
  @IsString()
  productId: string;  // ID of the product to add to the cart

  @ApiProperty({
    description: 'Quantity of the product to add to the cart (must be positive)',
    example: 2,
  })
  @IsInt()
  @IsPositive()
  quantity: number;  // Quantity of the product to add
}
