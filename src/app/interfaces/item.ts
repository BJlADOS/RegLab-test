export interface IItem {
    id: number;
    title: string;
    price: number;
    description: string;
    thumbnail: string;
    category: string;
    brand: string;
    stock: number;
    images: string[];
}

export interface IItemPage {
    products: IItem[];
    total: number;
    limit: number;
    skip: number;
}