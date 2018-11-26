import { ProductOrder } from './product-order';

export class ProductOrders {
    productOrders: ProductOrder[] = [];

    constructor(productOrders?: ProductOrder[]) {
        this.productOrders = productOrders;
    }
}
