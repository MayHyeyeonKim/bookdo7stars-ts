'use client';
import React, { useState, useEffect } from 'react';

import { RootState } from '@/app/reducers';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import {
  Typography,
  Box,
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
import { useDispatch, useSelector } from 'react-redux';

import { getOrderHistoryRequest } from '../actions/types';
import { OrderDetail } from '../models/order';
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

function getOrderDetails(orderDetails: OrderDetail[]) {
  return (
    <Table sx={{ display: '' }}>
      <TableHead>
        <TableRow>
          <TableCell component="th" scope="row" align="left">
            제목
          </TableCell>
          <TableCell component="th" scope="row" align="left">
            주문수량
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {orderDetails?.map((row: any) => (
          <TableRow key={row.title}>
            <TableCell style={{ width: 100 }} align="left">
              {row.title}
            </TableCell>
            <TableCell style={{ width: 160 }} align="left">
              {row.quantity}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

const OrderHistory = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [expandedOrderNumber, setExpandedOrderNumber] = useState('');
  const { orderHistory, count } = useSelector((store: RootState) => store.order) || { orderHistory: [] };
  useEffect(() => {
    dispatch(getOrderHistoryRequest(page + 1, rowsPerPage));
  }, [page, rowsPerPage]);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
    //setRows([]);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleExpandableToggle = (orderNumber: string) => {
    setExpandedOrderNumber((prev) => (orderNumber === prev ? '' : orderNumber));
  };
  return (
    <>
      <Typography variant="subtitle1" gutterBottom>
        최근 주문 내역
      </Typography>
      <Paper sx={{ width: '100%' }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }}>
            <TableHead>
              <TableRow>
                <TableCell component="th" scope="row" align="left">
                  주문번호
                </TableCell>
                <TableCell component="th" scope="row" align="left">
                  내용
                </TableCell>
                <TableCell component="th" scope="row" align="left">
                  주문일
                </TableCell>
                <TableCell component="th" scope="row" align="left">
                  주문 금액
                </TableCell>
                <TableCell component="th" scope="row"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderHistory?.map((row: any) => (
                <>
                  <TableRow key={row.order_number}>
                    <TableCell style={{ width: 100 }} align="left">
                      {row.order_number}
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="left">
                      {row.title}
                    </TableCell>
                    <TableCell style={{ width: 100 }} align="left">
                      {row.created_at}
                    </TableCell>
                    <TableCell style={{ width: 60 }} align="left">
                      {row.total_price}
                    </TableCell>
                    <TableCell style={{ width: 60 }} align="left" onClick={() => handleExpandableToggle(row.order_number)}>
                      더보기
                    </TableCell>
                  </TableRow>
                  {expandedOrderNumber === row.order_number && (
                    <TableRow key={row.id}>
                      <TableCell style={{ width: 100 }} align="left" colSpan={5}>
                        {getOrderDetails(row.orderDetails)}
                      </TableCell>
                    </TableRow>
                  )}
                </>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                  colSpan={3}
                  count={count}
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
    </>
  );
};

export default OrderHistory;
