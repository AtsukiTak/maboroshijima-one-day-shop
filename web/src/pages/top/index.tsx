import React, { FC, useState, useEffect } from "react";
import styled from "styled-components";
import ReactGA from "react-ga";
import Fade from "@material-ui/core/Fade";
import Container from "@material-ui/core/Container";

import { Shirt, ShirtRepository } from "models/shirt";
import Footer from "components/footer";
import { FloatingLogo } from "components/logo";

import Countdown from "./components/countdown";
import BuyComponent from "./components/buy";
import ImageComponent from "./components/image";

const TopPage: FC = () => {
  const [shirt, setShirt] = useState<Shirt | null | "Checking">("Checking");

  useEffect(() => {
    ShirtRepository.fetchAvailableOne().then(setShirt);
    // ShirtRepository.fetchDemoOneForTesting().then(setShirt);
  }, []);

  if (shirt === "Checking") {
    return <CheckingShop />;
  } else if (shirt === null) {
    return <EmptyShop />;
  } else {
    return <Shop shirt={shirt} />;
  }
};

export default TopPage;

const CheckingShop: FC = () => {
  return (
    <Fade in timeout={500}>
      <Container>
        <UnavailableContainer>
          <FloatingLogo />
          <Message>Loading...</Message>
        </UnavailableContainer>
        <Footer />
      </Container>
    </Fade>
  );
};

const EmptyShop: FC = () => {
  useEffect(() => {
    ReactGA.pageview("/", [], "Empty Shop");
  }, []);
  return (
    <Fade in timeout={3000}>
      <Container>
        <UnavailableContainer>
          <FloatingLogo />
          <Message>Sorry, sold out</Message>
        </UnavailableContainer>
        <Footer />
      </Container>
    </Fade>
  );
};

const UnavailableContainer = styled.div`
  width: 90%;
  max-width: 500px;
  height: calc(100vh - 30px);
  margin: 0 auto;
  padding-top: 40vh;
`;

const Message = styled.p`
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
    <Fade in timeout={3000}>
      <Container>
        <ShopContainer>
          <ImageComponent images={shirt.images} />
          <Name>{shirt.name}</Name>
          <Price>
            &yen; {shirt.priceYen}
            <TaxMsg>(税込)</TaxMsg>
          </Price>
          <BuyComponent shirt={shirt} />
          <Countdown end={shirt.end} />
        </ShopContainer>
        <Footer />
      </Container>
    </Fade>
  );
};

const ShopContainer = styled.div`
  width: 100%;
  padding-top: 10vh;
`;

const Name = styled.h3`
  margin: 0;
  padding: 0;
  text-align: center;
  margin-top: 50px;
`;

const Price = styled.h3`
  margin: 0;
  padding: 0;
  margin-top: 10px;
  text-align: center;
  font-size: 1.4rem;
  font-weight: normal;
`;

const TaxMsg = styled.span`
  margin-left: 4px;
  font-size: 0.7rem;
`;
