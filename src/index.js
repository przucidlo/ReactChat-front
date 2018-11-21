import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import App from './app/App';

ReactDOM.render(<App/>, document.getElementById("root"));

registerServiceWorker();