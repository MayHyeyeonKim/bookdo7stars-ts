import { useState } from 'react';

import { RootState } from '@/app/reducers';
import { Container, Box, Typography, Slider, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { GET_BOOKS_SEARCH_REQUEST } from '../../actions/constants/book'; // 액션 정의된 경로

const ResultFilters = () => {
  const dispatch = useDispatch();
  const searchData = useSelector((store: RootState) => store.book.searchData);
  const [filters, setFilters] = useState({
    dateRange: [undefined, undefined], // Represents the values in months (3M to 60M or 전체)
    priceRange: [0, 100000],
    reviewRankRange: [0, 10],
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

  const reviewRankMarks = [
    { value: 0, label: '0' },
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '5' },
    { value: 6, label: '6' },
    { value: 7, label: '7' },
    { value: 8, label: '8' },
    { value: 9, label: '9' },
    { value: 10, label: '10' },
  ];

  const handleSliderChange = (name: string) => (event: Event, value: number | number[]) => {
    const newValue = value === 60 ? [undefined, undefined] : [value];
    setFilters({
      ...filters,
      [name]: newValue,
    });
  };

  const handlePriceSliderChange = (name: string) => (event: Event, value: number | number[]) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value, // value는 배열이어야 함
    }));
  };

  const handleReviewSliderChange = (name: string) => (event: Event, value: number | number[]) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
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
      min_review_rank: filters.reviewRankRange[0],
      max_review_rank: filters.reviewRankRange[1],
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

    console.log('요청데이타ㅏㅏㅏㅏ ', requestData);

    dispatch({
      type: GET_BOOKS_SEARCH_REQUEST,
      data: requestData,
    });

    console.log('Applied Filters:', {
      dateRange: [requestData.start_date, requestData.end_date],
      priceRange: filters.priceRange,
      reviewRankRange: filters.reviewRankRange,
    });
  };

  return (
    <Container>
      <Box mb={2}>
        <Typography>출간일</Typography>
        <Slider
          value={filters.dateRange[0] === undefined ? 60 : filters.dateRange[0]}
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
      <Box mb={2}>
        <Typography>리뷰 랭크</Typography>
        <Slider
          value={filters.reviewRankRange}
          onChange={handleReviewSliderChange('reviewRankRange')}
          valueLabelDisplay="auto"
          min={0}
          max={10}
          step={1}
          marks={reviewRankMarks}
        />
      </Box>
      <Button variant="contained" color="primary" onClick={applyFilters} fullWidth>
        적용
      </Button>
    </Container>
  );
};

export default ResultFilters;
