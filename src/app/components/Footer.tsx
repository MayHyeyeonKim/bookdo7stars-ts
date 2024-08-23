'use client';

import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        mt: 'auto',
        backgroundColor: 'primary.light',
        color: 'white',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          pr: 4,
          pl: 4,
        }}>
        <Box>
          <Typography
            variant="body2"
            color="inherit"
            sx={{
              fontWeight: 'bold',
              fontSize: { xs: '1rem', sm: '1.25rem' },
            }}>
            Company
          </Typography>
          <Typography
            variant="h6"
            color="inherit"
            sx={{
              mt: 2,
              fontSize: { xs: '1rem', sm: '1.05rem' },
            }}>
            About us
          </Typography>
          <Typography
            variant="h6"
            color="inherit"
            sx={{
              fontSize: { xs: '1rem', sm: '1.05rem' },
            }}>
            Careers
          </Typography>
          <Typography
            variant="h6"
            color="inherit"
            sx={{
              fontSize: { xs: '1rem', sm: '1.05rem' },
            }}>
            Blog
          </Typography>
        </Box>
        <Box>
          <Typography
            variant="body2"
            color="inherit"
            sx={{
              fontWeight: 'bold',
              fontSize: { xs: '1rem', sm: '1.25rem' },
            }}>
            Contact
          </Typography>
          <Typography
            variant="h6"
            color="inherit"
            sx={{
              mt: 2,
              fontSize: { xs: '1rem', sm: '1.05rem' },
            }}>
            Email:bookdo7stars@book.com
          </Typography>
          <Typography
            variant="h6"
            color="inherit"
            sx={{
              fontSize: { xs: '1rem', sm: '1.05rem' },
            }}>
            Phone: +123 456 7890
          </Typography>
          <Typography
            variant="h6"
            color="inherit"
            sx={{
              fontSize: { xs: '1rem', sm: '1.05rem' },
            }}>
            Contact Us
          </Typography>
        </Box>
        <Box>
          <Typography
            variant="body2"
            color="inherit"
            sx={{
              fontWeight: 'bold',
              fontSize: { xs: '1rem', sm: '1.25rem' },
            }}>
            Follow Us
          </Typography>

          <a href="https://github.com/BookDo7starsTS" style={{ textDecoration: 'none', color: 'inherit' }} target="_blank" rel="noopener noreferrer">
            <Typography
              variant="h6"
              color="inherit"
              sx={{
                mt: 2,
                fontSize: { xs: '1rem', sm: '1.05rem' },
              }}>
              Github
            </Typography>
          </a>
          <Typography
            variant="h6"
            color="inherit"
            sx={{
              fontSize: { xs: '1rem', sm: '1.05rem' },
            }}>
            Twitter
          </Typography>
          <Typography
            variant="h6"
            color="inherit"
            sx={{
              fontSize: { xs: '1rem', sm: '1.05rem' },
            }}>
            Instagram
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          mt: 6,
        }}>
        <Typography variant="body2">&copy; 2024 북두칠성. All rights reserved.</Typography>
      </Box>
    </Box>
  );
};

export default Footer;
