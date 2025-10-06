'use client';
import { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import { useRouter } from 'next/navigation';
import LockIcon from '@mui/icons-material/Lock';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../../lib/AuthContext';
import LoginDialog from './LoginDialog';

export default function MyAppBar() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [loginOpen, setLoginOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography 
            variant="h6" 
            sx={{ 
              flexGrow: 1, 
              cursor: 'pointer',
              '&:hover': { opacity: 0.8 }
            }}
            onClick={() => router.push('/')}
          >
            DimBlog
          </Typography>
          
          {user ? (
            <>
              <Button 
                color="inherit" 
                startIcon={<EditIcon />}
                onClick={() => router.push('/create')}
              >
                New Post
              </Button>
              <Button 
                color="inherit" 
                startIcon={<LogoutIcon />}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <IconButton 
              color="inherit"
              onClick={() => setLoginOpen(true)}
              title="Admin Login"
            >
              <LockIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      <LoginDialog 
        open={loginOpen} 
        onClose={() => setLoginOpen(false)} 
      />
    </>
  );
}
