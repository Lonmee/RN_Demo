import {Component} from 'react';
import {Text} from 'react-native';
import * as React from "react";

/**
 * 如果组件状态属性并不参与其他协作组件交互，则可使用state自行管理状态，以减小整体redux的性能支出。
 */
export default class Blink extends Component<any, { showText }> {
    componentWillMount(): void {
        // 每1000毫秒对showText状态做一次取反操作
        this.intervalId = setInterval(() => {
            this.setState({showText: !this.state.showText});//setState将自行调用该render实现刷新视图
        }, 1000);
    }

    private str = 'I love to blink\n' +
        'Yes blinking is so great\n' +
        'Why did they ever take this out of HTML\n' +
        'Look at me look at me look at me';
    private intervalId: number;

    constructor(props) {
        super(props);
        this.state = {showText: true};
    }

    componentWillUnmount(): void {
        clearInterval(this.intervalId);
    }

    render() {
        // 根据当前showText的值决定是否显示text内容
        return (
            <Text style={{textAlign: 'center'}}>{this.state["showText"] ? this.str : ''}</Text>
        );
    }
}