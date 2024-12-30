import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ProductCreatedEvent } from './events/create-product.event';
import { ProductDeletedEvent } from './events/delete-product.event';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_MICROSERVICE')
    private readonly productMicroservice: ClientProxy,
  ) {}

  getAllProducts() {
    return this.productMicroservice.send({ cmd: 'GET_ALL_PRODUCTS' }, {});
  }

  findProductById(id: number) {
    return this.productMicroservice.send(
      { cmd: 'FIND_BY_ID' },
      {
        id,
      },
    );
  }

  createProduct(user: { name: string; price: string }) {
    return this.productMicroservice.emit(
      { cmd: 'CREATE_PRODUCT' },
      new ProductCreatedEvent(user.name, user.price),
    );
  }

deleteProduct(id: number) {
  console.log('Sending DELETE_PRODUCT event with id:', id);
  return this.productMicroservice.emit(
    { cmd: 'DELETE_PRODUCT' },
    new ProductDeletedEvent(id),
  );
}

}
