import * as React from "react";
import {Component} from "react";
import {Text, TouchableHighlight, View} from "react-native";
import {connect} from "react-redux";

class Counter extends Component {
    constructor(props) {
        super(props)
    }

    render(): React.ReactNode {
        let p: any = this.props;

        return (
            <View>
                <Text>{"  " + p.counter}</Text>
                <TouchableHighlight onPress={event => {
                    p.onIncrement(p.counter)
                }}>
                    <Text>{"  +  "}</Text>
                </TouchableHighlight>

                <TouchableHighlight onPress={event => {
                    p.onDecrement(p.counter)
                }}>
                    <Text>{"  -  "}</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        counter: state.counter
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        onIncrement: (c) => {
            dispatch({type: 'INCREMENT'});
        },
        onDecrement: (c) => {
            dispatch({type: 'DECREMENT'});
        }
    };
}

export function counterReducer(state = 0, action) {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);