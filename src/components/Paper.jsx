import * as React from 'react';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

// Create a function to generate dynamic styles
const generateStyles = ({ theme, width, height, marginTop,justifyContent, borderRadius,marginLeft,minWidth,maxWidth }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  width: width,
  minWidth:minWidth,
  maxWidth:maxWidth,
  justifyContent:justifyContent,
  height: height,
  marginTop: marginTop,
  borderRadius: borderRadius,
  marginLeft:marginLeft,
});

// Pass the `theme` prop to the `generateStyles` function
const Item = styled(Paper)(({ theme, ...props }) => generateStyles({ theme, ...props }));

export default function CustomizedItem({ children,elevation, ...customStyles }) {
  return (
    <Item elevation={elevation||24} {...customStyles}>
      {children}
    </Item>
  );
}
