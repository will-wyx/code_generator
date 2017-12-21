import React, {Component} from 'react';
import {ButtonToolbar, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {increment} from '../actions/index';

class App extends Component {
    constructor(props) {
        super(props);
        this.handleAdd1Click = this.handleAdd1Click.bind(this);
        this.handleAdd8Click = this.handleAdd8Click.bind(this);
    }

    handleAdd1Click() {
        this.props.dispatch(increment(1));
    }

    handleAdd8Click() {
        this.props.dispatch(increment(8));
    }

    render() {
        const {count} = this.props;
        return (
            <div className="container">
                <h1>{count}</h1>
                <ButtonToolbar>
                    <Button onClick={this.handleAdd1Click}>Add 1</Button>
                    <Button onClick={this.handleAdd8Click}>Add 8</Button>
                </ButtonToolbar>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        count: state.count
    }
};

export default connect(mapStateToProps)(App);