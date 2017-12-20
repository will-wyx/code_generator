import React from 'react';
import ReactDOM from 'react-dom';


ReactDOM.render(<h1>Hello World</h1>, document.getElementById('root'));

const {ipcRenderer} = window.require('electron');
ipcRenderer.send('getNews', 'r');
ipcRenderer.on('getNewsSuccess', (e, r) => {
    console.log(r)
});



