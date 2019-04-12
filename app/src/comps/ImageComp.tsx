import * as React from "react";
import {Component} from "react";
import {Image} from "react-native";
import {connect} from "react-redux";

class ImageComp extends Component<any> {
    private imgUriArr = [
        'https://www.google.com.hk/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
        'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    ];

    render(): React.ReactNode {
        let uriObj = {uri: this.imgUriArr[this.props.counter == 10 ? 0 : 1]};
        return (
            <Image source={uriObj} style={{width: 193, height: 110}}/>
        );
    }
}

function mapStateToProps(state) {
    return {
        counter: state.counter
    };
}

export default connect(mapStateToProps)(ImageComp);