import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from './product/product.entity';
import { CartItem } from './cart-item/cart-item.entity';
import { ShoppingCart } from './shopping-cart/shopping-cart.entity';
import { Customer } from './customer/customer.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3000,
      username: 'username',
      password: 'password',
      database: 'shop',
      entities: [Product, ShoppingCart, CartItem, Customer],
      synchronize: true
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
