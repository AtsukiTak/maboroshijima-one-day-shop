import React, { FC } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { pc } from "components/responsive";

const Footer: FC = () => {
  return (
    <Container>
      <LinkItem to="/about">マボロシジマとは</LinkItem>
      <LinkItem to="/boring_stuff/1">プライバシーポリシー</LinkItem>
      <LinkItem to="/boring_stuff/2">
        特定商取引法に
        <br />
        基づく表記
      </LinkItem>
    </Container>
  );
};

export default Footer;

const Container = styled.footer`
  width: 100%;
  height: 30px;
`;

const LinkItem = styled(Link)`
  display: inline-block;
  width: calc(100% / 3);
  font-size: 7px;
  color: #4a4a4a;
  text-align: center;
  text-decoration: underline;

  ${pc(`
    font-size: 10px;
  `)}
`;
