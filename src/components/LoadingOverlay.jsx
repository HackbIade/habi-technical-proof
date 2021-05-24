/* eslint-disable react/prop-types */
import React from 'react';
import { Code } from 'react-content-loader';

const CustomLoadingOverlay = (props) => {
  const { active, children } = props;
  return active ? <Code>{children}</Code> : <>{children}</>;
};

export default CustomLoadingOverlay;
