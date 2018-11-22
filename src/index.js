import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import App from './app/App';

import {Provider} from 'react-redux';
import store from './redux/Store'

ReactDOM.render(            
    <Provider store={store}>
        <App/>
    </Provider>
, document.getElementById("root"));

registerServiceWorker();