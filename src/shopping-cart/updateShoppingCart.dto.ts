import { IsInt, IsPositive } from "class-validator";

export class UpdateShoppingCartDto {
  @IsInt()
  @IsPositive()
  quantity: number;  // Updated quantity of the product in the cart
}