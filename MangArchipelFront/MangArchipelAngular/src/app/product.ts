
export class Product {
    id: number;
    productName: string;
    brand: string;
    price: number;
    productType: string;
    description: string;
    image: string;

    constructor(name?: string, brand?: string,
        price?: number, type?: string, description?: string,
        image?: string) {
        this.productName = name;
        this.brand = brand;
        this.price = price;
        this.productType = type;
        this.description = description;
        this.image = image;
    }
}

