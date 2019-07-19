import React, {FC, useState} from 'react';
import styled from 'styled-components';

interface Props {
  price: number;
}

const BuyComponent: FC<Props> = ({price}) => {
  const [expand, setExpand] = useState(false);

  return (
    <Container>
      <BuyButtonContainer>
        <BuyButton
          show={!expand}
          onClick={() => {
            setExpand(true);
          }}>
          &yen; {price}
        </BuyButton>
      </BuyButtonContainer>
      <OptionContainer>
        <OptionName show={expand}>hoge</OptionName>
      </OptionContainer>
    </Container>
  );
};

export default BuyComponent;

const Container = styled.div`
  position: relative;
`;

const BuyButtonContainer = styled.div`
`;

const BuyButton = styled('button')<{show: boolean}>`
  position: absolute;
  display: block;
  width: 93px;
  margin: 0 auto;
  margin-top: 50px;
  background-color: #4a4a4a;
  border-radius: 4px;
  color: white;
  font-size: 16px;
  text-align: center;
  line-height: 30px;
  opacity: ${props => (props.show ? 1 : 0)};

  transition: all 300ms 0s ease;
`;

const OptionContainer = styled.div`
`;

const OptionName = styled('div')<{show: boolean}>`
  height: ${props => (props.show ? 34 : 0)}px;
  opacity: ${props => (props.show ? 1 : 0)};
  transition: all 300ms 0s ease;
`;
