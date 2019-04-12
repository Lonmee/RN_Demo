/**********************************
 * author   : lonmee
 * created  : 2019-04-11 17:57
 * desc     :
 **********************************/
import {createStackNavigator} from "react-navigation";
import Root from "./Root";
import DBWebView from "./comps/web/DBWebView";
import {combineReducers} from "redux";
import {createNavigationReducer} from "react-navigation-redux-helpers";
import {Platform} from "react-native";
import {counterReducer} from "./comps/Counter";

export let stackNavigator = createStackNavigator(
    {
        Home: {screen: Root},
        Web: {screen: DBWebView},
    },
    {
        initialRouteName: 'Home',
        headerMode: 'none',

        /*
         * Use modal on iOS because the card mode comes from the right,
         * which conflicts with the drawer example gesture
         */
        mode: Platform.OS === 'ios' ? 'modal' : 'card',
    }
);

export let combinedReducer = combineReducers(
    {
        nav: createNavigationReducer(stackNavigator),
        counter: counterReducer
    },
);