export enum QueryTypes {
  All = 'All',
  ItemNewAll = 'ItemNewAll',
  ItemNewSpecial = 'ItemNewSpecial',
  BestSeller = 'BestSeller',
  BlogBest = 'BlogBest',
  EditorRecommended = 'EditorRecommended',
}

export const bookGroups: Record<QueryTypes, string> = {
  [QueryTypes.All]: '전체 도서',
  [QueryTypes.ItemNewAll]: '새로 나온 책',
  [QueryTypes.ItemNewSpecial]: '화제의 신간',
  [QueryTypes.BestSeller]: '베스트 셀러',
  [QueryTypes.BlogBest]: '블로그 베스트',
  [QueryTypes.EditorRecommended]: '에디터 추천',
};

export const getBooksPageURL = (query: string) => {
  const baseUrl = '/books';
  switch (query) {
    case '전체 도서': {
      return baseUrl;
    }
    case '새로 나온 책': {
      return baseUrl + '/itemNewAll';
    }
    case '화제의 신간': {
      return baseUrl + '/itemNewSpecial';
    }
    case '베스트 셀러': {
      return baseUrl + '/bestSeller';
    }
    case '블로그 베스트': {
      return baseUrl + '/blogBest';
    }
    case '에디터 추천': {
      return baseUrl + '/editor-recommended';
    }
    default:
      return baseUrl;
  }
};
