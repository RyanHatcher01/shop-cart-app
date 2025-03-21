import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn} from "typeorm"
import { CartItem } from "../cart-item/cart-item.entity";
import { Customer } from "../customer/customer.entity";

@Entity()
export class ShoppingCart {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => Customer,(customer) => customer.id)
    @JoinColumn({name: 'CustomerID'})
    customer: Customer;

    @OneToMany(()=> CartItem, (cartItem) => cartItem.product)
    cartItems: CartItem[];
}
