import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducers/index';
import App from './components/App';
import Connection from './components/Connection';
import 'bootstrap/dist/css/bootstrap.css';

import {BrowserRouter, HashRouter, Route} from 'react-router-dom';

const initValue = {
    count: 0
};

const store = createStore(reducer, initValue);

const bodyStyle = {
    padding: '20px'
};

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <div style={bodyStyle}>
                <div className="container">
                    <Route exact path="/" component={App}/>
                    <Route exact path="/connection" component={Connection}/>
                </div>
            </div>
        </HashRouter>
    </Provider>
    , document.getElementById('root'));

// const {ipcRenderer} = window.require('electron');
// ipcRenderer.send('getNews', 'r');
// ipcRenderer.on('getNewsSuccess', (e, r) => {
//     console.log(r)
// });



