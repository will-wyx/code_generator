import React from 'react';
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import {connect} from 'react-redux';
import {select_table} from '../actions/index';

const {ipcRenderer} = window.require('electron');

const SideList = (props) => {
    return (
        <ListGroup>
            {
                props.tables.map((e, i) => (
                    <ListGroupItem active={e === props.table_name}
                                   onClick={() => {
                                       props.handleTableSelect(e)
                                   }}
                                   key={i}>{e}</ListGroupItem>
                ))
            }
        </ListGroup>
    )
};

const mapStateToProps = (state, ownProps) => {
    return {
        table_name: state.table.name,
        tables: state.database.tables
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleTableSelect: (selected_table) => {
            ipcRenderer.send('getColumns', selected_table);
            dispatch(select_table(selected_table))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SideList);