import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {createGlobalStyle} from 'styled-components';

import TopPage from './pages/top';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Noto Sans JP', sans-serif;
    color: #1B384E;
    letter-spacing: 0;
  }
  * {
    box-sizing: border-box;
  }
  a {
    text-decoration: none;
    outline: none;
    color: #1B384E;
  }
  a: visited {
    color: #1B384E;
  }
  p {
    margin: 0;
    padding: 0;
  }
`;

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route path="/" exact render={() => <TopPage />} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
