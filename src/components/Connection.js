import React, {Component} from 'react';
import {Form, FormGroup, ButtonToolbar, Button} from 'react-bootstrap';

const {ipcRenderer} = window.require('electron');

export default class Connection extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const that = this;
        ipcRenderer.send('getConn');
        ipcRenderer.on('getConnSuccess', (e, r) => {
            for(let key of Object.keys(r)) {
                that.refs[key].value = r[key]
            }
        })
    }

    handleSubmit(e) {
        // e.stopPropagation();
        // e.nativeEvent.stopImmediatePropagation();
        e.preventDefault();
        let data = {};
        for (let key of Object.keys(this.refs)) {
            data[key] = this.refs[key].value;
        }
        ipcRenderer.send('setConn', data);
    }

    render() {
        return (
            <Form horizontal onSubmit={this.handleSubmit}>
                <FormGroup>
                    <input className="form-control" type="text" placeholder="hostname/ip" ref="host" required/>
                </FormGroup>
                <FormGroup>
                    <input className="form-control" type="text" placeholder="port" ref="port" required/>
                </FormGroup>
                <FormGroup>
                    <input className="form-control" type="text" placeholder="username" ref="user" required/>
                </FormGroup>
                <FormGroup>
                    <input className="form-control" type="text" placeholder="password" ref="password" required/>
                </FormGroup>
                <FormGroup>
                    <input className="form-control" type="text" placeholder="database" ref="database" required/>
                </FormGroup>
                <FormGroup>
                    <input className="form-control" type="text" placeholder="packagename" ref="packagename" required/>
                </FormGroup>
                <FormGroup>
                    <ButtonToolbar style={{'float': 'right'}}>
                        <Button type="reset"> 取消 </Button>
                        <Button type="submit" bsStyle="primary"> 确定 </Button>
                    </ButtonToolbar>
                </FormGroup>
            </Form>
        )
    }
};
