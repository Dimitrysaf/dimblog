import { Typography, Box } from '@mui/material';
import PostGrid from './components/PostGrid';

export default async function HomePage() {
  return (
    <Box sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Latest Posts
      </Typography>
      <PostGrid />
    </Box>
  );
}
