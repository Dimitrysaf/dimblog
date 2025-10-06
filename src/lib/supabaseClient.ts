import { createClient } from '@supabase/supabase-js';

// Safely read environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables! Check your .env file');
}

// Create and export the Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);
