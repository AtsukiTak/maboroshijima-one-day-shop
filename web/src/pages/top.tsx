import React, {FC, useState, useEffect} from 'react';
import styled, {keyframes} from 'styled-components';

import {Shirt, fetchAvailableShirt} from 'models/shirt';
import Footer from 'components/footer';
import {pc} from 'components/responsive';
import Countdown from './top/components/countdown';
import BuyComponent from './top/components/buy';

const TopPage: FC = () => {
  const [shirt, setShirt] = useState<Shirt | null>(null);

  useEffect(() => {
    fetchAvailableShirt().then(setShirt);
  }, []);

  return (
    <>
      <Container>
        {shirt === null ? (
          <UnavailebleContent />
        ) : (
          <ShopContent shirt={shirt} />
        )}
      </Container>
      <Footer />
    </>
  );
};

export default TopPage;

const Container = styled.div`
  width: 90%;
  max-width: 500px;
  min-height: calc(100vh - 30px);
  margin: 0 auto;
  padding-top: 100px;
`;

const UnavailebleContent: FC = () => {
  return <FloatingLogo src="/img/logo.png" />;
};

const floating = keyframes`
  50% {
    transform: translateY(-20px);
  }
`;

const FloatingLogo = styled.img`
  display: block;
  width: 100px;
  height: 100px;
  margin: 0 auto;
  margin-top: 40vh;
  animation: ${floating} 3s linear infinite;

  ${pc(`
    width: 150px;
    height: 150px;
  `)}
`;

const ShopContent: FC<{shirt: Shirt}> = ({shirt}) => {
  return (
    <>
      <Image src={shirt.sumbnail} />
      <Name>{shirt.name}</Name>
      <BuyComponent
        shirt={shirt}
      />
      <Countdown end={shirt.end} />
    </>
  );
};

const Image = styled.img`
  display: block;
  width: 80%;
  margin: 0 auto;
`;

const Name = styled.h3`
  margin: 0;
  padding: 0;
  text-align: center;
  margin-top: 50px;
`;
