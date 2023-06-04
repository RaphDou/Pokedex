"use client";

import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { red } from '@mui/material/colors';
import NextLink from 'next/link';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  alignItems: 'flex-start',
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(2),
  '@media all': {
    minHeight: 128,
  },
  backgroundColor: '#ffffff',
  overflow: 'visible',
  border: '8px solid black',
}));

const CircleButton = styled('div')({
  position: 'absolute',
  bottom: '-60px',
  left: '50%',
  transform: 'translateX(-50%)',
  width: 120,
  height: 120,
  borderRadius: '50%',
  border: '8px solid black',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textDecoration: 'none',
  color: 'black', // Couleur du texte noire
  fontSize: '1rem',
  fontWeight: 'bold',
  cursor: 'pointer',
  backgroundColor: 'transparent',
});

const FooterWrapper = styled('div')({
  position: 'fixed',
  bottom: 0,
  left: 0,
  width: '100%',
  height: '128px',
});

export default function MyFooter() {
  return (
    <FooterWrapper>
      <AppBar position="static">
        <StyledToolbar>
          <NextLink href="/" passHref>
            <CircleButton as="a">Accueil</CircleButton>
          </NextLink>
        </StyledToolbar>
      </AppBar>
    </FooterWrapper>
  );
}
