'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '../../../lib/supabaseClient';
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  CardMedia,
  Paper,
  Alert,
} from '@mui/material';

// Define the Post type, mirroring your database structure
interface Post {
  id: number;
  slug: string;
  title: string;
  content: string;
  image_url: string | null;
  created_at: string;
}

export default function PostPage() {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const params = useParams();
  const slug = params.slug as string;

  useEffect(() => {
    if (!slug) return;

    const fetchPost = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('slug', slug)
          .single(); // .single() fetches a single record, or null if not found

        if (error) {
          // Throws an error if more than one row is found, which is good for slugs
          throw new Error(`Post with slug '${slug}' not found.`);
        }

        if (!data) {
          throw new Error(`Post with slug '${slug}' not found.`);
        }

        setPost(data);
      } catch (err: unknown) {
        setError((err as Error).message || 'An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, textAlign: 'center' }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!post) {
    return null; // Should be handled by the error state
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
