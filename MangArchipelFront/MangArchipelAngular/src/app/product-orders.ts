import { ProductOrder } from './product-order';
import { isNull } from '@angular/compiler/src/output/output_ast';
import { isNullOrUndefined } from 'util';

export class ProductOrders {
    productOrders: ProductOrder[];

    constructor(productOrders?: ProductOrder[]) {
        if (isNullOrUndefined(productOrders)) {
            this.productOrders = [];
        } else {
            this.productOrders = productOrders;
        }
    }
}
