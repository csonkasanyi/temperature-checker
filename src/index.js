import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Table from './components/table/Table';
import Nav from './components/nav/Nav'
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GridComponent from './components/grid/GridComponent';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Nav />
      <Routes>
        <Route path='/' element={<App />}></Route>
        <Route path='/list' element={<GridComponent />}></Route>
        <Route path='/update' element={<Table />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);