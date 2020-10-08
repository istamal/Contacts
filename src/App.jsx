import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
} from 'react-router-dom';
import './App.scss';
import 'antd/dist/antd.css';
import styled from 'styled-components';
import PrivateRoute from './Components/PrivateRoute';
import Contacts from './Components/Contacts';
import Login from './Components/Login';

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  padding-top: 30px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
`;

function App() {
  return (
    <Wrapper>
      <Router>
        <PrivateRoute exact path="/" component={Contacts} />
        <Route path="/login" component={Login} />
      </Router>
    </Wrapper>
  );
}

export default App;
