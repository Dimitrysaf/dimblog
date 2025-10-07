'use client';
import { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../../lib/AuthContext';
import LoginDialog from './LoginDialog';

export default function MyAppBar() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [loginOpen, setLoginOpen] = useState(false);

  // Konami Code to open login dialog
  useEffect(() => {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let sequence: string[] = [];
    
    const onKeyDown = (event: KeyboardEvent) => {
      sequence.push(event.key);
      
      if (sequence.length > konamiCode.length) {
        sequence.shift();
      }

      if (sequence.join('') === konamiCode.join('')) {
        setLoginOpen(true);
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

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
          ) : null }
        </Toolbar>
      </AppBar>

      <LoginDialog 
        open={loginOpen} 
        onClose={() => setLoginOpen(false)} 
      />
    </>
  );
}
