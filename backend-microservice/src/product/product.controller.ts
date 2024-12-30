import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('products')
  getAllProducts() {
    return this.productService.getAllProducts();
  }

  @Get(':id')
  findProductById(@Param('id') id: string) {
    return this.productService.findProductById(+id);
  }

  @Post('product')
  createProduct(@Body() product: { name: string; price: string }) {
    return this.productService.createProduct(product);
  }

  @Delete('product/:id')
  deleteProduct(@Param('id') id: string) {
    console.log('Received id:', id);
    return this.productService.deleteProduct(+id);
  }
}
