"use client";

import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

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
  left: '50%',
  transform: 'translateX(-50%)',
  width: 120,
  height: 120,
  borderRadius: '50%',
  border: '8px solid black',
  display: 'flex',
  justifyContent: 'center',
  backgroundColor: 'transparent',
});

const FooterWrapper = styled('div')({
  position: 'fixed',
  bottom: 0,
  left: 0,
  width: '100%',
});

export default function MyFooter() {
  return (
    <FooterWrapper>
      <AppBar position="static">
        <StyledToolbar>
          <CircleButton></CircleButton>
        </StyledToolbar>
      </AppBar>
    </FooterWrapper>
  );
}
