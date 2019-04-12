import {NativeModules, Platform} from "react-native";

interface IRNToast {
    LONG: number;
    SHORT: number;

    show(msg: string, dur: number);
}

export const RNToast: IRNToast = Platform.OS == "android" ? NativeModules.RNToast : null;

interface IRNX5 {
    prepareX5();
    activeX5(sId: number, sName: string);
}

export const RNX5: IRNX5 = Platform.OS == "android" ? NativeModules.X5Module : null;

interface IRNNotification {
    // Android only
    activeDBNotification();

    // iOS only
    abandonPermissions();

    addListener(type, handler);//from RCTEventEmitter

    cancelAllLocalNotifications();

    cancelLocalNotifications(userInfo?: Object);

    checkPermissions(callback: Function);

    getApplicationIconBadgeNumber();

    getDeliveredNotifications(callback: Function);

    getInitialNotification();

    getScheduledLocalNotifications(callback: Function);

    /**
     *
     * @param notificationId
     * @param result    0: UIBackgroundFetchResultNewData
     *                  1: UIBackgroundFetchResultNoData
     *                  2: UIBackgroundFetchResultFailed
     */
    onFinishRemoteNotification(notificationId: string, result: number);

    presentLocalNotification(details: IPresentLocalNotificationDetails);

    removeAllDeliveredNotifications();

    removeDeliveredNotifications();

    removeListeners(type, handler);//from RCTEventEmitter

    requestPermissions(permissions: {});

    scheduleLocalNotification(any);

    setApplicationIconBadgeNumber(n: number);
}

interface IPresentLocalNotificationDetails {
    alertBody: String;
    alertAction?: String;
    soundName?: String;
    isSilent?: boolean;
    category?: any;
    userInfo?: any;
    applicationIconBadgeNumber?: number | null;
}

export const RNNotification: IRNNotification = Platform.OS == "android" ? NativeModules.DBNotificationModule : NativeModules.PushNotificationManager;

/**
 * RNCreateShortcut
 * String sName,
 * int sId,
 * String icon
 */
export const RNCreateShortcut: (sName: String, sId: number, icon?: String) => void = Platform.OS == "android" ? NativeModules.X5Module.createShortCut : null;

/*
ART: Object
AccessibilityInfo: (...)
ActionSheetIOS: (...)
ActivityIndicator: (...)
Alert: (...)
AlertIOS: (...)
Animated: (...)
AppRegistry: (...)
AppState: (...)
AsyncStorage: (...)
BackAndroid: (...)
BackHandler: (...)
Button: (...)
CameraRoll: (...)
CheckBox: (...)
Clipboard: (...)
ColorPropType: (...)
DatePickerAndroid: (...)
DatePickerIOS: (...)
DeviceEventEmitter: RCTDeviceEventEmitter
DeviceInfo: (...)
Dimensions: (...)
DrawerLayoutAndroid: (...)
Easing: (...)
EdgeInsetsPropType: (...)
FlatList: (...)
I18nManager: (...)
Image: (...)
ImageBackground: (...)
ImageEditor: (...)
ImagePickerIOS: (...)
ImageStore: (...)
InputAccessoryView: (...)
InteractionManager: (...)
Keyboard: (...)
KeyboardAvoidingView: (...)
LayoutAnimation: (...)
Linking: (...)
ListView: (...)
MaskedViewIOS: (...)
Modal: (...)
NativeAppEventEmitter: RCTDeviceEventEmitter
NativeEventEmitter: ƒ NativeEventEmitter(nativeModule)
NativeModules: Object
Navigator: (...)
NavigatorIOS: (...)
NetInfo: (...)
PanResponder: (...)
PermissionsAndroid: (...)
Picker: (...)
PickerIOS: (...)
PixelRatio: (...)
Platform: (...)
PointPropType: (...)
ProgressBarAndroid: (...)
ProgressViewIOS: (...)
PushNotificationIOS: (...)
RefreshControl: (...)
SafeAreaView: (...)
ScrollView: (...)
SectionList: (...)
SegmentedControlIOS: (...)
Settings: (...)
Share: (...)
Slider: (...)
SnapshotViewIOS: (...)
StatusBar: (...)
StatusBarIOS: (...)
StyleSheet: (...)
SwipeableFlatList: (...)
SwipeableListView: (...)
Switch: (...)
Systrace: (...)
TVEventHandler: (...)
TabBarIOS: (...)
Text: (...)
TextInput: (...)
TimePickerAndroid: (...)
ToastAndroid: (...)
ToolbarAndroid: (...)
Touchable: (...)
TouchableHighlight: (...)
TouchableNativeFeedback: (...)
TouchableOpacity: (...)
TouchableWithoutFeedback: (...)
UIManager: (...)
Vibration: (...)
VibrationIOS: (...)
View: (...)
ViewPagerAndroid: (...)
ViewPropTypes: (...)
VirtualizedList: (...)
WebView: (...)
YellowBox: (...)
findNodeHandle: (...)
processColor: (...)
requireNativeComponent: (...)
takeSnapshot: (...)
unstable_batchedUpdates: (...)
*/