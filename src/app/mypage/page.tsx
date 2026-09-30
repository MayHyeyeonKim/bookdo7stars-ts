'use client';
import React, { useState, useEffect } from 'react';

import { RootState } from '@/app/reducers';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {
  Typography,
  Box,
  Grid,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  IconButton,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import { useDispatch, useSelector } from 'react-redux';

import { getWishlistRequest } from '../actions/types';
import OrderHistory from '../components/OrderHistory';
import { AppDispatch } from '../store/store';

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="first page">
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton onClick={handleNextButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="next page">
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton onClick={handleLastPageButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="last page">
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

const MyPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [value, setValue] = useState('1');
  //const [rows, setRows] = useState([]);
  const handleTab = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const { wishlist } = useSelector((store: RootState) => store.wishlist) || { wishlist: [] };
  console.log('wishlist', wishlist);
  useEffect(() => {
    dispatch(getWishlistRequest(1, 5));
  }, []);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - wishlist.length) : 0;
  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
    //setRows([]);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Grid
        container
        spacing={0}
        sx={{
          height: '100vh',
          flexDirection: {
            xs: 'column', // 작은 화면에서는 상하로 배치
            sm: 'row', // 큰 화면에서는 좌우로 배치
          },
        }}>
        {/* 왼쪽 고정 영역 */}
        <Grid
          item
          style={{
            width: '300px', // 고정된 너비
          }}>
          <Typography
            variant="h5"
            sx={{
              color: '#035036',
            }}>
            마이페이지
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            testuser님 오늘도 즐겁고 행복한 하루 보내세요.
          </Typography>

          <Box component="section" sx={{ p: 2, border: '2px solid #cccccc', borderRadius: '10px' }}>
            나의 북두칠성 등급 bronze, silver, gold, crystal
          </Box>
          <Box component="section" sx={{ p: 2, border: '2px solid #cccccc', borderRadius: '10px' }}>
            나의 쇼핑 주문 내역/배송조회
          </Box>
        </Grid>

        {/* 오른쪽 유동적 영역 */}
        <Grid item xs>
          {/* 최근 주문 내역 */}
          <OrderHistory></OrderHistory>

          <Typography variant="subtitle1" gutterBottom>
            나의 1:1 문의
          </Typography>

          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleTab} aria-label="lab API tabs example">
                <Tab label="위시리스트" value="1" />
                <Tab label="마이리뷰" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <Paper sx={{ width: '100%' }}>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 500 }}>
                    <TableHead>
                      <TableRow>
                        <TableCell style={{ width: 60 }}></TableCell>
                        <TableCell component="th" scope="row">
                          도서명
                        </TableCell>
                        <TableCell component="th" scope="row">
                          저자
                        </TableCell>
                        <TableCell component="th" scope="row">
                          출판사
                        </TableCell>
                        <TableCell component="th" scope="row">
                          출간일
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {wishlist?.map((row: any) => (
                        <TableRow key={row.id}>
                          <TableCell style={{ width: 60 }} align="right">
                            {row.id}
                          </TableCell>
                          <TableCell style={{ width: 160 }} align="left">
                            {row.title}
                          </TableCell>
                          <TableCell style={{ width: 160 }} align="left">
                            {row.author}
                          </TableCell>
                          <TableCell style={{ width: 160 }} align="left">
                            {row.publisher}
                          </TableCell>
                          <TableCell style={{ width: 160 }} align="left">
                            {row.date}
                          </TableCell>
                        </TableRow>
                      ))}
                      {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                          <TableCell colSpan={7} />
                        </TableRow>
                      )}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TablePagination
                          rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                          colSpan={3}
                          count={wishlist.length}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          slotProps={{
                            select: {
                              inputProps: {
                                'aria-label': 'rows per page',
                              },
                              native: true,
                            },
                          }}
                          onPageChange={handleChangePage}
                          onRowsPerPageChange={handleChangeRowsPerPage}
                          ActionsComponent={TablePaginationActions}
                        />
                      </TableRow>
                    </TableFooter>
                  </Table>
                </TableContainer>
              </Paper>
            </TabPanel>
            <TabPanel value="2">Item Two</TabPanel>
          </TabContext>
        </Grid>
      </Grid>
    </>
  );
};

export default MyPage;
