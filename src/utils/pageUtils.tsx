import { ICategory } from '@/app/models/category';
import { SearchType } from '@/app/search/types/searchType';
import { useTheme } from '@mui/material/styles';

export const getTitle = (resultCount: number, parsedSearchCondition?: SearchType, category?: ICategory) => {
  const theme = useTheme();

  if (parsedSearchCondition) {
    const resultString = Object.entries(parsedSearchCondition)
      .filter(([key, value]) => value !== '' && key !== 'page' && key !== 'pageSize' && key !== 'orderTerm')
      .map(([_, value]) => `${value}`)
      .join(' + ');
    return (
      <span>
        <span style={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>
          {parsedSearchCondition.searchTerm ? parsedSearchCondition.searchTerm : resultString}
        </span>{' '}
        검색 결과 총 <span style={{ fontWeight: 'bold' }}>{resultCount}</span>건
      </span>
    );
  }
  if (category) {
    return (
      <span style={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>
        {category.name} ({resultCount})
      </span>
    );
  }
};
