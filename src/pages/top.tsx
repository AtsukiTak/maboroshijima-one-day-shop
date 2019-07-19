import React, {FC} from 'react';
import styled, {keyframes} from 'styled-components';

import {pc} from 'components/responsive';
import Footer from 'components/footer';

const TopPage: FC = () => {
  return (
    <>
      <Contents>
        <Logo src="/img/logo.png" />
      </Contents>
      <Footer />
    </>
  );
};

export default TopPage;

const Contents = styled.div`
  height: calc(100vh - 30px);
  padding-top: 40vh;
`;

const rotate = keyframes`
  50% {
    transform: translateY(-20px);
  }
`;

const Logo = styled.img`
  display: block;
  width: 100px;
  height: 100px;
  margin: 0 auto;
  animation: ${rotate} 3s linear infinite;

  ${pc(`
    width: 150px;
    height: 150px;
  `)}
`;
