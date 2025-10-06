'use client';

import React, { useState } from 'react';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Pagination,
  Box,
} from '@mui/material';

const CARDS_PER_PAGE = 12;

// Create mock data
const allCards = Array.from({ length: 40 }, (_, i) => ({
  id: i + 1,
  title: `Post Title ${i + 1}`,
  description: `A short description for post number ${i + 1}.`,
  imageUrl: `https://via.placeholder.com/345x140.png/9de2e3/000000?Text=Post+${i + 1}`,
}));

export default function PostGrid() {
  const [page, setPage] = useState(1);
  const pageCount = Math.ceil(allCards.length / CARDS_PER_PAGE);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const startIndex = (page - 1) * CARDS_PER_PAGE;
  const endIndex = startIndex + CARDS_PER_PAGE;
  const currentCards = allCards.slice(startIndex, endIndex);

  return (
    <Box sx={{ flexGrow: 1, mt: 4 }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', mx: -2 }}>
        {currentCards.map((card) => (
          <Box
            key={card.id}
            sx={{
              px: 2,
              mb: 4,
              width: { xs: '100%', sm: '50%', md: '33.3333%' },
            }}
          >
            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={card.imageUrl}
                  alt={card.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {card.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {card.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Box>
        ))}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 4 }}>
        <Pagination
          count={pageCount}
          page={page}
          onChange={handleChangePage}
          color="primary"
        />
      </Box>
    </Box>
  );
}
