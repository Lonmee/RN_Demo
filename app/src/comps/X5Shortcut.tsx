import * as React from "react";
import {Component} from "react";
import {Platform, StyleSheet, Text, TouchableHighlight, View} from "react-native";
import {RNCreateShortcut, RNNotification, RNX5} from "../../utils/NativeAPI";

export default class X5Shortcut extends Component {

    constructor(props: {}, context: any) {
        super(props, context);
    }

    render(): React.ReactNode {
        return (
            <View style={styles.container}>
                <TouchableHighlight style={styles.item1}
                                    onPress={event => f(event, 111)}>
                    <Text style={styles.instructions}>{"一"}</Text>
                </TouchableHighlight>

                <TouchableHighlight style={styles.item2}
                                    onPress={event => f(event, 222)}>
                    <Text style={styles.instructions}>{"二"}</Text>
                </TouchableHighlight>

                <TouchableHighlight style={styles.item3}
                                    onPress={event => f(event, 333)}>
                    <Text style={styles.instructions}>{"三"}</Text>
                </TouchableHighlight>

                <TouchableHighlight style={styles.item4}
                                    onPress={event => f(event, 444)}>
                    <Text style={styles.instructions}>{"四"}</Text>
                </TouchableHighlight>

                <TouchableHighlight style={styles.item5}
                                    onPress={event => f(event, 555)}>
                    <Text style={styles.instructions}>{"五"}</Text>
                </TouchableHighlight>

                <TouchableHighlight style={styles.item6}
                                    onPress={event => f(event, 666)}>
                    <Text style={styles.instructions}>{"六"}</Text>
                </TouchableHighlight>
            </View>
        );

        function f(event, sId) {
            Platform.OS === 'ios' || RNCreateShortcut(sId.toString(), sId, "http://dev.local.yunyun-inc.com:8000/story/1377/icon.jpg?t=1534760617");
        }
    }
}

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