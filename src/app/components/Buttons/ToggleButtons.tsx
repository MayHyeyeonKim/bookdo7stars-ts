import { setSortBy } from '@/app/actions/types';
import { RootState } from '@/app/reducers';
import { AppDispatch } from '@/app/store/store';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import { Box, SxProps } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';

type ToggleButtonsProps = {
  boxStyle: SxProps;
  buttonStyle: SxProps;
};

const ToggleButtons = (props: ToggleButtonsProps) => {
  const { boxStyle, buttonStyle } = props;
  const { sortBy } = useSelector((store: RootState) => store.book);
  const dispatch = useDispatch<AppDispatch>();

  const handleSortChange = (event: React.MouseEvent<HTMLElement>, newSortBy: string) => {
    dispatch(setSortBy(newSortBy));
  };

  return (
    <Box className="toggle-buttons" mb={2} sx={{ ...boxStyle }}>
      <ToggleButtonGroup value={sortBy} exclusive onChange={handleSortChange} aria-label="Sort options">
        <ToggleButton value="accuracy" aria-label="정확도순" sx={{ ...buttonStyle }}>
          정확도순
        </ToggleButton>
        <ToggleButton value="sales" aria-label="판매량순">
          판매량순
        </ToggleButton>
        <ToggleButton value="publication" aria-label="출간일순">
          출간일순
        </ToggleButton>
        <ToggleButton value="name" aria-label="상품명순">
          상품명순
        </ToggleButton>
        <ToggleButton value="rank" aria-label="평점순">
          평점순
        </ToggleButton>
        <ToggleButton value="lowPrice" aria-label="저가격순" sx={{ ...buttonStyle }}>
          저가격순
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default ToggleButtons;
