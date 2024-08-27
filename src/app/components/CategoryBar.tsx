import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Toolbar, Typography, MenuItem, Box, IconButton, useTheme, useMediaQuery } from '@mui/material';
import { useRouter } from 'next/navigation';

import { QueryTypes, bookGroups, getBooksPageURL } from '../books/constants';

const CategoryBar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const router = useRouter();

  const handlePopperClick = () => {
    // 팝오버 열기 로직 추가
  };

  const handlePopperClose = () => {
    // 팝오버 닫기 로직 추가
  };

  const queryTypes: QueryTypes[] = [
    QueryTypes.All,
    QueryTypes.ItemNewAll,
    QueryTypes.ItemNewSpecial,
    QueryTypes.BestSeller,
    QueryTypes.BlogBest,
    QueryTypes.EditorRecommended,
  ];

  const getGroups = (queryTypes: QueryTypes[], bookGroups: Record<string, string>): string[] => {
    const groups: string[] = [];
    queryTypes.forEach((q) => {
      if (bookGroups[q]) {
        groups.push(bookGroups[q]);
      }
    });
    return groups;
  };

  const groups = getGroups(queryTypes, bookGroups);

  const goToBookGroupPage = (group: string) => {
    router.push(getBooksPageURL(group));
  };

  return (
    <div>
      <AppBar position="static" sx={{ backgroundColor: '#fff', borderBottom: '2px solid #035036', borderTop: '2px solid #035036' }}>
        <Toolbar sx={{ padding: { xs: '0 8px', sm: '0 16px' } }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              paddingLeft: '20px',
              paddingRight: '20px',
            }}>
            <Box
              sx={{
                display: isMobile ? 'grid' : 'flex',
                gridTemplateColumns: isMobile ? 'repeat(3, 1fr)' : 'none',
                gap: 1,
                flexWrap: isMobile ? 'none' : 'wrap',
                width: '100%',
              }}>
              {groups.map((group, index) => (
                <MenuItem key={index} onClick={() => goToBookGroupPage(group)}>
                  <Typography
                    sx={{
                      fontSize: { xs: '0.7rem', sm: '0.9rem' },
                      cursor: 'pointer',
                      color: '#035036',
                      fontWeight: 'bold',
                    }}>
                    {group}
                  </Typography>
                </MenuItem>
              ))}
            </Box>
            <Box>
              <IconButton
                onClick={handlePopperClick}
                sx={{
                  color: 'primary.main',
                  width: { xs: 40, sm: 50 },
                  height: { xs: 40, sm: 50 },
                  '&:hover': { backgroundColor: 'primary.light' },
                }}>
                <MenuIcon />
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default CategoryBar;
