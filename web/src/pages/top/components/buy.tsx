import React, {FC, useState} from 'react';
import styled, {keyframes} from 'styled-components';

import {Shirt, buyShirt} from 'models/shirt';

interface Props {
  shirt: Shirt;
}

const Component: FC<Props> = ({shirt}) => {
  const [expand, setExpand] = useState(false);

  return (
    <>
      <BuyButton onClick={() => setExpand(true)}>
        &yen; {shirt.priceYen}
      </BuyButton>
      {expand ? <SizeSelectComponent shirt={shirt} /> : null}
    </>
  );
};

export default Component;

const BuyButton = styled.button`
  display: block;
  vertical-align: top;
  width: 100px;
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

interface SizeSelectProps {
  shirt: Shirt;
}

const SizeSelectComponent: FC<SizeSelectProps> = ({shirt}) => {
  return (
    <SizeSelectContainer>
      {shirt.availableSize.map(size => (
        <SizeSelectButton key={size} onClick={() => buyShirt(shirt.id, size)}>
          {size}
        </SizeSelectButton>
      ))}
    </SizeSelectContainer>
  );
};

const start = keyframes`
  0% {
    transform-origin: 50% 0%;
    transform: scaleY(0)
  }
`;

const SizeSelectContainer = styled.div`
  width: 100%;
  animation: ${start} 0.2s linear;
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
