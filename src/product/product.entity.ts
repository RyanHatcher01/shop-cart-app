import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate} from "typeorm"

@Entity()
export class Product {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    
    @Column({length: 64})
    name: string

    @Column({length:2048})
    description: string

    @Column()
    image: string

    @Column("decimal", {precision: 5, scale: 2})
    price: number

    @Column("int")
    stock: number

    @BeforeInsert()
    @BeforeUpdate()
    validate(){
    if (this.stock < 0){
        throw new Error('Stock must be positive');
    } 
    this.validateImage();
}
private validateImage() {
    const base64Pattern = /^data:image\/(jpeg|png|jpg);base64,/; //Found this online
    if (!this.image || !base64Pattern.test(this.image)) {
      throw new Error('Image must be a valid Base64 data URL.');
    }

    const base64Data = this.image.split(',')[1]; 
    
    if (base64Data.length > 1048576 * 1.33) {  
      throw new Error('Image size must be less than 1MB.');
    }
  }

}