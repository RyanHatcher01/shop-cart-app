import { Controller, Post, Delete, Put, Body, Param } from '@nestjs/common';
import { ShoppingCartService } from './shopping-cart.service';
import { CreateShoppingCartDto } from './createShoppingCart.dto';
import { AddProductToCartDto } from './addProductToShoppingCart.dto';
import { RemoveProductFromCartDto } from './removeProductFromCart.dto';
import { UpdateShoppingCartDto } from './updateShoppingCart.dto';

@Controller('shopping-cart') // Base route
export class ShoppingCartController {
  constructor(private readonly shoppingCartService: ShoppingCartService) {}

  @Post()
  createCart(@Body() createShoppingCartDto: CreateShoppingCartDto) {
    return this.shoppingCartService.createCart(createShoppingCartDto.customerId);
  }

  @Post(':cartId/products')
  addProductToCart(@Param('cartId') cartId: string, @Body() addProductToCartDto: AddProductToCartDto) {
    return this.shoppingCartService.addProductToCart(cartId, addProductToCartDto);
  }

  @Delete(':cartId/products/:productId')
  removeProductFromCart(@Param('cartId') cartId: string, @Param('productId') productId: string) {
    const removeProductDto = new RemoveProductFromCartDto();
    removeProductDto.productId = productId;
    return this.shoppingCartService.removeProductFromCart(cartId, removeProductDto.productId);
  }

  @Put(':cartId/products/:productId')
  editProductQuantity(
    @Param('cartId') cartId: string,
    @Param('productId') productId: string,
    @Body() updateShoppingCartDto: UpdateShoppingCartDto,
  ) {
    return this.shoppingCartService.editProductQuantityInCart(cartId, productId, updateShoppingCartDto.quantity);
  }

  @Delete(':cartId')
  deleteCart(@Param('cartId') cartId: string) {
    return this.shoppingCartService.deleteCart(cartId);
  }
}
