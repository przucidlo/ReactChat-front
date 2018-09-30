import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Chat from './App'

ReactDOM.render(<Chat/>,document.getElementById('root'));
registerServiceWorker();
