import { Controller, Post, Get, Param, Body, Put, Delete } from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { CreateCartItemDto } from './createCartItem.dto';
import { UpdateCartItemDto } from './updateCartItem.dto';

@Controller('cart-items')  // Route for handling cart item CRUD
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}

  // Create a new CartItem
  @Post()
  async create(@Body() createCartItemDto: CreateCartItemDto) {
    return this.cartItemService.create(createCartItemDto);
  }

  // Get all CartItems
  @Get()
  async findAll() {
    return this.cartItemService.findAll();
  }

  // Get a single CartItem by ID
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.cartItemService.findOne(id);
  }

  // Update a CartItem quantity
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCartItemDto: UpdateCartItemDto) {
    return this.cartItemService.update(id, updateCartItemDto);
  }

  // Delete a CartItem by ID
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.cartItemService.delete(id);
  }
}