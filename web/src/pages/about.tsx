import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

import {pc} from 'components/responsive';

const AboutPage: React.FC = () => {
  return (
    <>
      <Contents>
        <Subject>What is マボロシジマ？</Subject>
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

const Subject = styled.h2`
  width: 100%;
  margin: 0;
  padding: 10vh 0px;
  text-align: center;
  font-size: 18px;
  font-weight: 400;

  ${pc(`
    font-size: 22px;
  `)}
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
