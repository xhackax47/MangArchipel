import { Product } from './product';
import { User } from './user';
import { ProductOrder } from './product-order';

export class Order {
    id: number;
    dateCreated: string;
    status: string;
    user: User;
    orderProducts: ProductOrder[];


    constructor(dateCreated?: string, status?: string, user?: User) {
            this.dateCreated = dateCreated;
            this.status = status;
            this.user = user;
    }
}
