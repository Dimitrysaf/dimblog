
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  CardActionArea,
  Alert
} from '@mui/material';
import { createClient } from '@/utils/supabase/server';
import InboxIcon from '@mui/icons-material/Inbox';
import Link from 'next/link';

// This interface should match the 'posts' table in your Supabase.
interface Post {
  id: number;
  slug: string;
  title: string;
  content: string;
  image_url: string | null;
  created_at: string;
}

export default async function PostGrid() {
  const supabase = createClient();
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false });

  if (error) {
    return <Alert severity="error">Error fetching posts.</Alert>;
  }

  if (posts.length === 0) {
    return (
      <Box
        sx={{
          mt: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          color: 'text.secondary',
        }}
      >
        <InboxIcon sx={{ fontSize: 60 }} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          No posts yet
        </Typography>
        <Typography>Your first published post will appear here!</Typography>
      </Box>
    );
  }

  return (
      <Grid container spacing={4}>
        {posts.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardActionArea component={Link} href={`/post/${post.slug}`}>
                {post.image_url && (
                  <CardMedia
                    component="img"
                    height="200"
                    image={post.image_url}
                    alt={post.title}
                  />
                )}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" gutterBottom>
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {post.content.substring(0, 150)}...
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
  );
}
