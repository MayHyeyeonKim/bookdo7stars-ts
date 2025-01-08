import React from 'react';

import { CategoryById } from '@/app/models/category';
import { AppDispatch } from '@/app/store/store';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import { IconButton, ListItem, ListItemText, SxProps, useTheme } from '@mui/material';
import { useDispatch } from 'react-redux';

type CategoryListItemProps = {
  category: CategoryById;
  expandedIds: string[];
  categoryId: string;
  onExpandCategory: (id: string) => void;
  handleOnClickCategory: (id: number) => void;
  style?: SxProps;
};

const CategoryListItem = (props: CategoryListItemProps) => {
  const { category, expandedIds, categoryId, onExpandCategory, handleOnClickCategory, style } = props;
  const theme = useTheme();

  return (
    <ListItem key={category.id} sx={{ ...style }}>
      {category.count && category.count > 0 ? (
        <IconButton sx={{ padding: '0.5rem' }} aria-label="expand category" onClick={() => onExpandCategory(category.id.toString())}>
          <ArrowForwardIosOutlinedIcon
            sx={{
              transform: expandedIds.includes(category.id.toString()) ? 'rotate(90deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s',
            }}
          />
        </IconButton>
      ) : (
        <IconButton sx={{ padding: '0.5rem' }} disabled>
          <RemoveOutlinedIcon />
        </IconButton>
      )}
      <ListItemText
        id={category.id.toString()}
        primary={category.name}
        onClick={() => handleOnClickCategory(category.id)}
        sx={{
          cursor: 'pointer',
          backgroundColor: category.id.toString() === categoryId ? theme.palette.primary.light : 'transparent',
          fontWeight: category.id.toString() === categoryId ? 'bold' : 'normal',
        }}
      />
    </ListItem>
  );
};

export default CategoryListItem;
