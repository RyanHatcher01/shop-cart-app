import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from "typeorm"
import { Product } from "../product/product.entity";
import { Customer } from "../customer/customer.entity";

@Entity()
export class CartItem{
    @PrimaryGeneratedColumn("uuid")
    id: string
    
    @ManyToOne(() => Customer, (customer) => customer.id)
    @JoinColumn({ name: 'customerId' })
    customer: Customer; 

    @ManyToOne(() => Product, (product) => product.id)
    @JoinColumn({ name: 'productId' })
    product: Product;

    @Column()
    quantity: number; 
}