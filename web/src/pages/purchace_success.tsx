import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

import {MaxTabletWidth} from 'components/responsive';
import {FloatingLogo} from 'components/logo';

const PurchaceSuccessPage: React.FC = () => {
  return (
    <Container>
      <FloatingLogo src="/img/logo.png" />
      <Msg>ご注文ありがとうございます</Msg>
      <SubMsg>
        指定されたアドレス宛に領収書を送信しましたのでご確認ください
      </SubMsg>
      <LinkTop to="/">トップページへ</LinkTop>
    </Container>
  );
};

export default PurchaceSuccessPage;

const Container = styled.div`
  width: 90%;
  max-width: ${MaxTabletWidth}px;
  margin: 0 auto;
  padding-top: 30vh;
`;

const Msg = styled.p`
  font-size: 22px;
  color: #4a4a4a;
  text-align: center;
  margin-top: 50px;
`;

const SubMsg = styled.p`
  size: 22px;
  color: #4a4a4a;
  text-align: center;
  margin-top: 35px;
`;

const LinkTop = styled(Link)`
  display: block;
  width: 100%;
  margin-top: 50px;
  text-align: right;
  text-decoration: underline;
`;
