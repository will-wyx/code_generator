import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducers/index';
import App from './components/App';
import Connection from './components/Connection';
import Editor from './components/Editor';
import 'bootstrap/dist/css/bootstrap.css';

import {BrowserRouter, HashRouter, Route} from 'react-router-dom';

const initValue = {
    database: {
        name: '',
        tables: [],
    },
    table: {
        name: '',
        columns: [],
    }
};

const store = createStore(reducer, initValue);

const bodyStyle = {
    // padding: '20px'
};

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <div style={bodyStyle}>
                <div className="container-fluid">
                    <Route exact path="/" component={App}/>
                    <Route exact path="/connection" component={Connection}/>
                    <Route exact path="/editor" component={Editor}/>
                </div>
            </div>
        </HashRouter>
    </Provider>
    , document.getElementById('root'));




