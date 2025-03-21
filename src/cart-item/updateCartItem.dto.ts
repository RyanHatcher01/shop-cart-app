import { ApiProperty } from '@nestjs/swagger';

export class UpdateCartItemDto {
  @ApiProperty({ 
    description: 'New quantity of the product in the cart', 
    example: 3 
  })
  quantity: number; // new quantity of the product in the cart
}
