export interface IMoreOrdes {
    product: {
        name: string; 
        price: number;
        ProductPhoto: {url: string}[]
    },
    sellsQuantity: number;
    income: number;
}