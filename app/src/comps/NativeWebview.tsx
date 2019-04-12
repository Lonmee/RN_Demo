/**********************************
 * author   : lonmee
 * created  : 2019-04-09 12:45
 * desc     :
 **********************************/

import * as React from "react";
import {Component} from "react";
import {StyleSheet, Text, TouchableHighlight, View} from "react-native";
import {connect} from "react-redux";
import {NavigationActions} from "react-navigation";

class NativeWebview extends Component<any> {
    constructor(props: {}, context: any) {
        super(props, context);
    }

    componentWillMount(): void {

    }

    render(): React.ReactNode {
        return (
            <View style={styles.container}>
                <TouchableHighlight style={styles.item1}
                                    onPress={this.props.goWeb}>
                    <Text style={styles.instructions}>{"Webview"}</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {state: state.nav};
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        goWeb: () => dispatch(NavigationActions.navigate({
            routeName: "Web",
            params: ["http://172.16.137.78/sc4ios/ToDemo.html"]
        }))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NativeWebview);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 40,
        backgroundColor: '#3c7277',
    },
    item1: {
        height: 30,
        margin: 10,
        backgroundColor: '#aa7a3a',
    },
    instructions: {
        textAlign: 'center',
        fontSize: 18,
        marginRight: 10,
        marginLeft: 10,
        marginTop: 2,
    },
});