import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './AppHeader';
import List from './List';
import './App.css';


function App() {
  function showToast(message: string, type?: string) {
    type === 'error' ? toast.error(message) : toast(message);
  }

  return (
    <div id="App">
      <Header />
      <List onToast={showToast} />
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default App;
