import 'babel-polyfill';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Provider, connect } from 'react-redux';
import { applyMiddleware, createStore, bindActionCreators } from 'redux';
import thunk from 'redux-thunk';
import * as types from './actions';

const initialState = {
    value: ""
}

function dnsReducer(state = initialState, action) {
    switch(action.type) {
        case types.FETCH_SUCCESS:
            var results = state.value.concat(JSON.stringify(action.values));
            return {value : results};
        default:
            return state;
    }
}

class DnsSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {fqdn: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handlePushButton = this.handlePushButton.bind(this);
    }
    handleChange(event) {
        this.setState({fqdn: event.target.value});
    }
    handlePushButton(event) {
        event.preventDefault();
        this.props.search(this.refs.fqdn.value);
    }
    render() {
        return (
            <form onSubmit={this.handleSumbit}>
                <label>
                    FQDN:
                    <input type="text" ref="fqdn" value={this.state.fqdn} onChange={this.handleChange} />
                </label>
                <button onClick={this.handlePushButton}>Send it</button>
            </form>
        )
    }
}

DnsSearch.propTypes = {
    search: PropTypes.func.isRequired,
};

const Title = (props) => {
    return <h1>query Internet name servers interactively</h1>
}

class DnsDisplay extends Component {
    render() {
        return (
            <div>{this.props.data}</div>
        );
    }
}

class QueryApp extends Component {
    render() {
        return (
            <div>
            <Title />
            <DnsSearch search={this.props.searchForward} />
            <DnsDisplay data={this.props.result} />
            </div>
        );
    }
}

const store = createStore(dnsReducer, initialState, applyMiddleware(thunk));

function mapStateToProps(state) {
    return {
        result: state.value
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(types, dispatch);
}

const QueryAppContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(QueryApp);

ReactDOM.render(
    <Provider store={store}>
        <QueryAppContainer />
    </Provider>,
    document.getElementById('app')
);
