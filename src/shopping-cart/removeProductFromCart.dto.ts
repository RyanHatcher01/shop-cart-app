import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RemoveProductFromCartDto {
  @ApiProperty({
    description: 'ID of the product to remove from the cart',
    example: 'product123',
  })
  @IsString()
  productId: string; // ID of the product to remove from the cart
}
