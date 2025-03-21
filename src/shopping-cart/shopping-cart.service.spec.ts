import { Test, TestingModule } from '@nestjs/testing';
import { ShoppingCartService } from './shopping-cart.service';
import { HttpService } from '@nestjs/axios';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { of } from 'rxjs';

const mockRepository = {
  create: jest.fn(),
  save: jest.fn(),
  findOne: jest.fn(),
  remove: jest.fn(),
};

const mockHttpService = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
};

describe('ShoppingCartService', () => {
  let service: ShoppingCartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShoppingCartService,
        { provide: 'ShoppingCartRepository', useValue: mockRepository },
        { provide: HttpService, useValue: mockHttpService },
      ],
    }).compile();

    service = module.get<ShoppingCartService>(ShoppingCartService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createCart', () => {
    it('should create and save a new shopping cart', async () => {
      const mockCart = { id: 'cart1', customer: { id: 'customer1' }, cartItems: [] };
      mockRepository.create.mockReturnValue(mockCart);
      mockRepository.save.mockResolvedValue(mockCart);

      const result = await service.createCart('customer1');

      expect(mockRepository.create).toHaveBeenCalledWith({
        customer: { id: 'customer1' },
        cartItems: [],
      });
      expect(mockRepository.save).toHaveBeenCalledWith(mockCart);
      expect(result).toEqual(mockCart);
    });
  });

  describe('addProductToCart', () => {
    it('should add a product to the cart if it does not exist', async () => {
      const mockProduct = { id: 'product1', stock: 10 };
      const mockCartItem = { id: 'cartItem1', productId: 'product1', quantity: 2 };

      mockHttpService.get.mockReturnValue(of({ data: mockProduct }));
      mockHttpService.post.mockReturnValue(of({ data: mockCartItem }));
      jest.spyOn(service as any, 'getCartItemByProductId').mockResolvedValue(null);

      const result = await service.addProductToCart('cart1', { productId: 'product1', quantity: 2 });

      expect(mockHttpService.get).toHaveBeenCalledWith('http://web:3000/products/product1');
      expect(mockHttpService.post).toHaveBeenCalledWith('http://web:3000/cart-items', {
        cartId: 'cart1',
        productId: 'product1',
        quantity: 2,
      });
      expect(result).toEqual(mockCartItem);
    });

    it('should throw NotFoundException if the product does not exist', async () => {
      mockHttpService.get.mockReturnValue(of({}));

      jest.spyOn(service as any, 'getCartItemByProductId').mockResolvedValue(null);

      await expect(
        service.addProductToCart('cart1', { productId: 'product1', quantity: 2 }),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if stock is insufficient', async () => {
      const mockProduct = { id: 'product1', stock: 1 };

      mockHttpService.get.mockReturnValue(of({ data: mockProduct }));
      jest.spyOn(service as any, 'getCartItemByProductId').mockResolvedValue(null);

      await expect(
        service.addProductToCart('cart1', { productId: 'product1', quantity: 5 }),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('removeProductFromCart', () => {
    it('should remove a product from the cart and restore stock', async () => {
      const mockCartItem = { id: 'cartItem1', productId: 'product1', quantity: 2 };

      jest.spyOn(service as any, 'getCartItemByProductId').mockResolvedValue(mockCartItem);
      mockHttpService.put.mockReturnValue(of({}));
      mockHttpService.delete.mockReturnValue(of({}));

      await service.removeProductFromCart('cart1', 'product1');

      expect(mockHttpService.put).toHaveBeenCalledWith('http://web:3000/products/product1', { quantity: 2 });
      expect(mockHttpService.delete).toHaveBeenCalledWith('http://web:3000/cart-items/cart/cart1/product/product1');
    });

    it('should throw NotFoundException if the product is not in the cart', async () => {
      jest.spyOn(service as any, 'getCartItemByProductId').mockResolvedValue(null);

      await expect(service.removeProductFromCart('cart1', 'product1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('editProductQuantityInCart', () => {
    it('should update the quantity of a product in the cart', async () => {
      const mockCartItem = { id: 'cartItem1', productId: 'product1', quantity: 2 };
      const mockProduct = { id: 'product1', stock: 10 };

      jest.spyOn(service as any, 'getCartItemByProductId').mockResolvedValue(mockCartItem);
      mockHttpService.get.mockReturnValue(of({ data: mockProduct }));
      mockHttpService.put.mockReturnValue(of({ data: { id: 'cartItem1', quantity: 5 } }));

      const result = await service.editProductQuantityInCart('cart1', 'product1', 5);

      expect(mockHttpService.put).toHaveBeenCalledWith('http://web:3000/cart-items/cart/cart1/product/product1/quantity', {
        quantity: 5,
      });
      expect(result).toEqual({ id: 'cartItem1', quantity: 5 });
    });

    it('should throw BadRequestException if the new quantity exceeds stock', async () => {
      const mockCartItem = { id: 'cartItem1', productId: 'product1', quantity: 2 };
      const mockProduct = { id: 'product1', stock: 3 };

      jest.spyOn(service as any, 'getCartItemByProductId').mockResolvedValue(mockCartItem);
      mockHttpService.get.mockReturnValue(of({ data: mockProduct }));

      await expect(service.editProductQuantityInCart('cart1', 'product1', 6)).rejects.toThrow(BadRequestException);
    });
  });

  describe('deleteCart', () => {
    it('should delete the cart and restore product stock', async () => {
      const mockCart = {
        id: 'cart1',
        cartItems: [
          { product: { id: 'product1' }, quantity: 2 },
          { product: { id: 'product2' }, quantity: 1 },
        ],
      };

      mockRepository.findOne.mockResolvedValue(mockCart);
      mockHttpService.put.mockReturnValue(of({}));
      mockHttpService.delete.mockReturnValue(of({}));

      await service.deleteCart('cart1');

      expect(mockHttpService.put).toHaveBeenCalledWith('http://web:3000/products/product1', { quantity: 2 });
      expect(mockHttpService.put).toHaveBeenCalledWith('http://web:3000/products/product2', { quantity: 1 });
      expect(mockRepository.remove).toHaveBeenCalledWith(mockCart);
    });

    it('should throw NotFoundException if the cart does not exist', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.deleteCart('cart1')).rejects.toThrow(NotFoundException);
    });
  });
});
