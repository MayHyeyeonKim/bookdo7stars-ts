'use client';

import { TableCell, tableCellClasses, TableRow, TableContainer, Paper, TableHead, TableBody, Table, styled } from '@mui/material';

import { CartItem } from '../../models/cart';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

type CustomTableProps = {
  items: CartItem[];
  isTableExpanded: boolean;
};
const CustomTable = (props: CustomTableProps) => {
  const { items, isTableExpanded } = props;

  let showedItems: CartItem[] = [];
  showedItems = isTableExpanded ? items : [items[0]];

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>상품명</StyledTableCell>
            <StyledTableCell align="right">정가</StyledTableCell>
            <StyledTableCell align="right">수량</StyledTableCell>
            <StyledTableCell align="right">할인금액</StyledTableCell>
            <StyledTableCell align="right">합계</StyledTableCell>
            <StyledTableCell align="right">배송일</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {showedItems.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {row.book.title}
              </StyledTableCell>
              <StyledTableCell align="right">₩ {row.book.priceStandard}</StyledTableCell>
              <StyledTableCell align="right">{row.quantity}</StyledTableCell>
              <StyledTableCell align="right">₩ {Math.abs(row.book.priceSales - row.book.priceStandard)}</StyledTableCell>
              <StyledTableCell align="right">₩ {Math.imul(row.book.priceStandard, row.quantity)}</StyledTableCell>
              <StyledTableCell align="right">배송 정보가 없습니다.</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
