import { IsString } from 'class-validator';

export class RemoveProductFromCartDto {
  @IsString()
  productId: string;  // ID of the product to remove from the cart
}