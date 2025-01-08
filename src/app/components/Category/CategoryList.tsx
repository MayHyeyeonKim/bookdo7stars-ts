'use client';
import React, { useEffect, useMemo } from 'react';

import { getCategoriesByIdRequest, setExpandedCategoryIdsRequest, setSelectedCategoryIdsRequest } from '@/app/actions/types';
import { CategoryById } from '@/app/models/category';
import { RootState } from '@/app/reducers';
import { AppDispatch } from '@/app/store/store';
import { List } from '@mui/material';
import 'rc-tree/assets/index.css';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

import CategoryListItem from './CategoryListItem';

type CategoryListProps = {
  categories: Record<string, CategoryById[]>;
  categoryId: string;
};

const CategoryList = (props: CategoryListProps) => {
  const { categories, categoryId } = props;
  const { expandedIds } = useSelector((store: RootState) => store.category);
  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();

  const ids = useMemo(() => Object.keys(categories), [categories]);

  const onExpandCategory = (id: string) => {
    if (!categories[id + ' '] || categories[id + ' '].length === 0) {
      dispatch(getCategoriesByIdRequest(id.toString()));
    }
    if (expandedIds.includes(id)) {
      dispatch(setExpandedCategoryIdsRequest(expandedIds.filter((expandedId) => expandedId !== id)));
    } else {
      dispatch(setExpandedCategoryIdsRequest([...expandedIds, id]));
    }
  };

  const handleOnClickCategory = (id: number) => {
    dispatch(setSelectedCategoryIdsRequest(id.toString()));
    onExpandCategory(id.toString());
    router.push(`/books/category/${id}`);
  };

  useEffect(() => {
    if (expandedIds.length === 0) {
      const newExpandedIds: string[] = [];
      if (ids.length >= 3) {
        for (let i = 1; i < ids.length - 1; i++) {
          newExpandedIds.push(ids[i].trim());
        }
      }
      dispatch(setExpandedCategoryIdsRequest(newExpandedIds));
    }
  }, [ids]);

  const renderCategory = (category: CategoryById, paddingLeft = 0) => {
    return (
      <React.Fragment key={category.id}>
        <CategoryListItem
          category={category}
          categoryId={categoryId}
          expandedIds={expandedIds}
          onExpandCategory={onExpandCategory}
          handleOnClickCategory={handleOnClickCategory}
          style={{ padding: `0 0 0 ${paddingLeft}rem` }}
        />
        {expandedIds.includes(category.id.toString()) &&
          categories[category.id + ' ']?.map(
            (subCategory) => renderCategory(subCategory, paddingLeft + 4), // 재귀적으로 자식 카테고리 렌더링
          )}
      </React.Fragment>
    );
  };

  return <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>{categories[ids[0]]?.map((cat) => renderCategory(cat))}</List>;
};

export default CategoryList;
