// import './styles/styles.css';
'use client';
import React, { useEffect } from 'react';

import { getMainpageBooksRequest, getMainpageBestSellerBooksRequest, resetMainpageBooks, resetGroupBooks } from '@/app/actions/types';
import BookCard from '@/app/components/Book/BookCard';
import MoreButton from '@/app/components/MoreButton';
import { RootState } from '@/app/reducers';
import { AppDispatch } from '@/app/store/store';
import { Typography, Container, Box, Grid } from '@mui/material';
import Carousel from 'react-multi-carousel';
import { useDispatch, useSelector } from 'react-redux';

import { Book } from './models/book';
import { Category } from './models/category';

import 'react-multi-carousel/lib/styles.css';

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { mainpageBooks } = useSelector((store: RootState) => store.mainpageBook);
  const { groupBooks } = useSelector((store: RootState) => store.book);

  useEffect(() => {
    dispatch(resetMainpageBooks());
    dispatch(resetGroupBooks());
    dispatch(getMainpageBooksRequest());
    dispatch(getMainpageBestSellerBooksRequest(1230, 1, 12));
  }, []);

  const handleBestSellerCategoryClick = (categoryId: number) => {
    dispatch(getMainpageBestSellerBooksRequest(categoryId, 1, 12));
  };
  const handleBannerClick = (bookId: number) => {
    window.location.href = `/book/${bookId}`;
  };
  return (
    <>
      <Container className="banner-carousel-box" sx={{ padding: '0 !important' }}>
        <Carousel
          itemClass="carousel-item-padding-40-px"
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={4000}
          arrows={false}
          showDots={true}
          swipeable={true}
          draggable={true}
          responsive={{
            superLarge: {
              breakpoint: { max: 4000, min: 3000 },
              items: 1,
            },
            large: {
              breakpoint: { max: 3000, min: 1024 },
              items: 1,
            },
            medium: {
              breakpoint: { max: 1024, min: 464 },
              items: 1,
            },
            small: {
              breakpoint: { max: 464, min: 0 },
              items: 1,
            },
          }}>
          {mainpageBooks.banner.map((book: Book, index: React.Key | null | undefined) => (
            <Box
              key={index}
              component="img"
              onClick={() => handleBannerClick(book.id)}
              sx={{
                width: '100%',
                height: 'auto',
                cursor: 'pointer',
              }}
              src={book.cover}
              alt="Example"
            />
          ))}
        </Carousel>
      </Container>
      <Container maxWidth={false} disableGutters className="Mainpage-Container" sx={{ padding: 2 }}>
        <Container
          maxWidth={false}
          disableGutters
          sx={{
            display: 'flex', // Flexbox 활성화
            justifyContent: 'space-between', // 좌우 끝 정렬
            alignItems: 'center', // 세로 가운데 정렬
            padding: '16px', // 적절한 여백 추가
          }}>
          <Typography variant="h4" style={{ fontWeight: 600 }}>
            화제의 신간
          </Typography>
          <MoreButton href="/books/ItemNewSpecial" />
        </Container>

        <Carousel
          itemClass="carousel-item carousel-item-padding-40-px"
          additionalTransfrom={0}
          arrows
          centerMode={false}
          className="carousel"
          containerClass="container"
          draggable
          focusOnSelect={false}
          infinite
          keyBoardControl
          minimumTouchDrag={80}
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
          responsive={{
            superLarge: {
              breakpoint: { max: 4000, min: 3000 },
              items: 6,
            },
            large: {
              breakpoint: { max: 3000, min: 1024 },
              items: 5,
            },
            medium: {
              breakpoint: { max: 1024, min: 464 },
              items: 3,
            },
            small: {
              breakpoint: { max: 464, min: 0 },
              items: 1,
            },
          }}>
          {mainpageBooks.itemNewSpecial.map((book: Book, index: React.Key | null | undefined) => (
            <div key={book.id} className="carousel-item">
              <div>
                <BookCard key={index} book={book} />
              </div>
            </div>
          ))}
        </Carousel>

        <Container
          maxWidth={false}
          disableGutters
          sx={{
            display: 'flex', // Flexbox 활성화
            justifyContent: 'space-between', // 좌우 끝 정렬
            alignItems: 'center', // 세로 가운데 정렬
            padding: '16px', // 적절한 여백 추가
          }}>
          <Typography variant="h4" style={{ fontWeight: 600 }}>
            베스트 셀러
          </Typography>
          <MoreButton href="/books/Bestseller" />
        </Container>
        <Carousel
          arrows={true}
          showDots={false}
          swipeable={true}
          draggable={true}
          responsive={{
            superLarge: {
              breakpoint: { max: 4000, min: 3000 },
              items: 10,
              slidesToSlide: 10,
            },
            large: {
              breakpoint: { max: 3000, min: 1024 },
              items: 10,
              slidesToSlide: 10,
            },
            medium: {
              breakpoint: { max: 1024, min: 464 },
              items: 6,
              slidesToSlide: 6,
            },
            small: {
              breakpoint: { max: 464, min: 0 },
              items: 2,
              slidesToSlide: 2,
            },
          }}>
          {mainpageBooks.bestSellerCategory.map((category: Category) => (
            <div
              key={category.id}
              className="bestSellerCategory"
              style={{
                display: 'inline-block', // 글자에 맞게 아이템 크기 자동 조정
                padding: '10px 20px', // 여백 설정
                cursor: 'pointer',
                textAlign: 'center',
                fontSize: '16px',
                width: '100%',
              }}
              tabIndex={0}
              onClick={() => handleBestSellerCategoryClick(category.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleBestSellerCategoryClick(category.id);
                }
              }}
              role="button">
              {category.name}
            </div>
          ))}
        </Carousel>
        <Box>
          <Grid container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {groupBooks.map((book: Book, index: React.Key | null | undefined) => (
              <Grid
                data-testid="book-card"
                key={index}
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                xl={2}
                sx={{ paddingY: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <BookCard key={index} book={book} />
              </Grid>
            ))}
          </Grid>
          {groupBooks.length == 0 && <div style={{ textAlign: 'center', fontWeight: 600 }}>검색 결과가 없습니다.</div>}
        </Box>

        <Container
          maxWidth={false}
          disableGutters
          sx={{
            display: 'flex', // Flexbox 활성화
            justifyContent: 'space-between', // 좌우 끝 정렬
            alignItems: 'center', // 세로 가운데 정렬
            padding: '16px', // 적절한 여백 추가
          }}>
          <Typography variant="h4" style={{ fontWeight: 600 }}>
            새로 나온 책
          </Typography>
          <MoreButton href="/books/ItemNewAll" />
        </Container>
        <Box>
          <Grid container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {mainpageBooks.itemNewAll.map((book: Book, index: React.Key | null | undefined) => (
              <Grid
                data-testid="book-card"
                key={index}
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                xl={2}
                sx={{ paddingY: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <BookCard key={index} book={book} />
              </Grid>
            ))}
          </Grid>
        </Box>

        <Container
          maxWidth={false}
          disableGutters
          sx={{
            display: 'flex', // Flexbox 활성화
            justifyContent: 'space-between', // 좌우 끝 정렬
            alignItems: 'center', // 세로 가운데 정렬
            padding: '16px', // 적절한 여백 추가
          }}>
          <Typography variant="h4" style={{ fontWeight: 600 }}>
            에디터 추천
          </Typography>
          <MoreButton href="/books/ItemEditorChoice" />
        </Container>
        <Carousel
          itemClass="carousel-item carousel-item-padding-40-px"
          additionalTransfrom={0}
          arrows
          centerMode={false}
          className="carousel"
          containerClass="container"
          draggable
          focusOnSelect={false}
          infinite
          keyBoardControl
          minimumTouchDrag={80}
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
          responsive={{
            superLarge: {
              breakpoint: { max: 4000, min: 3000 },
              items: 6,
            },
            large: {
              breakpoint: { max: 3000, min: 1024 },
              items: 5,
            },
            medium: {
              breakpoint: { max: 1024, min: 464 },
              items: 3,
            },
            small: {
              breakpoint: { max: 464, min: 0 },
              items: 1,
            },
          }}>
          {mainpageBooks.itemEditorChoice.map((book: Book, index: React.Key | null | undefined) => (
            <div key={book.id}>
              <div>
                <BookCard key={index} book={book} />
              </div>
            </div>
          ))}
        </Carousel>
      </Container>
    </>
  );
}
