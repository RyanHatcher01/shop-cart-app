import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItem } from './cart-item.entity';
import { CreateCartItemDto } from './createCartItem.dto';
import { UpdateCartItemDto } from './updateCartItem.dto';
@Injectable()
export class CartItemService {
  constructor(
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
  ) {}

  // Create a new CartItem
  async create(createCartItemDto: CreateCartItemDto): Promise<CartItem> {
    const cartItem = this.cartItemRepository.create(createCartItemDto);
    return await this.cartItemRepository.save(cartItem);
  }

    //Find all of the cartItems
  async findAll(): Promise<CartItem[]> {
    return await this.cartItemRepository.find();
  }

  // Get a CartItem by ID
  async findOne(id: string): Promise<CartItem> {
    const cartItem =  await this.cartItemRepository.findOne({where: {id}});
    if (!cartItem){
        throw new Error("No product found");
    }
    //Else, we return the cartItem
    return cartItem
  }

  // Update CartItem quantity
  async update(id: string, updateCartItemDto: UpdateCartItemDto): Promise<CartItem> {
    await this.cartItemRepository.update(id, updateCartItemDto);
    return this.findOne(id);  // Return the updated cart item
  }

  // Delete a CartItem
  async delete(id: string): Promise<void> {
    await this.cartItemRepository.delete(id);
  }
}
