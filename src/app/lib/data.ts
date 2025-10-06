import { supabase } from './supabaseClient';

/**
 * Fetches the 10 most recent published posts from the 'posts' table in Supabase.
 * 
 * @returns {Promise<any[]>} A promise that resolves to an array of posts.
 */
export async function getPublicPosts() {
  const { data: posts, error } = await supabase
    .from('posts')
    .select('id, title, slug, summary, created_at, image_url, profiles(full_name)')
    .eq('status', 'published')
    .order('created_at', { ascending: false })
    .limit(10);

  if (error) {
    console.error('Error fetching published posts:', error);
    return []; 
  }
  
  return posts;
}
