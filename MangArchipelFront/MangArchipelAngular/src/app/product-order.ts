import { Product } from './product';

export class ProductOrder {
    product: Product;
    quantity: number;
    totalPrice: number;

    constructor(product?: Product, quantity?: number) {
        this.product = product;
        this.quantity = quantity;
        if (product && quantity) {
            this.totalPrice = product.price * quantity;
        }
    }


}
