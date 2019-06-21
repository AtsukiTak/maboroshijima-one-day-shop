import React, {FC, useState, useCallback} from 'react';
import styled from 'styled-components';

const MAX_MOBILE_WIDTH = 768;
const MIN_PC_WIDTH = 980;

interface ResponsiveProps {
  renderPc: () => React.ReactNode;
  renderTablet: () => React.ReactNode;
  renderMobile: () => React.ReactNode;
}

export const Responsive: FC<ResponsiveProps> = ({
  renderPc,
  renderTablet,
  renderMobile,
}) => {
  const [VW, setVW] = useState(window.innerWidth);

  const ref = useCallback(node => {
    if (node !== null) {
      setVW(node.getBoundingClientRect().width);
    }
  }, []);

  console.log(VW);

  return (
    <View ref={ref}>
      {VW < MAX_MOBILE_WIDTH
        ? renderMobile()
        : VW < MIN_PC_WIDTH
        ? renderTablet()
        : renderPc()}
    </View>
  );
};

export default Responsive;

const View = styled.div`
  width: 100vw;
  height: 100vh;
`;
