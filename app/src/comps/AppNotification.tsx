import * as React from "react";
import {Component} from "react";
import {AppState, NativeEventEmitter, Platform, StyleSheet, Text, TouchableHighlight, View} from "react-native";
import {RNNotification} from "./NativeAPI";

export default class AppNotification extends Component {
    constructor(props: {}, context: any) {
        super(props, context);
    }

    componentWillMount(): void {
        if (Platform.OS == "ios") {
            let nativeEventEmitter = new NativeEventEmitter(RNNotification as any);

            RNNotification.checkPermissions(e => {
                if (!(e.alert && e.sound && e.badge)) {
                    RNNotification.requestPermissions({
                        "alert": 1, "badge": 1, "sound": 1
                    }).then(res => {
                        !(res.alert && res.sound && res.badge) && alert("请开启通知功能");
                    }).catch(reason => {
                        reason;
                    });
                }
            });

            nativeEventEmitter.addListener("localNotificationReceived", info => {
                console.log(info);
            });

            nativeEventEmitter.addListener("remoteNotificationReceived", info => {
                console.log(info);
                RNNotification.onFinishRemoteNotification(info.notificationId, 1);
            });

            nativeEventEmitter.addListener("remoteNotificationsRegistered", info => {
                console.log(info);
            });

            nativeEventEmitter.addListener("remoteNotificationRegistrationError", info => {
                console.log(info);
                alert(info.message);
            });

            AppState.addEventListener('change', sn => {
                switch (sn) {
                    case "inactive":
                        RNNotification.scheduleLocalNotification({
                            fireDate: Date.now() + 2000,//new Date().setHours(16, 0, 0, 0),//The date and time when the system should deliver the notification.
                            alertTitle: "本地通知测试",//The text displayed as the title of the notification alert.
                            alertBody: "这是后台两秒测试",//The message displayed in the notification alert.
                            alertAction: "view",//The "action" displayed beneath an actionable notification. Defaults to "view";
                            // soundName: "",//The sound played when the notification is fired (optional).
                            isSilent: false,//If true, the notification will appear without sound (optional).
                            category: "view",//The category of this notification, required for actionable notifications (optional).
                            userInfo: {"para": "test_local"},//An optional object containing additional notification data.
                            applicationIconBadgeNumber: 1,//The number to display as the app's icon badge. Setting the number to 0 removes the icon badge.
                            repeatInterval: "week"//The interval to repeat as a string. Possible values: minute, hour, day, week, month, year.
                        });
                        break;
                    case "active":
                        RNNotification.getInitialNotification().then(notification => {
                            notification && console.log("本次启动由" + (notification.userInfo.para == "test_local" ? "本地测试" : "远程测试") + "通知触发。userInfo: " + notification.userInfo);
                        }).catch(reason => {
                            reason;
                        });

                        //if notification there
                        RNNotification.getDeliveredNotifications(list => {
                            if (list.length) {
                                list;
                            }
                        });

                        RNNotification.cancelAllLocalNotifications();
                        RNNotification.removeAllDeliveredNotifications();
                        RNNotification.setApplicationIconBadgeNumber(0);
                        break;
                }
            });
        }
        else {

        }
    }

    render(): React.ReactNode {
        return (
            <View style={styles.container}>
                <TouchableHighlight style={styles.item1}
                                    onPress={event => pressHandler(event, 111)}>
                    <Text style={styles.instructions}>{"Notification"}</Text>
                </TouchableHighlight>
            </View>
        );

        function pressHandler(event, sId) {
            Platform.OS === "android" ? RNNotification.activeDBNotification() : presentLocalNotification();
        }

        function presentLocalNotification() {
            RNNotification.presentLocalNotification({
                alertBody: "这是本地即时通知测试",
                alertAction: "view",
                isSilent: false,
                category: "view",
                applicationIconBadgeNumber: 1
            });

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
        backgroundColor: '#777777',
    },
    item1: {
        // width: 60,
        height: 30,
        margin: 10,
        backgroundColor: '#AA0000',
    },
    instructions: {
        textAlign: 'center',
        fontSize: 18,
        marginRight: 10,
        marginLeft: 10,
        marginTop: 2,
    },
});