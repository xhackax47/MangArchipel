
export class Product {
    id: number;
    productName: string;
    brand: string;
    price: number;
    productType: string;
    description: string;
    picture: string;
    visible: boolean;
    stock: number;

    constructor(productName?: string, brand?: string,
        price?: number, productType?: string, description?: string,
        picture?: string, stock?: number) {
        this.productName = productName;
        this.brand = brand;
        this.price = price;
        this.productType = productType;
        this.description = description;
        this.picture = picture;
        this.stock = stock;
    }
}

