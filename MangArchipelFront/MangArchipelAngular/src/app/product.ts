
export class Product {
    id: number;
    productName: string;
    brand: string;
    price: number;
    productType: string;
    description: string;

    constructor(name?: string, brand?: string,
        price?: number, type?: string) {
        this.productName = name;
        this.brand = brand;
        this.price = price;
        this.productType = type;
    }
}

