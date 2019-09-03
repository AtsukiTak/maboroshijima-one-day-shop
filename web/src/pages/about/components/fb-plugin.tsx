import React from "react";
import styled from "styled-components";

declare const FB: any;

export default () => {
  React.useEffect(() => {
    if (FB) {
      FB.XFBML.parse();
    }
  });

  return (
    <Container>
      <div
        className="fb-page"
        data-href="https://www.facebook.com/&#x30de;&#x30dc;&#x30ed;&#x30b7;&#x30b8;&#x30de;-111050823595168/"
        data-tabs=""
        data-width="300"
        data-height="130"
        data-small-header="false"
        data-adapt-container-width="true"
        data-hide-cover="false"
        data-show-facepile="false"
        data-hide-cta="true"
      />
    </Container>
  );
};

const Container = styled.div`
  width: 300px;
  height: 130px;
  margin: 30px auto 0 auto;
`;
