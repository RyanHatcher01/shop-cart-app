import { Injectable } from "@nestjs/common";
import { Product } from "./product.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateProductDto } from "./dto/createProduct.dto";
import { UpdateProductDto } from "./dto/updateProduct.dto";

@Injectable()
export class ProductService{
    // Constructor to inject the product repository for accessing the database.
    constructor(@InjectRepository(Product)private productRepo:Repository<Product>){}
    
    // Find a single product by ID.
    async findOne(id: string): Promise<Product> {
        // Query the database to find a product with the given ID.
        const product = await this.productRepo.findOne({where: {id}});
        //If there is no product with that ID, we throw an error.
        if (!product){
            throw new Error("No product found");
        }
        //Else, we return the product
        return product
    }
    //Find all of the products in the database,
    async findAll(): Promise<Product[]>{
        return await this.productRepo.find();
    }
    // Create a new product in the database.
    async create(dto: CreateProductDto){
        //save the product
       return await this.productRepo.save(dto);
    }
    async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
        // Find the existing product by ID
        const product = await this.productRepo.findOne({where: {id}});
    
        // Check if the product exists
        if (!product) {
          throw new Error(`Product with ID ${id} not found`);
        }
    
        // Update the fields in the product
        Object.assign(product, updateProductDto);
    
        // Save the updated product
        return await this.productRepo.save(product);
    }
    async delete(id: string): Promise<void> {
        // Find the product by ID
        const product = await this.productRepo.findOne({where: {id}});
    
        // Check if it exists
        if (!product) {
          throw new Error(`Product with ID ${id} not found`);
        }
    
        // Delete the product from the database if it does exist.
        await this.productRepo.delete(id);
    }
}