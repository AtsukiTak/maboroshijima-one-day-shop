import styled, {keyframes} from 'styled-components';

import {pc} from 'components/responsive';

const floating = keyframes`
  50% {
    transform: translateY(-20px);
  }
`;

export const FloatingLogo = styled.img`
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
