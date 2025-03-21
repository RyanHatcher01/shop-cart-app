import { ApiProperty } from '@nestjs/swagger';

export class CreateCartItemDto {
  @ApiProperty({ description: 'ID of the product to be added to the cart' })
  productId: string; // product that is being added to the cart

  @ApiProperty({ description: 'Quantity of the product to be added to the cart', example: 1 })
  quantity: number; // quantity of the product in the cart
}
