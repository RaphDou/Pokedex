"use client";


import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";



const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  alignItems: "flex-start",
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(2),
  "@media all": {
    minHeight: 128,
  },
  backgroundColor: "#ffffff",
  overflow: "visible",
  border: "8px solid black",
}));


