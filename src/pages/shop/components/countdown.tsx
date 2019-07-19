import React, {FC, useState, useEffect} from 'react';
import styled from 'styled-components';
import moment, {Moment, Duration} from 'moment';

const Countdown: FC<{end: Moment}> = ({end}) => {
  const [remain, setRemain] = useState(duration(end, moment()));

  useEffect(() => {
    const timer = setInterval(() => {
      setRemain(duration(end, moment()));
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, [end, setRemain]);

  const hours = ('0' + remain.hours()).slice(-2);
  const minutes = ('0' + remain.minutes()).slice(-2);
  const seconds = ('0' + remain.seconds()).slice(-2);

  return (
    <Container>
      {hours}:{minutes}:{seconds}
    </Container>
  );
};

export default Countdown;

function duration(end: Moment, start: Moment): Duration {
  const milliSec = end.valueOf() - start.valueOf();
  return moment.duration(milliSec);
}

const Container = styled.h2`
  text-align: center;
  font-family: Silom;
  font-size: 40px;
  color: #4a4a4a;
  letter-spacing: 0;
  margin: 0;
  margin-top: 50px;
`;
