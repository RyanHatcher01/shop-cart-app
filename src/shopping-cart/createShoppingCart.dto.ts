import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateShoppingCartDto {
  @ApiProperty({
    description: 'The ID of the customer to associate the cart with',
    example: 'customer123',
  })
  @IsString()
  customerId: string; // The ID of the customer to associate the cart with
}
