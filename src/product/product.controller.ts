import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/createProduct.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('products') // Group endpoints under "products" in Swagger
@Controller('products') // Defines the route as /products
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve all products' })
  @ApiResponse({ status: 200, description: 'List of all products returned successfully.' })
  async findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a product by ID' })
  @ApiParam({ name: 'id', description: 'ID of the product to retrieve' })
  @ApiResponse({ status: 200, description: 'Product retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  async findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({ status: 201, description: 'Product created successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid data. Product creation failed.' })
  @ApiBody({ type: CreateProductDto })
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing product' })
  @ApiParam({ name: 'id', description: 'ID of the product to update' })
  @ApiResponse({ status: 200, description: 'Product updated successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid data. Update failed.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  @ApiBody({ type: UpdateProductDto })
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product by ID' })
  @ApiParam({ name: 'id', description: 'ID of the product to delete' })
  @ApiResponse({ status: 200, description: 'Product deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  async delete(@Param('id') id: string) {
    return this.productService.delete(id);
  }
}
