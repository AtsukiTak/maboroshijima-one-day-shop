import React, {FC} from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

export const Pc: FC = () => {
  const Container = styled.footer`
    width: 100vw;
    height: 15px;
  `;

  const InnerContainer = styled.div`
    width: 600px;
    margin: 0 auto;
  `;

  const LinkItem = styled(Link)`
    display: inline-block;
    width: 300px;
    font-family: Helvetica-Light;
    font-size: 10px;
    color: #4a4a4a;
    text-align: center;
  `;

  return (
    <Container>
      <InnerContainer>
        <LinkItem to="/boring_stuff_1">プライバシーポリシー</LinkItem>
        <LinkItem to="/boring_stuff_2">特定商取引法に基づく表記</LinkItem>
      </InnerContainer>
    </Container>
  );
};

export const Mobile: FC = () => {
  const Container = styled.footer`
    width: 100vw;
    height: 30px;
  `;

  const LinkItem = styled(Link)`
    display: inline-block;
    width: 50%;
    font-family: Helvetica-Light;
    font-size: 7px;
    color: #4a4a4a;
    text-align: center;
  `;

  return (
    <Container>
      <LinkItem to="/boring_stuff/1">プライバシーポリシー</LinkItem>
      <LinkItem to="/boring_stuff/2">特定商取引法に基づく表記</LinkItem>
    </Container>
  );
};

export const Tablet = Mobile;
