import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";

import { Shirt } from "models/shirt";

interface Props {
  shirt: Shirt;
}

const Component: React.FC<Props> = ({ shirt }) => {
  return (
    <>
      <ButtonContainer>
        <ButtonGroup fullWidth>
          {shirt.availableSize.map(size => (
            <Button size="small" key={size} href={`/purchase?size=${size}`}>
              {size}
            </Button>
          ))}
        </ButtonGroup>
      </ButtonContainer>
      <LinkToSizeTable to="/size_table" target="_blank">
        サイズ表を確認する
      </LinkToSizeTable>
      <Msg> * 送料は無料です</Msg>
    </>
  );
};

export default Component;

const ButtonContainer = styled.div`
  display: block;
  width: 100%;
  margin: 40px auto 0 auto;
  padding: 0 50px;
`;

const Msg = styled.p`
  width: 200px;
  margin: 15px auto 0 auto;
  font-size: 12px;
  text-align: center;
  color: gray;
`;

const LinkToSizeTable = styled(Link)`
  display: block;
  width: 100%;
  margin-top: 30px;
  text-align: center;
  text-decoration: underline;
  font-size: 12px;
`;
