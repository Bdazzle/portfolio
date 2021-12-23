import React from 'react';
import ReactDOM from 'react-dom';
import { Portfolio } from './Portfolio';
import reportWebVitals from './reportWebVitals';
import { PortfolioProvider } from './PortfolioContext'

ReactDOM.render(
  <React.StrictMode>
    <PortfolioProvider>
      <Portfolio />
    </PortfolioProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
