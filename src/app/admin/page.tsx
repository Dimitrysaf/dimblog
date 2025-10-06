import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import Login from '../components/Login'
import { Button, Box, Typography, Container } from '@mui/material'

export const dynamic = 'force-dynamic'

export default async function Admin() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return <Login />
  }

  const handleSignOut = async () => {
    'use server'
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    await supabase.auth.signOut()
    return redirect('/')
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Box 
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: { sm: 'space-between' },
          alignItems: 'flex-start',
        }}
      >
        <Typography variant="h1" component="h1" sx={{ fontSize: '2.5rem', mb: { xs: 2, sm: 0 } }}>
          Πίνακας Ελέγχου
        </Typography>
        <Box sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
          <Typography sx={{ mb: 1 }}>
            {user.email}
          </Typography>
          <form action={handleSignOut}>
            <Button type="submit" variant="contained">
              Αποσύνδεση
            </Button>
          </form>
        </Box>
      </Box>
    </Container>
  )
}
