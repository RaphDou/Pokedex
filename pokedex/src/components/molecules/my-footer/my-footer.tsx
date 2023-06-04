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

const FooterWrapper = styled('div')({
  bottom: 0,
  left: 0,
  width: '100%',
});

export default function MyFooter() {
  return (
    <FooterWrapper>
      <AppBar position="static">
        <StyledToolbar></StyledToolbar>
      </AppBar>
    </FooterWrapper>
  );
}
