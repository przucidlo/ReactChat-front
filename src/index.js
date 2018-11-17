import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import FrontPage from './frontpage/FrontPage'

import {Provider} from 'react-redux';
import store from './redux/store'

const rootElement = document.getElementById("root");
//ReactDOM.render(<Provider store={store})

ReactDOM.render(<FrontPage/>,document.getElementById('root'));

registerServiceWorker();