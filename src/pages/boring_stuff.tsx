import React, {FC, useState, useEffect} from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';

interface BoringStuffProps {
  textLink: string;
}

const BoringStuff: FC<BoringStuffProps> = ({textLink}) => {
  const [text, setText] = useState('');

  useEffect(() => {
    fetch(textLink)
      .then(res => res.text())
      .then(text => setText(text));
  }, [textLink]);

  const Container = styled.div`
    width: 80%;
    max-width: 980px;
    margin: 50px auto;
    font-size: 14px;
    line-height: 2;
  `;

  return (
    <Container>
      <ReactMarkdown source={text} />
    </Container>
  );
};

export default BoringStuff;
