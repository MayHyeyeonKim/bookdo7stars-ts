import { Box, Typography, Slider } from '@mui/material';

interface FilterSliderProps {
  label: string;
  value: number | number[];
  min: number;
  max: number;
  marks?: { value: number; label: string }[];
  step?: number | null;
  onChange: (event: Event, value: number | number[]) => void;
}

const FilterSlider = ({ label, value, min, max, marks, step, onChange }: FilterSliderProps) => {
  return (
    <Box mb={2}>
      <Typography>{label}</Typography>
      <Slider value={value} onChange={onChange} min={min} max={max} step={step} marks={marks} valueLabelDisplay="auto" />
    </Box>
  );
};

export default FilterSlider;
