import { Entity,PrimaryGeneratedColumn} from "typeorm"

@Entity()
export class Customer {
    @PrimaryGeneratedColumn('uuid')
    id: string
}