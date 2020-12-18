import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './AppHeader';
import List from './List';
import './App.css';


function App() {
  return (
    <div id="App">
      <Header />
      <List />
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default App;
