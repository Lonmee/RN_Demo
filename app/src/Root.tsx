/**********************************
 * author   : lonmee
 * created  : 2019-04-09 12:45
 * desc     : 业务范畴：舞台初始(全局)配置
 **********************************/

import * as React from "react";
import {Component} from "react";
import ImageComp from "./comps/ImageComp";
import Counter from "./comps/Counter";
import {AppState, BackHandler, View} from "react-native";
import NativeWebview from "./comps/NativeWebview";
import {runtime} from "./utils/Runtime";
import {NavigationActions} from "react-navigation";
import {connect} from "react-redux";
import X5Shortcut from "./comps/X5Shortcut";
import Greetings from "./comps/GreetingComp";
import Blink from "./comps/Blink";
import AppNotification from "./comps/AppNotification";

class Root extends Component<any> {
    componentWillMount(): void {
        //缓存路由运行时
        runtime.navigation = this.props.navigation;

        //监听内存报警事件
        AppState.addEventListener('memoryWarning', function () {
            console.log("内存报警....");
        });

        BackHandler.addEventListener('hardwareBackPress', () => {
            //短接物理返回按钮的退出app为路由会上一级
            if (this.props.nav.routes.length > 1) {
                return this.props.back();
            }
        });
    }

    render(): React.ReactNode {
        return (
            <View>
                <Counter/>
                <ImageComp/>
                <NativeWebview/>
                <X5Shortcut/>
                <AppNotification/>
                <NativeWebview/>
                <Greetings/>
                <Blink/>
            </View>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        nav: state.nav
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        back: () => dispatch(NavigationActions.back())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Root);