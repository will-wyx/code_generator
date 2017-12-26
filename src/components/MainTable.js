import React from 'react';
import {connect} from 'react-redux';
import {update_columns} from '../actions/index';

const MainTable = (props) => {
    return (
        <table className="table table-striped">
            <thead>
            <tr>
                <th>name</th>
                <th>allow update</th>
                <th>type</th>
                <th>comment</th>
            </tr>
            </thead>
            <tbody>
            {
                props.columns.map((e, i) => (
                    <tr key={i} className={e.column_key === 'PRI' ? 'danger' : null}>
                        <td>{e.name}</td>
                        <td>
                            <input type="checkbox" checked={e.allow_update} onChange={(event) => {
                                const checked = event.target.checked;
                                props.handleAllowUpdateChange(props.columns, checked, e.name);
                            }}/>
                        </td>
                        <td>{e.type}</td>
                        <td>{e.comment}</td>
                    </tr>
                ))
            }
            </tbody>
        </table>
    )
};
const mapStateToProps = (state) => {
    return {
        columns: state.table.columns
    }
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleAllowUpdateChange: (columns, checked, column_name) => {
            columns = columns.map(ele => {
                if (ele.name === column_name) {
                    return {...ele, allow_update: checked};
                } else {
                    return ele;
                }
            });
            dispatch(update_columns(columns));
        }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(MainTable)
