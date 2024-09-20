export enum QueryTypes {
  All = 'All',
  ItemNewAll = 'ItemNewAll',
  ItemNewSpecial = 'ItemNewSpecial',
  Bestseller = 'Bestseller',
  BlogBest = 'BlogBest',
  ItemEditorChoice = 'ItemEditorChoice',
}

export const bookGroups: Record<QueryTypes, string> = {
  [QueryTypes.All]: '전체 도서',
  [QueryTypes.ItemNewAll]: '새로 나온 책',
  [QueryTypes.ItemNewSpecial]: '화제의 신간',
  [QueryTypes.Bestseller]: '베스트 셀러',
  [QueryTypes.BlogBest]: '블로그 베스트',
  [QueryTypes.ItemEditorChoice]: '에디터 추천',
};

export const getBooksPageURL = (query: string) => {
  const baseUrl = '/books';
  switch (query) {
    case '전체 도서': {
      return baseUrl;
    }
    case '새로 나온 책': {
      return baseUrl + '/ItemNewAll';
    }
    case '화제의 신간': {
      return baseUrl + '/ItemNewSpecial';
    }
    case '베스트 셀러': {
      return baseUrl + '/Bestseller';
    }
    case '블로그 베스트': {
      return baseUrl + '/BlogBest';
    }
    case '에디터 추천': {
      return baseUrl + '/ItemEditorChoice';
    }
    default:
      return baseUrl;
  }
};
