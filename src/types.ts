export interface Coin {
    id: string;
    name: string;
    image: string;
    current_price: number;
}

export interface MarketChartApiResponse {
    prices: Array<Array<number>>;
}