import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {createGlobalStyle} from 'styled-components';

import {Responsive} from 'components/responsive';
import TopPage from './pages/top';
import BoringStuff from './pages/boring_stuff';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <Responsive>
        <Router>
          <Switch>
            <Route path="/" exact render={() => <TopPage />} />
            <Route
              path="/boring_stuff/1"
              exact
              render={() => <BoringStuff textLink="/boring_txt/1.txt" />}
            />
            <Route
              path="/boring_stuff/2"
              exact
              render={() => <BoringStuff textLink="/boring_txt/2.txt" />}
            />
          </Switch>
        </Router>
      </Responsive>
    </>
  );
};

export default App;

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
