import { useState } from 'react';

import { RootState } from '@/app/reducers';
import { SearchType } from '@/app/search/types/searchType';
import { Container, Box, Typography, Slider, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { GET_BOOKS_SEARCH_REQUEST } from '../../actions/constants/book'; // 액션 정의된 경로

const ResultFilters = () => {
  const dispatch = useDispatch();
  const searchData = useSelector((store: RootState) => store.book.searchData);
  const [filters, setFilters] = useState({
    dateRange: [3, 70], // Represents the values in months (3M to 60M or 전체)
    priceRange: [0, 100000],
  });

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
    setFilters({
      ...filters,
      [name]: [value],
    });
  };

  const handlePriceSliderChange = (name: string) => (event: Event, value: number | number[]) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value, // value는 배열이어야 함
    }));
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
    const startMonths = sliderValueToMonthsMap[selectedSliderValue] || 0; // 기본값 0

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

    console.log('222', startDateISO, endDateISO);
    const requestData = {
      ...searchData,
      start_price: filters.priceRange[0],
      end_price: filters.priceRange[1],
    } as any;

    if (startDateISO !== undefined) {
      requestData.start_date = startDateISO;
    }

    if (endDateISO !== undefined) {
      requestData.end_date = startDateISO;
    }

    console.log('요청데이타ㅏㅏㅏㅏ ', requestData);

    dispatch({
      type: GET_BOOKS_SEARCH_REQUEST,
      data: requestData,
    });

    console.log('Applied Filters:', {
      dateRange: [startDateISO, endDateISO],
      priceRange: filters.priceRange,
    });
  };

  return (
    <Container>
      <Box>
        <Typography variant="h6" mb={2}>
          필터링
        </Typography>
      </Box>
      <Box mb={2}>
        <Typography>출간일</Typography>
        <Slider
          value={filters.dateRange[0]}
          onChange={handleSliderChange('dateRange')}
          //   valueLabelDisplay="auto"
          min={10}
          max={60} // The maximum value corresponds to '전체'
          step={null} // Makes the slider snap to marks only
          marks={dateRangeMarks}
        />
      </Box>
      <Box mb={2}>
        <Typography>판매가</Typography>
        <Slider value={filters.priceRange} onChange={handlePriceSliderChange('priceRange')} valueLabelDisplay="auto" min={0} max={100000} />
      </Box>

      <Button variant="contained" color="primary" onClick={applyFilters} fullWidth>
        적용
      </Button>
    </Container>
  );
};

export default ResultFilters;
