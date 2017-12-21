import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducers/index';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.css';

const initValue = {
    count: 0
};

const store = createStore(reducer, initValue);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
    , document.getElementById('root'));

// const {ipcRenderer} = window.require('electron');
// ipcRenderer.send('getNews', 'r');
// ipcRenderer.on('getNewsSuccess', (e, r) => {
//     console.log(r)
// });



