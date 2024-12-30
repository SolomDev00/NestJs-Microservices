import { Injectable, NotFoundException } from '@nestjs/common';
import { IProduct } from './app.interface';

@Injectable()
export class AppService {
  private products: IProduct[] = [];
  private currentId = 1;

  getAllProducts() {
    if (this.products.length < 0) {
      throw new NotFoundException('No products available at the moment.');
    }
    return {
      message: 'Products retrieved successfully.',
      data: this.products,
    };
  }

  createProduct(product: Omit<IProduct, 'id'>) {
    const newProduct: IProduct = {
      id: this.currentId++,
      ...product,
    };
    this.products.push(newProduct);
    return {
      message: 'Product created successfully.',
      product: newProduct,
    };
  }

  findProductById(id: number) {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      throw new NotFoundException('Product not found.');
    }
    return {
      message: 'Product retrieved successfully.',
      product,
    };
  }

  updateProduct(id: number, updatedData: Partial<Omit<IProduct, 'id'>>) {
    const productIndex = this.products.findIndex((p) => p.id === id);
    if (productIndex === -1) {
      throw new NotFoundException('Product not found.');
    }

    this.products[productIndex] = {
      ...this.products[productIndex],
      ...updatedData,
    };
    return {
      message: 'Product updated successfully.',
      product: this.products[productIndex],
    };
  }

deleteProduct(id: number) {
  console.log('Products before deletion:', this.products);
  const productIndex = this.products.findIndex((p) => p.id === id);

  if (productIndex === -1) {
    console.log('Product not found during deletion attempt');
    throw new NotFoundException('Product not found.');
  }

  const deletedProduct = this.products.splice(productIndex, 1);
  console.log('Deleted product:', deletedProduct);
  console.log('Products after deletion:', this.products);

  return {
    message: 'Product deleted successfully.',
    product: deletedProduct[0],
  };
}

}
