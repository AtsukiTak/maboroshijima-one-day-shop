import React from "react";
import styled from "styled-components";

import { Image } from "models/image";

interface Props {
  images: Image[];
}

export default ({ images }: Props) => {
  const [selectedImage, setSelectedImage] = React.useState(images[0]);

  return (
    <Container>
      <MainImage src={selectedImage.url} />
      <SubImageList>
        {images.map(image => (
          <SubImage
            key={image.url}
            src={image.url}
            selected={image === selectedImage}
            onClick={() => setSelectedImage(image)}
          />
        ))}
      </SubImageList>
    </Container>
  );
};

const Container = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const MainImage = styled.img`
  display: block;
  width: 100%;
`;

const SubImageList = styled.div`
  width: 100%;
  overflow: scroll;
  white-space: nowrap;
`;

const SubImage = styled("img")<{ selected: boolean }>`
  display: inline-block;
  width: 30%;
  max-width: 80px;
  margin: 30px 0 0 20px;
  border-radius: 4px;

  ${props => props.selected ? "border: 1px solid lightgray;" : null}

  &:first-of-type {
    margin-left: 0;
  }
`;
