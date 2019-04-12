/**********************************
 * author   : lonmee
 * created  : 11/6/18 12:01 PM
 * desc     :
 **********************************/
import * as React from "react";
import {Component} from "react";
import {Dimensions, View, WebView} from "react-native";

export default class DBWebView extends Component<any> {

    render(): React.ReactNode {
        return (
            <View style={{position: 'absolute', alignItems: 'center'}}>
                <WebView style={{
                    position: 'absolute',
                    width: Dimensions.get('window').width,
                    height: Dimensions.get('window').height
                }} source={{
                    uri: this.props.navigation.state.params[0] || "http://www.baidu.com/",
                    method: 'GET',
                }}/>
            </View>
        )
    }
}