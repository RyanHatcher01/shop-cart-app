import { Controller, Post, Delete, Put, Body, Param } from '@nestjs/common';
import { ShoppingCartService } from './shopping-cart.service';
import { CreateShoppingCartDto } from './createShoppingCart.dto';
import { AddProductToCartDto } from './addProductToShoppingCart.dto';
import { RemoveProductFromCartDto } from './removeProductFromCart.dto';
import { UpdateShoppingCartDto } from './updateShoppingCart.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('shopping-cart') // Groups endpoints under "shopping-cart" in Swagger
@Controller('shopping-cart') // Base route
export class ShoppingCartController {
  constructor(private readonly shoppingCartService: ShoppingCartService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new shopping cart' })
  @ApiResponse({ status: 201, description: 'Shopping cart created successfully.' })
  @ApiBody({ type: CreateShoppingCartDto })
  createCart(@Body() createShoppingCartDto: CreateShoppingCartDto) {
    return this.shoppingCartService.createCart(createShoppingCartDto.customerId);
  }

  @Post(':cartId/products')
  @ApiOperation({ summary: 'Add a product to the shopping cart' })
  @ApiParam({ name: 'cartId', description: 'ID of the shopping cart' })
  @ApiResponse({ status: 200, description: 'Product added successfully.' })
  @ApiResponse({ status: 404, description: 'Shopping cart or product not found.' })
  @ApiBody({ type: AddProductToCartDto })
  addProductToCart(@Param('cartId') cartId: string, @Body() addProductToCartDto: AddProductToCartDto) {
    return this.shoppingCartService.addProductToCart(cartId, addProductToCartDto);
  }

  @Delete(':cartId/products/:productId')
  @ApiOperation({ summary: 'Remove a product from the shopping cart' })
  @ApiParam({ name: 'cartId', description: 'ID of the shopping cart' })
  @ApiParam({ name: 'productId', description: 'ID of the product to remove' })
  @ApiResponse({ status: 200, description: 'Product removed successfully.' })
  @ApiResponse({ status: 404, description: 'Product not found in the shopping cart.' })
  removeProductFromCart(@Param('cartId') cartId: string, @Param('productId') productId: string) {
    const removeProductDto = new RemoveProductFromCartDto();
    removeProductDto.productId = productId;
    return this.shoppingCartService.removeProductFromCart(cartId, removeProductDto.productId);
  }

  @Put(':cartId/products/:productId')
  @ApiOperation({ summary: 'Update the quantity of a product in the shopping cart' })
  @ApiParam({ name: 'cartId', description: 'ID of the shopping cart' })
  @ApiParam({ name: 'productId', description: 'ID of the product to update' })
  @ApiResponse({ status: 200, description: 'Product quantity updated successfully.' })
  @ApiResponse({ status: 404, description: 'Product not found in the shopping cart.' })
  @ApiResponse({ status: 400, description: 'Invalid quantity. Validation failed.' })
  @ApiBody({ type: UpdateShoppingCartDto })
  editProductQuantity(
    @Param('cartId') cartId: string,
    @Param('productId') productId: string,
    @Body() updateShoppingCartDto: UpdateShoppingCartDto,
  ) {
    return this.shoppingCartService.editProductQuantityInCart(cartId, productId, updateShoppingCartDto.quantity);
  }

  @Delete(':cartId')
  @ApiOperation({ summary: 'Delete a shopping cart' })
  @ApiParam({ name: 'cartId', description: 'ID of the shopping cart to delete' })
  @ApiResponse({ status: 200, description: 'Shopping cart deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Shopping cart not found.' })
  deleteCart(@Param('cartId') cartId: string) {
    return this.shoppingCartService.deleteCart(cartId);
  }
}
