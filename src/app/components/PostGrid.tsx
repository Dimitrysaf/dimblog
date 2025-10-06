import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Box,
} from '@mui/material';
import { getPublicPosts } from '../lib/data';
import InboxIcon from '@mui/icons-material/Inbox';

interface Post {
  id: number;
  title: string;
  summary: string;
  image_url: string;
}

export default async function PostGrid() {
  const posts = await getPublicPosts();

  if (posts.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '50vh', // Adjust height as needed
          textAlign: 'center',
          mt: 4,
        }}
      >
        <InboxIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h5" component="div" gutterBottom>
          Δεν υπάρχουν ακόμη αναρτήσεις
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Ελέγξτε αργότερα για νέο περιεχόμενο.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, mt: 4 }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', mx: -2 }}>
        {posts.map((post: Post) => (
          <Box
            key={post.id}
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
                  image={post.image_url} // Use the image_url from the database
                  alt={post.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {post.summary}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
