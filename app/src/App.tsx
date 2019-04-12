import {NavigationContainer} from "react-navigation";
import * as React from "react";
import {Component, ReactNode} from "react";
import {applyMiddleware, createStore} from "redux";
import {connect, Provider} from "react-redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {createReactNavigationReduxMiddleware, createReduxContainer} from "react-navigation-redux-helpers";
import {combinedReducer, stackNavigator} from "./RR";

export default class App extends Component {
    private store: any;
    private appWithNavigationState: NavigationContainer;

    componentWillMount(): void {
        this.store = createStore(combinedReducer, composeWithDevTools(
            applyMiddleware(
                createReactNavigationReduxMiddleware(
                    (state: any) => state.nav,
                )
            )));
        this.appWithNavigationState = connect(mapStateToProps)(createReduxContainer(stackNavigator));

        function mapStateToProps(state) {
            return {state: state.nav}
        }
    }

    render(): ReactNode {
        return (
            <Provider store={this.store}>
                <this.appWithNavigationState/>
            </Provider>
        );
    }
}