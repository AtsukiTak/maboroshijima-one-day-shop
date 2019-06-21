import React, {FC} from 'react';
import styled, {keyframes} from 'styled-components';

import Responsive from 'components/responsive';
import * as Footer from 'components/footer';

const TopPage: FC = () => {
  return (
    <Responsive
      renderPc={() => (
        <>
          <Contents>
            <LogoBig src="/img/logo.png" />
          </Contents>
          <Footer.Pc />
        </>
      )}
      renderTablet={() => (
        <>
          <Contents>
            <Logo src="/img/logo.png" />
          </Contents>
          <Footer.Tablet />
        </>
      )}
      renderMobile={() => (
        <>
          <Contents>
            <Logo src="/img/logo.png" />
          </Contents>
          <Footer.Mobile />
        </>
      )}
    />
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
`;

const LogoBig = styled(Logo)`
  width: 150px;
  height: 150px;
`;
