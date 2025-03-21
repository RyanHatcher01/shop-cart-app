import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShoppingCart } from './shopping-cart.entity';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { CreateCartItemDto } from 'src/cart-item/createCartItem.dto';
import { Customer } from 'src/customer/customer.entity';

@Injectable()
export class ShoppingCartService {
  constructor(
    @InjectRepository(ShoppingCart)
    private readonly cartRepository: Repository<ShoppingCart>,
    private readonly httpService: HttpService,
  ) {}

  // Create a new shopping cart
  async createCart(customerId: string): Promise<ShoppingCart> {
    const cart = this.cartRepository.create({
      customer: { id: customerId } as Customer, 
      cartItems: [], 
    });
    return await this.cartRepository.save(cart); // Save and return the new cart
  }
  
  // Add a product to the cart
  async addProductToCart(cartId: string, createCartItemDto: CreateCartItemDto): Promise<any> {
    const product = await this.getProductDetails(createCartItemDto.productId);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (product.stock < createCartItemDto.quantity) {
      throw new BadRequestException('Not enough stock');
    }

    const existingCartItem = await this.getCartItemByProductId(cartId, createCartItemDto.productId);

    if (existingCartItem) {
      return this.updateCartItemQuantity(cartId, createCartItemDto.productId, existingCartItem.quantity + createCartItemDto.quantity);
    }

    return this.createCartItem(cartId, createCartItemDto);
  }

  // Remove a product from the cart
  async removeProductFromCart(cartId: string, productId: string): Promise<void> {
    const cartItem = await this.getCartItemByProductId(cartId, productId);

    if (!cartItem) {
      throw new NotFoundException('Product not found in the cart');
    }

    await this.updateProductStock(productId, cartItem.quantity); // Restore stock
    await this.removeCartItem(cartId, productId);
  }

  // Edit the quantity of a product in the cart
  async editProductQuantityInCart(cartId: string, productId: string, quantity: number): Promise<any> {
    if (quantity <= 0) {
      throw new BadRequestException('Quantity must be greater than zero');
    }

    const cartItem = await this.getCartItemByProductId(cartId, productId);

    if (!cartItem) {
      throw new NotFoundException('Product not found in the cart');
    }

    const product = await this.getProductDetails(productId);

    if (product.stock < quantity - cartItem.quantity) {
      throw new BadRequestException('Not enough stock');
    }

    return this.updateCartItemQuantity(cartId, productId, quantity);
  }

  // Delete the entire shopping cart
  async deleteCart(cartId: string): Promise<void> {
    const cart = await this.cartRepository.findOne({
      where: { id: cartId },
      relations: ['cartItems', 'cartItems.product'],
    });

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    for (const cartItem of cart.cartItems) {
      await this.updateProductStock(cartItem.product.id, cartItem.quantity); // Restore stock
    }

    await this.deleteAllCartItems(cartId); // Remove all cart items
    await this.cartRepository.remove(cart); // Delete the cart
  }

  // Helper method to fetch product details
  private async getProductDetails(productId: string) {
    const productApiUrl = `http://web:3000/products/${productId}`;
    try {
      const response = await firstValueFrom(this.httpService.get(productApiUrl));
      return response.data;
    } catch (error) {
      throw new NotFoundException('Product not found');
    }
  }

  // Helper method to update product stock
  private async updateProductStock(productId: string, quantityChange: number) {
    const updateProductApiUrl = `http://web:3000/products/${productId}`;
    try {
      await firstValueFrom(this.httpService.put(updateProductApiUrl, { quantity: quantityChange }));
    } catch (error) {
      throw new Error('Failed to update product stock');
    }
  }

  // Helper methods for cart item management
  private async createCartItem(cartId: string, createCartItemDto: CreateCartItemDto): Promise<any> {
    const cartItemApiUrl = `http://web:3000/cart-items`;
    try {
      const response = await firstValueFrom(this.httpService.post(cartItemApiUrl, {
        cartId,
        productId: createCartItemDto.productId,
        quantity: createCartItemDto.quantity,
      }));
      return response.data;
    } catch (error) {
      throw new Error('Failed to add product to cart');
    }
  }

  private async getCartItemByProductId(cartId: string, productId: string): Promise<any> {
    const cartItemApiUrl = `http://web:3000/cart-items/cart/${cartId}/product/${productId}`;
    try {
      const response = await firstValueFrom(this.httpService.get(cartItemApiUrl));
      return response.data;
    } catch (error) {
      return null; // Return null if cart item doesn't exist
    }
  }

  private async updateCartItemQuantity(cartId: string, productId: string, quantity: number): Promise<any> {
    const updateCartItemApiUrl = `http://web:3000/cart-items/cart/${cartId}/product/${productId}/quantity`;
    try {
      const response = await firstValueFrom(this.httpService.put(updateCartItemApiUrl, { quantity }));
      return response.data;
    } catch (error) {
      throw new Error('Failed to update product quantity');
    }
  }

  private async removeCartItem(cartId: string, productId: string): Promise<void> {
    const deleteCartItemApiUrl = `http://web:3000/cart-items/cart/${cartId}/product/${productId}`;
    try {
      await firstValueFrom(this.httpService.delete(deleteCartItemApiUrl));
    } catch (error) {
      throw new Error('Failed to remove product from cart');
    }
  }

  private async deleteAllCartItems(cartId: string): Promise<void> {
    const deleteAllCartItemsApiUrl = `http://web:3000/cart-items/cart/${cartId}`;
    try {
      await firstValueFrom(this.httpService.delete(deleteAllCartItemsApiUrl));
    } catch (error) {
      throw new Error('Failed to delete all cart items');
    }
  }
}
