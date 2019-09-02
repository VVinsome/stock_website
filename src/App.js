import React from 'react';
import logo from './logo.svg';
import './App.css';
import StockApp from './components/StockApp';
import { Container } from 'semantic-ui-react';

function App() {
  return (
    <Container>

      <StockApp/>
    </Container>
  );
}

export default App;
