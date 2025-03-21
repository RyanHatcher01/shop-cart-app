import { IsString } from "class-validator";

export class CreateShoppingCartDto {
  @IsString()
  customerId: string;  // The ID of the customer to associate the cart with
}