import React from 'react';

import AddIcon from '@mui/icons-material/Add';
import { Link, Typography } from '@mui/material';

interface MoreButtonProps {
  href: string; // href를 필수 prop으로 지정
}

const MoreButton: React.FC<MoreButtonProps> = ({ href }) => (
  <Link
    href={href}
    underline="none"
    sx={{
      display: 'flex', // 텍스트와 아이콘을 나란히 배치
      alignItems: 'center', // 수직 가운데 정렬
      padding: '5px',
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.08)', // 호버 시 배경 색상
        cursor: 'pointer',
      },
    }}>
    <Typography
      variant="subtitle2"
      component="span"
      sx={{
        marginRight: 1,
        color: 'primary.main',
        fontWeight: 'bold',
      }}>
      더보기
    </Typography>
    <AddIcon
      sx={{
        fontSize: '12pt',
        color: 'primary.main',
        borderRadius: '50%',
        border: '1px solid',
        borderColor: 'primary.main',
        padding: '1px',
      }}
    />
  </Link>
);

export default MoreButton;
