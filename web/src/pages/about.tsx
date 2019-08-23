import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import ReactGA from 'react-ga';

import {pc} from 'components/responsive';
import {FloatingLogo} from 'components/logo';

const AboutPage: React.FC = () => {
  React.useEffect(() => {
    ReactGA.pageview('/about', [], 'About');
  }, []);

  return (
    <>
      <Contents>
        <LogoContainer>
          <FloatingLogo />
        </LogoContainer>
        <Msg>マボロシジマはTシャツ屋さんです</Msg>
        <Msg>１週間に1日だけ、その日限定のTシャツを販売します</Msg>
        <LinkToShop to="/">ショップへ</LinkToShop>
      </Contents>
    </>
  );
};

export default AboutPage;

const Contents = styled.div`
  width: 90%;
  max-width: 500px;
  min-height: calc(100vh - 30px);
  margin: 0 auto;
  padding-top: 10vh;
`;

const LogoContainer = styled.div`
  padding: 15vh 0px 5vh 0px;
`;

const Msg = styled.p`
  width: 100%;
  margin: 0;
  padding: 3vh 0;
  text-align: center;
  font-size: 13px;
  font-weight: 400;

  ${pc(`
    font-size: 18px;
  `)}
`;

const LinkToShop = styled(Link)`
  display: block;
  width: 100%;
  margin-top: 20vh;
  text-decoration: underline;
  font-size: 15px;
  text-align: center;
`;
