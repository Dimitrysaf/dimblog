import { createClient } from '@/utils/supabase/server';
import {
  Container,
  Typography,
  Box,
  CardMedia,
  Paper,
} from '@mui/material';
import { notFound } from 'next/navigation';

// Define the Post type, mirroring your database structure
interface Post {
  id: number;
  slug: string;
  title: string;
  content: string;
  image_url: string | null;
  created_at: string;
}

// Props interface for the page
interface PostPageProps {
  params: {
    slug: string;
  };
}

// The component is now async
export default async function PostPage({ params }: PostPageProps) {
  // Create a new Supabase client for this server-side request
  const supabase = createClient();
  const { slug } = params;

  // Fetch the post directly on the server
  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single();

  // If there's an error or no post is found, show the not-found page
  if (error || !post) {
    notFound();
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: { xs: 2, md: 4 } }}>
        <Typography variant="h3" component="h1" gutterBottom>
          {post.title}
        </Typography>
        
        {post.image_url && (
          <CardMedia
            component="img"
            image={post.image_url}
            alt={post.title}
            sx={{ maxHeight: '500px', borderRadius: 1, mb: 3 }}
          />
        )}

        <Box sx={{ 
          mt: 2,
          '& p': { mb: 2, lineHeight: 1.7 },
          '& h5': { mt: 3, mb: 1 },
          whiteSpace: 'pre-wrap', // This will respect newlines and spaces
          wordWrap: 'break-word',
        }}>
          <Typography variant="body1" component="div">
            {post.content}
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
