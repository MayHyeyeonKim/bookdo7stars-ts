export interface Book {
  id: number;
  isbn: string;
  title: string;
  author: string;
  description: string;
  cover: string;
  stockStatus: string;
  categoryId: string;
  categoryName: string;
  mileage: number;
  publisher: string;
  adult: boolean;
  fixedPrice: boolean;
  priceStandard: number;
  priceSales: number;
  customerReviewRank: number;
  queryType: string;
  deleted: boolean;
  pubDate: Date;
}
