import React from 'react';
import logo from './logo.svg';
import './bootstrap.min.css';
import './App.css';
import FavoriteTGStatus from './Components/FavoriteTGStatus';
import { Container } from 'reactstrap';

function App() {
  return (
    <div className="App">
      <Container>
        <h1 className="text-center">DMR Dashboard</h1>
        <FavoriteTGStatus />
      </Container>
    </div>
  );
}

export default App;
