import React from 'react';
import styled from 'styled-components';

import {pc} from 'components/responsive';

const SizeTablePage: React.FC = () => {
  return (
    <Table>
      <THead>
        <TR>
          <TH>サイズ(cm)</TH>
          <TH>身幅</TH>
          <TH>肩幅</TH>
          <TH>身丈</TH>
          <TH>袖丈</TH>
        </TR>
      </THead>
      <TBody>
        <TR>
          <TD>S</TD>
          <TD>49</TD>
          <TD>44</TD>
          <TD>66</TD>
          <TD>19</TD>
        </TR>
        <TR>
          <TD>M</TD>
          <TD>52</TD>
          <TD>47</TD>
          <TD>70</TD>
          <TD>20</TD>
        </TR>
        <TR>
          <TD>L</TD>
          <TD>55</TD>
          <TD>50</TD>
          <TD>74</TD>
          <TD>22</TD>
        </TR>
        <TR>
          <TD>XL</TD>
          <TD>58</TD>
          <TD>53</TD>
          <TD>78</TD>
          <TD>24</TD>
        </TR>
      </TBody>
    </Table>
  );
};

export default SizeTablePage;

const Table = styled.table`
  margin: 30vh auto 0 auto;
  table-layout: fixed;
`;

const THead = styled.thead``;

const TBody = styled.tbody``;

const TR = styled.tr``;

const TH = styled.th``;

const TD = styled.td`
  text-align: center;
  padding: 10px 20px;

  ${pc(`
    padding: 20px 40px;
  `)}
`;
