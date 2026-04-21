import React from 'react'
import ReactDOM from 'react-dom/client'
import BadgerApp from './components/structural/MediaApp.jsx';

import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import MediaApp from './components/structural/MediaApp.jsx';
import { HashRouter } from 'react-router';

ReactDOM.createRoot(document.getElementById('root')).render(
  <HashRouter><MediaApp /></HashRouter>
  
)
