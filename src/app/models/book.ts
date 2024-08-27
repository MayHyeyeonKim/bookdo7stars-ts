export interface Book {
  title: string;
  author: string;
  cover: string;
  publisher: string;
  priceStandard: number;
}

export const mockBooks: Book[] = [
  {
    title: '메이의일기',
    author: 'May',
    cover: 'https://t1.gstatic.com/licensed-image?q=tbn:ANd9GcTQNFQKFyHVyta87uusjQyosrpfKpF9bmnwv51eSIKEF0FFYqh0qfLdS5XBHECxF4ot',
    publisher: 'shibasang',
    priceStandard: 100,
  },
  {
    title: '헌준쓰의일기',
    author: '헌준쓰',
    cover: 'https://www.akc.org/wp-content/uploads/2017/11/Shiba-Inu-standing-in-profile-outdoors.jpg',
    publisher: 'shibasang',
    priceStandard: 100,
  },
];
