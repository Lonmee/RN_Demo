package com.demo.utils.notification;

import android.content.Intent;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class DBNotificationModule extends ReactContextBaseJavaModule {

    public DBNotificationModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "DBNotificationModule";
    }

    @ReactMethod
    public void activeDBNotification() {
        Intent intent = new Intent(getReactApplicationContext(), DBNotification.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        getReactApplicationContext().startActivity(intent);
    }
}
