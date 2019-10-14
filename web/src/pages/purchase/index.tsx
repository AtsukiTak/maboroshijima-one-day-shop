import React from "react";
import styled from "styled-components";
import { Location } from "history";
import { withRouter } from "react-router-dom";
import { parse } from "query-string";
import { Elements } from "react-stripe-elements";
import Container from "@material-ui/core/Container";
import Fade from "@material-ui/core/Fade";

import { Shirt, ShirtRepository } from "models/shirt";
import InputComponents from "./components/inputs";

interface Props {
  location: Location;
}

const Page: React.FC<Props> = ({ location }) => {
  const [shirt, setShirt] = React.useState<Shirt | null>(null);

  React.useEffect(() => {
    ShirtRepository.fetchAvailableOne().then(setShirt);
    // ShirtRepository.fetchDemoOneForTesting().then(setShirt);
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
    <Fade in timeout={2000}>
      <Container>
        <ShirtImage src={shirt.images[0].url} />
        <ShirtName>{`${shirt.name} ( ${size} )`}</ShirtName>
        <ShirtPrice>&yen; {shirt.priceYen}</ShirtPrice>
        <Elements>
          <InputComponents shirt={shirt} size={size} />
        </Elements>
      </Container>
    </Fade>
  );
};

export default withRouter(Page);

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
