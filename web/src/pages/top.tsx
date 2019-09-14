import React, { FC, useState, useEffect } from "react";
import styled from "styled-components";
import ReactGA from "react-ga";

import { Shirt, ShirtRepository } from "models/shirt";
import Footer from "components/footer";
import { FloatingLogo } from "components/logo";
import Countdown from "./top/components/countdown";
import BuyComponent from "./top/components/buy";

const TopPage: FC = () => {
  const [shirt, setShirt] = useState<Shirt | null>(null);

  useEffect(() => {
    // ShirtRepository.fetchAvailableOne().then(setShirt);

    // 開発用に次に販売するシャツのデータを取得する。
    // ↑をコメントアウトするのを忘れない。
    ShirtRepository.fetchDemoOneForTesting().then(setShirt);
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
    ReactGA.pageview("/", [], "Empty Shop");
  }, []);
  return (
    <>
      <UnavailableContainer>
        <FloatingLogo />
        <SoldOut>Sorry, sold out</SoldOut>
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

const SoldOut = styled.p`
  width: 100%;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`;

const Shop: FC<{ shirt: Shirt }> = ({ shirt }) => {
  useEffect(() => {
    ReactGA.pageview("/", [], "Shop");
  }, []);

  return (
    <>
      <ShopContainer>
        <ImageComponent src={shirt.images[0].url} />
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

const ImageComponent = styled.img`
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
