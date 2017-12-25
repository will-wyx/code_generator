import React, {Component} from 'react';
import {connect} from 'react-redux';
import {set_db, update_columns} from '../actions/index';
import SideList from './SideList';
import MainTable from './MainTable';

const {ipcRenderer} = window.require('electron');

class App extends Component {
    constructor(props) {
        super(props);
        this.handleModelClick = this.handleModelClick.bind(this);
    }

    componentDidMount() {
        ipcRenderer.send('setConn');
        ipcRenderer.on('getTablesSuccess', (e, r) => {
            this.props.dispatch(set_db(r));
        });
        ipcRenderer.on('getColumnsSuccess', (e, r) => {
            this.props.dispatch(update_columns(r));
        });
    }

    handleModelClick() {
        if (this.props.table_name)
            ipcRenderer.send('createModel', {table: this.props.table_name, columns: this.props.columns});
    }

    render() {
        return (
            <div>
                <div className="page-header">
                    <h1>{this.props.database_name}</h1>
                </div>
                <div className="row">
                    <div className="col-xs-3">
                        <SideList/>
                    </div>
                    <div className="col-xs-9">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                {this.props.table_name || 'table'}
                                <a className="pull-right btn btn-link btn-xs" onClick={this.handleModelClick}>action</a>
                                <a className="pull-right btn btn-link btn-xs"
                                   onClick={this.handleModelClick}>service</a>
                                <a className="pull-right btn btn-link btn-xs" onClick={this.handleModelClick}>dao</a>
                                <a className="pull-right btn btn-link btn-xs" onClick={this.handleModelClick}>model</a>
                            </div>
                            <MainTable/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        database_name: state.database.name,
        table_name: state.table.name,
        columns: state.table.columns
    }
};

export default connect(mapStateToProps)(App);