import {Component} from 'react';
import {Text} from 'react-native';
import * as React from "react";

/**
 * 如果组件状态属性并不参与其他协作组件交互，则可使用state自行管理状态，以减小整体redux的性能支出。
 */
export default class Blink extends Component {
    str = 'I love to blink\n' +
        'Yes blinking is so great\n' +
        'Why did they ever take this out of HTML\n' +
        'Look at me look at me look at me';

    constructor(props) {
        super(props);
        this.state = {showText: true};

        // 每1000毫秒对showText状态做一次取反操作
        setInterval(() => {
            this.setState({showText: !this.state["showText"]});//setState将自行调用该render实现刷新视图
        }, 1000);
    }

    render() {
        // 根据当前showText的值决定是否显示text内容
        return (
            <Text style={{textAlign: 'center'}}>{this.state["showText"] ? this.str : ''}</Text>
        );
    }
}

//import {connect} from "react-redux";
// function mapStateToProps(state, ownProps) {
//     return {
//         showText: state.blink
//     }
// }
//
// function mapDispatchToProps(dispatch, ownProps) {
//     return {
//         switchState: () => dispatch({type: 'SWITCH_STATE'}),
//     };
// }
//
// export function blinkReducer(state = true, action) {
//     return action.type == 'SWITCH_STATE' ? !state : state;
// }
//
// export default connect(mapStateToProps, mapDispatchToProps)(Blink);