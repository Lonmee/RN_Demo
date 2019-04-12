import {Component} from "react";
import {View, Text} from "react-native";
import * as React from "react";

export default class Greetings extends Component {

    render(): React.ReactNode {
        let hisName = "Lonmee";
        let herName = "Lunar";


        return (
            <View style={{alignItems: 'center'}}>
                <GreetingComp name={hisName}/>
                <GreetingComp name={herName}/>
            </View>
        );
    }
}

class GreetingComp extends Component<any> {
    render(): React.ReactNode {
        return (<View style={{alignItems: 'center'}}><Text>Hello {this.props["name"]}!</Text></View>)
    }
}