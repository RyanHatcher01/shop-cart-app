import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive } from 'class-validator';

export class UpdateShoppingCartDto {
  @ApiProperty({
    description: 'Updated quantity of the product in the shopping cart (must be a positive integer)',
    example: 5,
  })
  @IsInt()
  @IsPositive()
  quantity: number; // Updated quantity of the product in the cart
}
