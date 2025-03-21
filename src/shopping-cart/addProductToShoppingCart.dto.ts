import { IsString, IsInt, IsPositive } from 'class-validator';

export class AddProductToCartDto {
  @IsString()
  productId: string;  // ID of the product to add to the cart

  @IsInt()
  @IsPositive()
  quantity: number;  // Quantity of the product to add
}
