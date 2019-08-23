import React from 'react';
import styled, {keyframes} from 'styled-components';

import {pc} from 'components/responsive';

export const FloatingLogo: React.FC = () => {
  return <FloatingLogoInner src="/img/logo.png" />;
};

const floating = keyframes`
  50% {
    transform: translateY(-20px);
  }
`;

const FloatingLogoInner = styled.img`
  display: block;
  width: 100px;
  height: 100px;
  margin: 0 auto;
  animation: ${floating} 3s linear infinite;

  ${pc(`
    width: 150px;
    height: 150px;
  `)}
`;
