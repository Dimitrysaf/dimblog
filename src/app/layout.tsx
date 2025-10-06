'use client';
import React from 'react';
import { Inter } from "next/font/google";
import "./globals.css";
import SearchAppBar from "./components/AppBar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from "@mui/material/colors";
import useMediaQuery from '@mui/material/useMediaQuery';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
          primary: {
            main: grey[800],
          },
        },
      }),
    [prefersDarkMode],
  );

  return (
    <html lang="el">
      <body className={inter.className}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <SearchAppBar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
