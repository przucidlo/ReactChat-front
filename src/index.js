import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import FrontPage from './frontpage/FrontPage'

ReactDOM.render(<FrontPage/>,document.getElementById('root'));
registerServiceWorker();