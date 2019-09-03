import React, {FC, useState, useEffect} from 'react';
import styled from 'styled-components';
import ReactGA from 'react-ga';

import {Shirt, fetchAvailableShirt, createDemoShirt} from 'models/shirt';
import Footer from 'components/footer';
import {FloatingLogo} from 'components/logo';
import Countdown from './top/components/countdown';
import BuyComponent from './top/components/buy';

const TopPage: FC = () => {
  const [shirt, setShirt] = useState<Shirt | null>(null);

  useEffect(() => {
    fetchAvailableShirt().then(setShirt);

    // 開発用にデモのTシャツを設定する場合は以下のコメントアウトを消し、
    // demoShirtSumbnailUrl を設定する。
    // また、↑をコメントアウトするのも忘れない。
    /*
    const demoShirtSumbnailUrl ='';
    setShirt(createDemoShirt(demoShirtSumbnailUrl));
     */
  }, []);

  if (shirt) {
    return <Shop shirt={shirt} />;
  } else {
    return <EmptyShop />;
  }
};

export default TopPage;

const EmptyShop: FC = () => {
  useEffect(() => {
    ReactGA.pageview('/', [], 'Empty Shop');
  }, []);
  return (
    <>
      <UnavailableContainer>
        <FloatingLogo />
      </UnavailableContainer>
      <Footer />
    </>
  );
};

const UnavailableContainer = styled.div`
  width: 90%;
  max-width: 500px;
  height: calc(100vh - 30px);
  margin: 0 auto;
  padding-top: 40vh;
`;

const Shop: FC<{shirt: Shirt}> = ({shirt}) => {
  useEffect(() => {
    ReactGA.pageview('/', [], 'Shop');
  }, []);

  return (
    <>
      <ShopContainer>
        <Image src={shirt.sumbnail} />
        <Name>{shirt.name}</Name>
        <BuyComponent shirt={shirt} />
        <Countdown end={shirt.end} />
      </ShopContainer>
      <Footer />
    </>
  );
};

const ShopContainer = styled.div`
  width: 90%;
  max-width: 500px;
  min-height: calc(100vh - 50px);
  margin: 0 auto;
  padding-top: 10vh;
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
