import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Product } from './product/product.entity';
import { CartItem } from './cart-item/cart-item.entity';
import { ShoppingCart } from './shopping-cart/shopping-cart.entity';
import { Customer } from './customer/customer.entity';
import { ProductController } from './product/product.controller';
import { CartItemController } from './cart-item/cart-item.controller';
import { ShoppingCartController } from './shopping-cart/shopping-cart.controller';
import { ProductService } from './product/product.service';
import { CartItemService } from './cart-item/cart-item.service';
import { ShoppingCartService } from './shopping-cart/shopping-cart.service';
import { HttpModule } from '@nestjs/axios'; 

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'db',                 
      port: 3306,                 
      username: 'username',       
      password: 'password',       
      database: 'shop',          
      entities: [Product, CartItem, ShoppingCart, Customer], // Import entities
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Product, CartItem, ShoppingCart, Customer]),
    HttpModule, 
  ],
  controllers: [AppController, ProductController, CartItemController, ShoppingCartController],
  providers: [AppService, ProductService, CartItemService, ShoppingCartService],
})
export class AppModule {}
