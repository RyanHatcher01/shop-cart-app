import { Controller, Post, Get, Param, Body, Put, Delete } from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { CreateCartItemDto } from './createCartItem.dto';
import { UpdateCartItemDto } from './updateCartItem.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('cart-items') // Group endpoints in Swagger
@Controller('cart-items')  // Route for handling cart item CRUD
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new CartItem' })
  @ApiResponse({ status: 201, description: 'CartItem created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request. Validation failed.' })
  @ApiBody({ type: CreateCartItemDto })
  async create(@Body() createCartItemDto: CreateCartItemDto) {
    return this.cartItemService.create(createCartItemDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all CartItems' })
  @ApiResponse({ status: 200, description: 'List of all CartItems.' })
  async findAll() {
    return this.cartItemService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a CartItem by ID' })
  @ApiParam({ name: 'id', description: 'ID of the CartItem to retrieve' })
  @ApiResponse({ status: 200, description: 'CartItem retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'CartItem not found.' })
  async findOne(@Param('id') id: string) {
    return this.cartItemService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a CartItem quantity' })
  @ApiParam({ name: 'id', description: 'ID of the CartItem to update' })
  @ApiBody({ type: UpdateCartItemDto })
  @ApiResponse({ status: 200, description: 'CartItem updated successfully.' })
  @ApiResponse({ status: 404, description: 'CartItem not found.' })
  @ApiResponse({ status: 400, description: 'Bad request. Validation failed.' })
  async update(@Param('id') id: string, @Body() updateCartItemDto: UpdateCartItemDto) {
    return this.cartItemService.update(id, updateCartItemDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a CartItem by ID' })
  @ApiParam({ name: 'id', description: 'ID of the CartItem to delete' })
  @ApiResponse({ status: 200, description: 'CartItem deleted successfully.' })
  @ApiResponse({ status: 404, description: 'CartItem not found.' })
  async delete(@Param('id') id: string) {
    return this.cartItemService.delete(id);
  }
}
