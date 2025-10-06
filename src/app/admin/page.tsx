import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Login from '../components/Login'; // Make sure the path is correct

export default async function Admin() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return <Login />;
  }

  return (
    <div>
      <h1>Admin Page</h1>
      <p>Welcome, you are logged in.</p>
    </div>
  );
}
