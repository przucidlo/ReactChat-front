import React from 'react';

import {Provider} from 'react-redux';
import store from '../redux/Store'

import SignIn from '../frontpage/signin/SignIn';

class App extends React.Component{
    render(){
        return (
            <Provider store={store}>
                <div>
                    <SignIn />
                </div>
            </Provider>
        );
    }
}

export default App;