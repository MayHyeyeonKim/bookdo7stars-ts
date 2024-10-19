'use client';
import React, { useState, ChangeEvent, useEffect } from 'react';

import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  MenuItem,
  Select,
  Divider,
  SelectChangeEvent,
  Grid,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { format, subMonths } from 'date-fns';
import { useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

import { SearchType } from './types/searchType';
import { AppDispatch } from '../../store/store';

const SearchPage = () => {
  const [dateRange, setDateRange] = useState('all');
  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('');
  const [startMonth, setStartMonth] = useState('');
  const [endMonth, setEndMonth] = useState('');
  const months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    publisher: '',
    sortOrder: 'sales',
    startDate: '',
    endDate: '',
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (e: ChangeEvent<HTMLInputElement> | SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChangeDateRange = (event: ChangeEvent<HTMLInputElement> | SelectChangeEvent) => {
    const targetName = event.target.name;
    switch (targetName) {
      case 'startYear': {
        setStartYear(event.target.value);
        break;
      }
      case 'endYear': {
        setEndYear(event.target.value);
        break;
      }
      case 'startMonth': {
        setStartMonth(event.target.value);
        break;
      }
      case 'endMonth': {
        setEndMonth(event.target.value);
        break;
      }
    }
  };

  const handleDateRange = (e: React.MouseEvent<HTMLElement>, newValue: string) => {
    setDateRange(newValue);
    findStartDate(newValue);
    setStartMonth('');
    setStartYear('');
    setEndMonth('');
    setEndYear('');
  };

  const findStartDate = (dateRange: string) => {
    const currentDate = new Date();
    let start_date: string | undefined;
    switch (dateRange) {
      case 'all':
        break;
      case '3':
        start_date = format(subMonths(currentDate, 3), 'yyyy-MM-dd');
        break;
      case '6':
        start_date = format(subMonths(currentDate, 6), 'yyyy-MM-dd');
        break;
      case '9':
        start_date = format(subMonths(currentDate, 9), 'yyyy-MM-dd');
        break;
      case '24':
        start_date = format(subMonths(currentDate, 24), 'yyyy-MM-dd');
        break;
      default:
        break;
    }
    return start_date;
  };

  const start_date = findStartDate(dateRange);

  const getCustomDateInterval = (startYear: string, startMonth: string, endYear: string, endMonth: string): { start: string; end: string } | undefined => {
    const customStartDate = format(new Date(parseInt(startYear), parseInt(startMonth) - 1, 1), 'yyyy-MM-dd');
    const customEndDate = format(new Date(parseInt(endYear), parseInt(endMonth) - 1, 1), 'yyyy-MM-dd');
    return { start: customStartDate, end: customEndDate };
  };

  let customDate: { start: string; end: string } | undefined;
  if (dateRange === 'custom') {
    if (startYear && startMonth && endYear && endMonth) {
      customDate = getCustomDateInterval(startYear, startMonth, endYear, endMonth);
    } else {
      customDate = undefined;
    }
  }

  useEffect(() => {
    const currentEndDate = format(new Date(), 'yyyy-MM-dd');
    if (start_date && !customDate) {
      setFormData((prevState) => ({
        ...prevState,
        startDate: start_date,
        endDate: currentEndDate,
      }));
    }
    if (customDate) {
      if (formData.startDate != customDate.start || formData.endDate != customDate.end) {
        setFormData((prevState: any) => ({
          ...prevState,
          startDate: customDate.start,
          endDate: customDate.end,
        }));
      }
    }
  }, [start_date, customDate, formData.startDate, formData.endDate]);

  const handleSearch = () => {
    console.log('formDataaaa: ', formData);
    setStartMonth('');
    setStartYear('');
    setEndMonth('');
    setEndYear('');
    setFormData({
      title: '',
      author: '',
      publisher: '',
      sortOrder: '',
      startDate: '',
      endDate: '',
    });
  };

  console.log('formData 이렇게 생겼다! ', formData);

  return (
    <div>
      <Box sx={{ mt: 5, mb: 5 }}>
        <Container>
          <Paper elevation={0} sx={{ p: 1 }}>
            <Box
              sx={{
                backgroundColor: (theme) => theme.palette.third.main,
                display: 'flex',
                alignItems: 'center',
                justifyContent: isMobile ? 'center' : 'flex-start',
                borderRadius: '5px',
              }}>
              <ManageSearchIcon sx={{ fontSize: 40, ml: isMobile ? 0 : 2, mr: isMobile ? 0 : 1 }} />
              {!isMobile && (
                <Typography variant="h5" sx={{ mt: 1.5, mb: 1.5, p: 0, minWidth: '50px', whiteSpace: 'nowrap' }}>
                  상세검색
                </Typography>
              )}
            </Box>

            <Box mt={2}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={10}>
                  <Box display="flex" alignItems="center" mb={2}>
                    <Typography variant="subtitle1" sx={{ width: '80px', ml: 3 }}>
                      제목
                    </Typography>
                    <TextField
                      name="title"
                      placeholder="복합명사는 띄어쓰기 해보세요."
                      variant="outlined"
                      value={formData.title}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
                      sx={{ flex: 1 }}
                    />
                  </Box>

                  <Box display="flex" alignItems="center" mb={2}>
                    <Typography variant="subtitle1" sx={{ width: '80px', ml: 3 }}>
                      저자
                    </Typography>
                    <TextField
                      name="author"
                      variant="outlined"
                      value={formData.author}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
                      sx={{ flex: 1 }}
                    />
                  </Box>

                  <Box display="flex" alignItems="center" mb={2}>
                    <Typography variant="subtitle1" sx={{ width: '80px', ml: 3 }}>
                      출판사
                    </Typography>
                    <TextField
                      name="publisher"
                      variant="outlined"
                      value={formData.publisher}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
                      sx={{ flex: 1 }}
                    />
                  </Box>

                  <Box display="flex" alignItems="center" mb={2}>
                    <Box display="flex" alignItems="center" mb={2}>
                      <Typography variant="subtitle1" sx={{ width: '80px', ml: 3, minWidth: '20px', whiteSpace: 'nowrap' }}>
                        출간일
                      </Typography>
                    </Box>
                    <ToggleButtonGroup
                      value={dateRange}
                      exclusive
                      onChange={handleDateRange}
                      sx={{
                        display: 'flex',
                        flexDirection: isMobile ? 'column' : 'row',
                        paddingLeft: isMobile ? '16px' : '0px',
                        gap: 0.3,
                        flexWrap: 'nowrap',
                        '& .MuiToggleButton-root': {
                          border: '1px solid rgba(0, 0, 0, 0.12)', // 각 버튼 테두리
                          borderRadius: 0, // 모든 버튼에 테두리 반경 0으로 설정
                        },
                        '& .MuiToggleButtonGroup-grouped': {
                          borderRadius: '5px !important', // 그룹화된 버튼 모두 테두리 반경 0
                        },
                      }}>
                      <ToggleButton
                        disableRipple
                        value="all"
                        sx={{
                          minWidth: '50px',
                          whiteSpace: 'nowrap',
                        }}>
                        전체
                      </ToggleButton>
                      <ToggleButton
                        disableRipple
                        value="3months"
                        sx={{
                          minWidth: '50px',
                          whiteSpace: 'nowrap',
                        }}>
                        3개월
                      </ToggleButton>
                      <ToggleButton
                        disableRipple
                        value="6months"
                        sx={{
                          minWidth: '50px',
                          whiteSpace: 'nowrap',
                        }}>
                        6개월
                      </ToggleButton>
                      <ToggleButton
                        disableRipple
                        value="9months"
                        sx={{
                          minWidth: '50px',
                          whiteSpace: 'nowrap',
                        }}>
                        9개월
                      </ToggleButton>
                      <ToggleButton
                        disableRipple
                        value="24months"
                        sx={{
                          minWidth: '50px',
                          whiteSpace: 'nowrap',
                        }}>
                        24개월
                      </ToggleButton>
                      <ToggleButton
                        disableRipple
                        value="custom"
                        sx={{
                          minWidth: '30px',
                          whiteSpace: 'nowrap',
                        }}>
                        직접설정
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </Box>

                  {/* 직접설정 선택시 나타나는 인터벌 */}
                  {dateRange === 'custom' && (
                    <Box
                      display="flex"
                      flexDirection={isMobile ? 'column' : 'row'}
                      alignItems="center"
                      flexWrap="wrap"
                      mb={2}
                      sx={{ ml: isMobile ? '0px' : '101px', width: '100%', flexWrap: 'nowrap' }}>
                      <Box display="flex" alignItems="center" mb={isMobile ? 2 : 0}>
                        <TextField
                          name="startYear"
                          label="년"
                          value={startYear}
                          sx={{ width: '100px', mr: 1 }}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeDateRange(e)}
                        />
                        <Select
                          name="startMonth"
                          value={startMonth}
                          onChange={handleChangeDateRange}
                          displayEmpty
                          sx={{ width: '80px', mr: isMobile ? 0 : 2 }} // 모바일에서는 우측 여백 최소화
                        >
                          <MenuItem value="" disabled>
                            월
                          </MenuItem>
                          {months.map((month) => (
                            <MenuItem key={month} value={month}>
                              {month}
                            </MenuItem>
                          ))}
                        </Select>
                        <Typography variant="body2" sx={{ minWidth: '50px', whiteSpace: 'nowrap', ml: isMobile ? 0 : 2 }}>
                          월부터
                        </Typography>
                      </Box>

                      <Box display="flex" alignItems="center" mb={isMobile ? 2 : 0} mt={isMobile ? 2 : 0}>
                        <TextField
                          name="endYear"
                          label="년"
                          value={endYear}
                          sx={{ width: '100px', ml: 2, mr: 1 }}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeDateRange(e)}
                        />
                        <Select name="endMonth" value={endMonth} onChange={handleChangeDateRange} displayEmpty sx={{ width: '80px', mr: 2 }}>
                          <MenuItem value="" disabled>
                            월
                          </MenuItem>
                          {months.map((month) => (
                            <MenuItem key={month} value={month}>
                              {month}
                            </MenuItem>
                          ))}
                        </Select>
                        <Typography variant="body2" sx={{ minWidth: '50px', whiteSpace: 'nowrap' }}>
                          월까지
                        </Typography>
                      </Box>
                    </Box>
                  )}

                  <Box display="flex" alignItems="center" mb={2}>
                    <Box display="flex" alignItems="center" mb={2}>
                      <Typography variant="subtitle1" sx={{ width: '80px', ml: 3, minWidth: '50px', whiteSpace: 'nowrap' }}>
                        정렬순서
                      </Typography>
                    </Box>
                    <Select name="sortOrder" value={formData.sortOrder} onChange={(e: SelectChangeEvent) => handleChange(e)} displayEmpty sx={{ flex: 1 }}>
                      <MenuItem value="" disabled>
                        정렬순서
                      </MenuItem>
                      <MenuItem value="accuracy">정확도순</MenuItem>
                      <MenuItem value="sales">판매량순</MenuItem>
                      <MenuItem value="publication">출간일순</MenuItem>
                      <MenuItem value="name">상품명순</MenuItem>
                      <MenuItem value="rank">평점순</MenuItem>
                      <MenuItem value="lowPrice">저가격순</MenuItem>
                    </Select>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={2} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                  <Box display="flex" justifyContent="center">
                    <Button
                      disableRipple
                      variant="contained"
                      color="success"
                      onClick={handleSearch}
                      sx={{
                        backgroundColor: (theme) => theme.palette.primary.main,
                        '&:hover': {
                          backgroundColor: (theme) => theme.palette.primary.dark,
                        },
                      }}>
                      찾기
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>

            <Divider sx={{ my: 4 }} />

            <Box display="flex" alignItems="center" mb={2}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={10}>
                  <Typography variant="subtitle1" sx={{ width: '90px', ml: 3 }}>
                    ISBN 검색
                  </Typography>
                  <TextField
                    name="isbn"
                    fullWidth
                    placeholder="-없이 숫자만 입력하세요."
                    variant="outlined"
                    value={formData.isbn}
                    onChange={handleChange}
                    sx={{ flex: 1, mr: 1 }}
                  />
                </Grid>

                <Grid item xs={12} sm={2}>
                  <Box display="flex" justifyContent="center">
                    <Button
                      disableRipple
                      variant="contained"
                      color="success"
                      sx={{
                        mt: 0,
                        backgroundColor: (theme) => theme.palette.primary.main,
                        '&:hover': {
                          backgroundColor: (theme) => theme.palette.primary.dark,
                        },
                        height: '40px',
                      }}>
                      찾기
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Container>
      </Box>
    </div>
  );
};

export default SearchPage;
