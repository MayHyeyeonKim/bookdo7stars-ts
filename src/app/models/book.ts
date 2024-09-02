export interface Book {
  id: number;
  isbn: string;
  title: string;
  author: string;
  description: string;
  cover: string;
  stockStatus: string;
  categoryId: string;
  mileage: number;
  publisher: string;
  adult: boolean;
  fixedPrice: boolean;
  priceStandard: number;
  priceSales: number;
  customerReviewRank: number;
  queryType: string;
  deleted: boolean;
}

export const mockBooks: Book[] = [
  {
    id: 1,
    isbn: '1234567890',
    title: '우런니의 운동일지',
    author: '영현',
    description: '운동 일지와 경험을 담은 책입니다.',
    cover: 'https://upload.wikimedia.org/wikipedia/commons/2/22/Pride_of_Pets_Dog_Show%2C_2011_%286271388774%29.jpg',
    stockStatus: 'In Stock',
    categoryId: '001',
    mileage: 100,
    publisher: '영현출판사',
    adult: false,
    fixedPrice: true,
    priceStandard: 10000,
    priceSales: 9000,
    customerReviewRank: 4.5,
    queryType: 'normal',
    deleted: false,
  },
  {
    id: 2,
    isbn: '2345678901',
    title: '철님쓰의 레시피',
    author: '철',
    description: '다양한 요리법을 소개하는 레시피 책입니다.',
    cover: 'https://image-notepet.akamaized.net/seimage/20160907/1.jpg',
    stockStatus: 'Out of Stock',
    categoryId: '002',
    mileage: 150,
    publisher: '철출판사',
    adult: false,
    fixedPrice: false,
    priceStandard: 20000,
    priceSales: 18000,
    customerReviewRank: 4.8,
    queryType: 'normal',
    deleted: false,
  },
  {
    id: 3,
    isbn: '3456789012',
    title: '메이의 시애틀은 대한민국이다',
    author: '시바상',
    description: '시애틀의 매력을 담은 에세이.',
    cover: 'https://t1.gstatic.com/licensed-image?q=tbn:ANd9GcTQNFQKFyHVyta87uusjQyosrpfKpF9bmnwv51eSIKEF0FFYqh0qfLdS5XBHECxF4ot',
    stockStatus: 'In Stock',
    categoryId: '003',
    mileage: 50,
    publisher: '시바상출판사',
    adult: false,
    fixedPrice: true,
    priceStandard: 300,
    priceSales: 250,
    customerReviewRank: 4.1,
    queryType: 'normal',
    deleted: false,
  },
  {
    id: 4,
    isbn: '4567890123',
    title: '헌준쓰의 독일 운전면허 성공기',
    author: '헌준',
    description: '독일에서 운전면허를 따는 과정과 경험을 담은 책입니다.',
    cover: 'https://www.akc.org/wp-content/uploads/2017/11/Shiba-Inu-standing-in-profile-outdoors.jpg',
    stockStatus: 'In Stock',
    categoryId: '004',
    mileage: 70,
    publisher: '헌준출판사',
    adult: false,
    fixedPrice: false,
    priceStandard: 400,
    priceSales: 350,
    customerReviewRank: 4.7,
    queryType: 'normal',
    deleted: false,
  },
];
