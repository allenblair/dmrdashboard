import React from 'react';
import logo from './logo.svg';
import './App.css';
import FavoriteTGStatus from './Components/FavoriteTGStatus';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          <FavoriteTGStatus />
        </p>        
      </header>
    </div>
  );
}

export default App;
