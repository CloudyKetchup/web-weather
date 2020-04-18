import React from 'react';

import PageBackground from "./components/PageBackground/PageBackground"
import MainBody from "./components/Main/MainBody";

import './App.css';

const App = () =>
(
  <div className="main-container">
    <PageBackground/>
    <MainBody/>
  </div>
);

export default App;
