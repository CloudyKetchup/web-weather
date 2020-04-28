import React from 'react';

import PageBackground from "./components/PageBackground/PageBackground"
import MainBody from "./components/Main/MainBody";

import { AccountProvider } from "./context/AccountContext";

import './App.css';

const App = () => (
	<div className="main-container">
  	<PageBackground/>
		<AccountProvider>
		  	<MainBody/>
		</AccountProvider>
	</div>
);

export default App;