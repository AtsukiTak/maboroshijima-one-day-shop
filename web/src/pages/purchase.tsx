import React from "react";
import styled from "styled-components";
import { Location } from "history";
import { withRouter } from "react-router-dom";
import { parse } from "query-string";
import { Elements } from "react-stripe-elements";

import { Shirt, ShirtRepository } from "models/shirt";
import InputComponents from "./purchase/components/inputs";

interface Props {
  location: Location;
}

const Page: React.FC<Props> = ({ location }) => {
  const [shirt, setShirt] = React.useState<Shirt | null>(null);

  React.useEffect(() => {
    // ShirtRepository.fetchAvailableOne().then(setShirt);
    ShirtRepository.fetchDemoOneForTesting().then(setShirt);
  }, []);

  if (!shirt) {
    return null;
  }

  const query = parse(location.search);
  const size = query["size"];
  if (typeof size !== "string") {
    return null;
  }

  return (
    <Container>
      <ShirtImage src={shirt.images[1].url} />
      <ShirtName>{`${shirt.name} ( ${size} )`}</ShirtName>
      <ShirtPrice>&yen; {shirt.priceYen}</ShirtPrice>
      <Elements>
        <InputComponents shirt={shirt} size={size} />
      </Elements>
    </Container>
  );
};

export default withRouter(Page);

const Container = styled.div`
  padding: 32px 16px;
`;

const ShirtImage = styled.img`
  display: block;
  width: 50%;
  margin: 30px auto 16px auto;
`;

const ShirtName = styled.h3`
  width: 100%;
  margin: 0;
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  color: #727272;
`;

const ShirtPrice = styled.h2`
  width: 100%;
  margin: 2px 0 0 0;
  text-align: center;
  font-size: 28px;
  font-weight: 600;
  letter-spacing: -0.03rem;
  color: #303030;
`;
