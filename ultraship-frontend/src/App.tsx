import React from 'react';
import './App.css';
import { Navbar } from './components/Navbar';
import { Employees } from './components/Employees';

function App() {
  return (
    <div className="App">
      <Navbar />
      <main className="main-content">
        <Employees />
      </main>
    </div>
  );
}

export default App;
