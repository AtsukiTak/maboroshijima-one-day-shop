import React, {FC, useState} from 'react';
import styled, {keyframes} from 'styled-components';

interface Props {
  price: number;
  availableSize: string[];
}

const Component: FC<Props> = ({price, availableSize}) => {
  const [expand, setExpand] = useState(false);

  return (
    <>
      <BuyButton onClick={() => setExpand(true)}>&yen; {price}</BuyButton>
      {expand ? <SizeSelectComponent availableSize={availableSize} /> : null}
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
  availableSize: string[];
}

const SizeSelectComponent: FC<SizeSelectProps> = ({availableSize}) => {
  return (
    <SizeSelectContainer>
      {availableSize.map(size => (
        <SizeSelectButton key={size}>{size}</SizeSelectButton>
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
