import { IsString, IsOptional, IsInt, IsPositive, IsDecimal, MaxLength, IsBase64 } from 'class-validator';

export class CreateProductDto {
    // Product name is required and must be a string with a max length of 64 characters.
    @IsString()
    @MaxLength(64)
    name: string;

    // Product description isoptional. Must be a string with a max length of 2048 characters.
    @IsOptional()
    @IsString()
    @MaxLength(2048)
    description?: string;

    // Product image is required and must be a valid base64 string.
    @IsString()
    @IsBase64()
    image: string;

    // Product price is required and must be a positive decimal number.
    @IsDecimal()
    @IsPositive()
    price: number;

    // Product stock is required and must be a positive integer.
    @IsInt()
    @IsPositive()
    stock: number;
}