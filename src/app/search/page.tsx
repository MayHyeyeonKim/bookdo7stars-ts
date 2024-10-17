'use client';
import React, { useState, useEffect, ChangeEvent } from 'react';

import { RootState } from '@/app/reducers';
import SearchIcon from '@mui/icons-material/Search';
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
} from '@mui/material';
import { useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch } from '../../store/store';

const SearchPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {}, []);

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    publisher: '',
    dateRange: 'all',
    sortOrder: '',
    isbn: '',
    customDate: false,
    startYear: '',
    startMonth: '',
    endYear: '',
    endMonth: '',
  });

  console.log('ddd', formData);

  const handleChange = (e: ChangeEvent<HTMLInputElement> | SelectChangeEvent) => {
    const targetName = e.target.name;
    const targetValue = e.target.value;

    setFormData((prevState) => ({
      ...prevState,
      [targetName]: targetValue,
    }));
  };

  return (
    <div>
      <Box sx={{ mt: 5, mb: 5 }}>
        <Container>
          <Paper elevation={0} sx={{ p: 1 }}>
            <Box sx={{ backgroundColor: (theme) => theme.palette.third.main, display: 'flex', alignItems: 'center' }}>
              <SearchIcon sx={{ fontSize: 40, ml: 2, mr: 1 }} />
              <Typography variant="h5" sx={{ mt: 1.5, mb: 1.5, p: 0 }}>
                상세검색
              </Typography>
            </Box>
            <Box mt={2}>
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
                <Typography variant="subtitle1" sx={{ width: '80px', ml: 3 }}>
                  출간일
                </Typography>
                <ToggleButtonGroup value={formData.dateRange} exclusive>
                  <ToggleButton disableRipple value="all">
                    전체
                  </ToggleButton>
                  <ToggleButton disableRipple value="3months">
                    3개월
                  </ToggleButton>
                  <ToggleButton disableRipple value="6months">
                    6개월
                  </ToggleButton>
                  <ToggleButton disableRipple value="9months">
                    9개월
                  </ToggleButton>
                  <ToggleButton disableRipple value="24months">
                    24개월
                  </ToggleButton>
                  <ToggleButton disableRipple value="custom">
                    직접설정
                  </ToggleButton>
                </ToggleButtonGroup>
              </Box>

              {/* 직접설정 선택 시 나타나는 인터벌
              {customDate && (
                <Box display="flex" alignItems="center" mb={2} sx={{ ml: '101px' }}>
                  <TextField name="startYear" label="년" value={formData.startYear} onChange={handleChange('startYear')} sx={{ width: '100px', mr: 1 }} />
                  <Select name="startMonth" value={formData.startMonth} onChange={handleChange('startMonth')} displayEmpty sx={{ width: '80px', mr: 2 }}>
                    <MenuItem value="" disabled>
                      월
                    </MenuItem>
                    {[...Array(12).keys()].map((month) => (
                      <MenuItem key={month + 1} value={month + 1}>
                        {String(month + 1).padStart(2, '0')}
                      </MenuItem>
                    ))}
                  </Select>
                  <Typography variant="body2">월부터</Typography>

                  <TextField name="endYear" label="년" value={formData.endYear} onChange={handleChange('endYear')} sx={{ width: '100px', ml: 2, mr: 1 }} />
                  <Select name="endMonth" value={formData.endMonth} onChange={handleChange('endMonth')} displayEmpty sx={{ width: '80px', mr: 1 }}>
                    <MenuItem value="" disabled>
                      월
                    </MenuItem>
                    {[...Array(12).keys()].map((month) => (
                      <MenuItem key={month + 1} value={month + 1}>
                        {String(month + 1).padStart(2, '0')}
                      </MenuItem>
                    ))}
                  </Select>
                  <Typography variant="body2">월까지</Typography>
                </Box>
              )} */}

              <Box display="flex" alignItems="center" mb={2}>
                <Typography variant="subtitle1" sx={{ width: '80px', ml: 3 }}>
                  정렬순서
                </Typography>
                <Select name="sortOrder" value={formData.sortOrder} onChange={(e: SelectChangeEvent) => handleChange(e)} displayEmpty sx={{ flex: 1 }}>
                  <MenuItem value="" disabled>
                    정렬순서
                  </MenuItem>
                  <MenuItem value="accuracy">정확도순</MenuItem>
                  <MenuItem value="sales">판매량순</MenuItem>
                  <MenuItem value="publication">출간일순</MenuItem>
                  <MenuItem value="name">상품명순</MenuItem>
                  <MenuItem value="rating">평점순</MenuItem>
                  <MenuItem value="reviews">리뷰순</MenuItem>
                  <MenuItem value="lowPrice">저가격순</MenuItem>
                </Select>
              </Box>

              <Box display="flex" justifyContent="center" mt={2}>
                <Button
                  disableRipple
                  variant="contained"
                  color="success"
                  // onClick={handleSearchClick}
                  sx={{
                    backgroundColor: (theme) => theme.palette.primary.main,
                    '&:hover': {
                      backgroundColor: (theme) => theme.palette.primary.dark,
                    },
                  }}>
                  찾기
                </Button>
              </Box>

              <Divider sx={{ my: 4 }} />

              <Box display="flex" alignItems="center" mb={2}>
                <Typography variant="subtitle1" gutterBottom sx={{ width: '90px', ml: 3 }}>
                  ISBN 검색
                </Typography>
                <TextField
                  name="isbn"
                  fullWidth
                  placeholder="-없이 숫자만 입력하세요."
                  variant="outlined"
                  value={formData.isbn}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
                  sx={{ mr: 1 }}
                />
                <Button
                  disableRipple
                  variant="contained"
                  color="success"
                  // onClick={handleIsbnSearchClick}
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
            </Box>
          </Paper>
        </Container>
      </Box>
    </div>
  );
};

export default SearchPage;
