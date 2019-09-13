import React, { FC, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { Shirt } from "models/shirt";

interface Props {
  shirt: Shirt;
}

const Component: FC<Props> = ({ shirt }) => {
  const [expand, setExpand] = useState(false);
  const [processing, setProcessing] = useState(false);

  return (
    <>
      <BuyButton onClick={() => setExpand(!expand)}>
        &yen; {shirt.priceYen} で購入
      </BuyButton>
      <PriceMsg>価格は税込、送料無料です</PriceMsg>
      <SizeSelectContainer show={expand}>
        <SelectSizeMsg>
          {processing ? "お待ちください" : "サイズを選択してください"}
        </SelectSizeMsg>
        {shirt.availableSize.map(size =>
          processing ? (
            <SizeSelectButton key={size} disabled>
              ...
            </SizeSelectButton>
          ) : (
            <SizeSelectButton
              key={size}
              onClick={() => {
                setProcessing(true);
                shirt.buy(size);
              }}
            >
              {size}
            </SizeSelectButton>
          )
        )}
        <LinkToSizeTable to="/size_table" target="_blank">
          サイズ表を確認する
        </LinkToSizeTable>
      </SizeSelectContainer>
    </>
  );
};

export default Component;

const BuyButton = styled.button`
  display: block;
  vertical-align: top;
  width: 150px;
  margin: 0 auto;
  margin-top: 40px;
  background-color: #4a4a4a;
  border-radius: 4px;
  color: white;
  font-size: 16px;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
`;

const PriceMsg = styled.p`
  width: 200px;
  margin: 15px auto 0 auto;
  font-size: 12px;
  text-align: center;
  color: gray;
`;

const SizeSelectContainer = styled("div")<{ show: boolean }>`
  width: 100%;
  height: ${props => (props.show ? "inherit" : 0)};
  transform: ${props => (props.show ? "scaleY(1)" : "scaleY(0)")};
  transition: all 200ms 0s ease-out;
`;

const SelectSizeMsg = styled.p`
  width: 100%;
  margin: 0;
  padding: 0;
  padding-top: 50px;
  text-align: center;
  font-size: 16px;
`;

const SizeSelectButton = styled.button`
  display: block;
  vertical-align: top;
  width: 60px;
  margin: 0 auto;
  margin-top: 20px;
  background-color: #4a4a4a;
  border-radius: 4px;
  color: white;
  font-size: 16px;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
`;

const LinkToSizeTable = styled(Link)`
  display: block;
  width: 100%;
  margin-top: 30px;
  text-align: center;
  text-decoration: underline;
  font-size: 12px;
`;
