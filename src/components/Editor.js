import React, {Component} from 'react';

const {ipcRenderer} = window.require('electron');

export default class Editor extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const that = this;
        ipcRenderer.on('render', (e, r) => {
            that.refs.txtMain.value = r;
        })
    }

    render() {
        return (
            <textarea ref="txtMain" style={{
                position: 'absolute',
                left: 0, right: 0, top: 0, bottom: 0,
                width: '100%', border: 'none'
            }}/>
        )
    }
}