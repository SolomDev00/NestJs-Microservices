import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { IProduct } from './app.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Message Pattern ( Res - Req )
  @MessagePattern({ cmd: 'GET_ALL_PRODUCTS' })
  getAllProduct() {
    return this.appService.getAllProducts();
  }

  // Message Pattern ( Res - Req )
  @MessagePattern({ cmd: 'FIND_BY_ID' })
  findProductById(id: number) {
    return this.appService.findProductById(id);
  }

  // Event Pattern ( Event - Driven )
  @EventPattern({ cmd: 'CREATE_PRODUCT' })
  createProduct(product: IProduct) {
    return this.appService.createProduct(product);
  }

  // Event Pattern ( Event - Driven )
  @EventPattern({ cmd: 'UPDATE_PRODUCT' })
  updateProduct(id: number, product: { name: string; price: number }) {
    return this.appService.updateProduct(id, product);
  }

  // Event Pattern ( Event - Driven )
  @EventPattern({ cmd: 'DELETE_PRODUCT' })
  deleteProduct(id: number) {
    return this.appService.deleteProduct(id);
  }
}
