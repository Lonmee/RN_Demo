import * as React from "react";
import {Component} from "react";
import {Platform, StyleSheet, Text, TouchableHighlight, View} from "react-native";
import {RNX5} from "../../utils/NativeAPI";
import {connect} from "react-redux";

export class X5Starter extends Component {

    constructor(props: {}, context: any) {
        super(props, context);
    }

    render(): React.ReactNode {
        return (
            <View style={styles.container}>
                <TouchableHighlight style={styles.item1}
                                    onPress={event => f(this.props, 111)}>
                    <Text style={styles.instructions}>{"111"}</Text>
                </TouchableHighlight>

                <TouchableHighlight style={styles.item2}
                                    onPress={event => f(this.props, 222)}>
                    <Text style={styles.instructions}>{"222"}</Text>
                </TouchableHighlight>

                <TouchableHighlight style={styles.item3}
                                    onPress={event => f(this.props, 333)}>
                    <Text style={styles.instructions}>{"333"}</Text>
                </TouchableHighlight>

                <TouchableHighlight style={styles.item4}
                                    onPress={event => f(this.props, 444)}>
                    <Text style={styles.instructions}>{"444"}</Text>
                </TouchableHighlight>

                <TouchableHighlight style={styles.item5}
                                    onPress={event => f(this.props, 555)}>
                    <Text style={styles.instructions}>{"555"}</Text>
                </TouchableHighlight>

                <TouchableHighlight style={styles.item6}
                                    onPress={event => f(this.props, 666)}>
                    <Text style={styles.instructions}>{"666"}</Text>
                </TouchableHighlight>
            </View>
        );

        function f(props, sId) {
            Platform.OS == "ios" ?
                props.navigation.navigate('Web', "http://172.16.137.81/yunyun-story-player/bin/game/index.html?storyId=2379&c=58&debug=true") :
                RNX5.activeX5(sId, sId.toString());
        }
    }
}

function mapStateToProps(state, ownProps) {
    return {
        x5Starter: state.x5Starter
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {};
}

export function X5StarterReducer(state = 0, action) {
    switch (action.type) {
        default:
            return state;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(X5Starter);

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 40,
        backgroundColor: '#cccccc',
    },
    item1: {
        width: 50,
        height: 30,
        margin: 10,
        backgroundColor: '#AA0000',
    },
    item2: {
        width: 50,
        height: 30,
        margin: 10,
        backgroundColor: '#00AA00',
    },
    item3: {
        width: 50,
        height: 30,
        margin: 10,
        backgroundColor: '#0000AA',
    },
    item4: {
        width: 50,
        height: 30,
        margin: 10,
        backgroundColor: '#888888',
    },
    item5: {
        width: 50,
        height: 30,
        margin: 10,
        backgroundColor: '#da1eff',
    },
    item6: {
        width: 50,
        height: 30,
        margin: 10,
        backgroundColor: '#11eec2',
    },
    instructions: {
        textAlign: 'center',
        fontSize: 18,
        marginTop: 2,
    },
});