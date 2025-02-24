import { RootState } from '@/app/reducers';
import { AppDispatch } from '@/app/store/store';
import { Container, Box, Typography, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import FilterSlider from './FilterSlider';
import { GET_BOOKS_SEARCH_REQUEST, SET_FILTERS } from '../../actions/constants/book'; // 액션 정의된 경로

const ResultFilters = () => {
  const dispatch = useDispatch<AppDispatch>();
  const searchData = useSelector((store: RootState) => store.book.searchData);
  const filters = useSelector((store: RootState) => store.book.filters);

  // Marks for the date range slider
  const dateRangeMarks = [
    { value: 10, label: '3M' },
    { value: 20, label: '12M' },
    { value: 30, label: '24M' },
    { value: 40, label: '36M' },
    { value: 50, label: '60M' },
    { value: 60, label: '전체' },
  ];

  const handleSliderChange = (name: string) => (event: Event, value: number | number[]) => {
    const newFilters = {
      ...filters,
      [name]: value,
    };

    dispatch({
      type: SET_FILTERS,
      data: newFilters,
    });
  };

  const applyFilters = () => {
    const sliderValueToMonthsMap: Record<number, number> = {
      10: 3, // 10 = 3M
      20: 12, // 20 = 12M
      30: 24, // 30 = 24M
      40: 36, // 40 = 36M
      50: 60, // 50 = 60M
      60: 70, // 60 = 전체
    };

    const selectedSliderValue = filters.dateRange[0]; // 슬라이더의 첫 번째 값
    const startMonths = selectedSliderValue ? sliderValueToMonthsMap[selectedSliderValue] : 70;

    const today = new Date();

    // 시작 날짜 계산
    let startDateISO;
    let endDateISO;
    if (startMonths !== 70) {
      const startDate = new Date(today);
      startDate.setMonth(today.getMonth() - startMonths);

      // 날짜 유효성 검증 및 조정
      if (startDate.getDate() !== today.getDate()) {
        startDate.setDate(0); // 이전 달의 마지막 날로 조정
      }

      startDateISO = startDate.toISOString().split('T')[0];
      endDateISO = today.toISOString().split('T')[0];
    }

    const requestData = {
      ...searchData,
      start_price: filters.priceRange[0],
      end_price: filters.priceRange[1],
      start_rate: filters.rateRange[0],
      end_rate: filters.rateRange[1],
    } as any;

    if (startDateISO !== undefined) {
      requestData.start_date = startDateISO;
    } else {
      delete requestData.start_date;
    }

    if (endDateISO !== undefined) {
      requestData.end_date = endDateISO;
    } else {
      delete requestData.end_date;
    }

    dispatch({
      type: GET_BOOKS_SEARCH_REQUEST,
      data: requestData,
    });
  };

  return (
    <Container>
      <Box>
        <Typography variant="h6" mb={2}>
          필터링
        </Typography>
      </Box>
      <FilterSlider
        label="출간일"
        value={filters.dateRange[0] === undefined ? 60 : filters.dateRange[0]}
        onChange={handleSliderChange('dateRange')}
        min={10}
        max={60}
        step={null}
        marks={dateRangeMarks}
      />
      <FilterSlider label="판매가" value={filters.priceRange} onChange={handleSliderChange('priceRange')} min={0} max={100000} />
      <FilterSlider label="별점" value={filters.rateRange} onChange={handleSliderChange('rateRange')} min={0} max={10} />

      <Button variant="contained" color="primary" onClick={applyFilters} fullWidth>
        적용
      </Button>
    </Container>
  );
};

export default ResultFilters;
