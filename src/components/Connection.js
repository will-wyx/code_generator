import React, {Component} from 'react';
import {Form, FormGroup, ButtonToolbar, Button} from 'react-bootstrap';
const {ipcRenderer} = window.require('electron');

export default class Connection extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        // e.stopPropagation();
        // e.nativeEvent.stopImmediatePropagation();
        e.preventDefault();
        // console.log(this.refs);
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
                    <input className="form-control" type="text" placeholder="hostname/ip" defaultValue={this.props.host}
                           ref="host"/>
                </FormGroup>
                <FormGroup>
                    <input className="form-control" type="text" placeholder="port" defaultValue={this.props.port}
                           ref="port"/>
                </FormGroup>
                <FormGroup>
                    <input className="form-control" type="text" placeholder="username" defaultValue={this.props.user}
                           ref="user"/>
                </FormGroup>
                <FormGroup>
                    <input className="form-control" type="text" placeholder="password"
                           defaultValue={this.props.password} ref="password"/>
                </FormGroup>
                <FormGroup>
                    <input className="form-control" type="text" placeholder="database"
                           defaultValue={this.props.database} ref="database"/>
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
