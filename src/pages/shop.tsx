import React, {FC, useState, useEffect} from 'react';
import styled from 'styled-components';

import {Shirt, fetchAvailableShirt} from 'models/shirt';
import Footer from 'components/footer';
import Countdown from './shop/components/countdown';
import BuyComponent from './shop/components/buy';

const ShopPageWrapper: FC = () => {
  const [shirt, setShirt] = useState<Shirt | null>(null);

  useEffect(() => {
    fetchAvailableShirt().then(setShirt);
  }, []);

  if (shirt === null) {
    return <h2>Shirt is not available</h2>;
  } else {
    return <ShopPage shirt={shirt} />;
  }
};

export default ShopPageWrapper;

const ShopPage: FC<{shirt: Shirt}> = ({shirt}) => {
  return (
    <>
      <Container>
        <Image src={shirt.sumbnailUrl} />
        <Name>{shirt.name}</Name>
        <BuyComponent price={shirt.priceYen} />
        <Countdown end={shirt.end} />
      </Container>
      <Footer />
    </>
  );
};

const Container = styled.div`
  width: 90%;
  max-width: 500px;
  min-height: calc(100vh - 30px);
  margin: 0 auto;
  padding-top: 100px;
`;

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
