// src/product/product.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Put } from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/createProduct.dto";
import { UpdateProductDto } from "./dto/updateProduct.dto";

@Controller("products") // Defines the route as /products
export class ProductController {
  constructor(private readonly productService: ProductService) {}

// HTTP GET request at /products  
  @Get()
  async findAll() {
    return this.productService.findAll();
  }

// HTTP GET request at /products/:id  
  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.productService.findOne(id);
  }

// HTTP POST request at /products  
  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

// HTTP PUT request at /products/:id  
  @Put(":id")
  async update(
    @Param("id") id: string, 
    @Body() updateProductDto: UpdateProductDto
  ) {
    return this.productService.update(id, updateProductDto);
  }

// HTTP DELETE request at /products/:id
  @Delete(":id")
  async delete(@Param("id") id: string) {
    return this.productService.delete(id);
  }
}
