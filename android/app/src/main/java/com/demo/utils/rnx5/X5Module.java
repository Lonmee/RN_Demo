package com.demo.utils.rnx5;

import android.content.Intent;
import android.support.annotation.Nullable;
import android.util.Log;

import com.demo.utils.rnx5.x5.X5Activity;
import com.demo.utils.rnx5.x5.X5AgentActivity;
import com.demo.utils.shortcut.DBShortcutMgr;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.tencent.smtt.sdk.QbSdk;

import java.util.HashMap;

public class X5Module extends ReactContextBaseJavaModule {
    public static X5Activity x5Instance;

    public X5Module(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "X5Module";
    }

    @ReactMethod
    public void prepareX5() {
        Log.d("app-X5", "testing core");

        HashMap<String, Object> map = new HashMap<String, Object>();
        map.put("use_speedy_classloader", true);
        QbSdk.initTbsSettings(map);

        QbSdk.PreInitCallback cb = new QbSdk.PreInitCallback() {
            @Override
            public void onViewInitFinished(boolean arg0) {
                // TODO Auto-generated method stub
                //x5內核初始化完成的回调，为true表示x5内核加载成功，否则表示x5内核加载失败，会自动切换到系统内核。
                Log.d("app-X5", " onViewInitFinished is " + arg0);
                //android.webkit.WebView.setWebContentsDebuggingEnabled(false);
            }

            @Override
            public void onCoreInitFinished() {
                Log.d("app-X5", "CoreInitFinished");
                // TODO Auto-generated method stub
            }
        };
        //x5内核初始化接口
        QbSdk.initX5Environment(getReactApplicationContext(),  cb);
    }

    @ReactMethod
    public void activeX5(int sId, String sName) {
        if (sName.equals("")) {
            sName = "我是测试游戏";
        }
        Intent intent = new Intent(getReactApplicationContext(), X5AgentActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        intent.putExtra("sId", sId);
        intent.putExtra("sName", sName);
        getReactApplicationContext().startActivity(intent);
    }

    @ReactMethod
    public void createShortCut(String sName, int sId, String icon) {
        DBShortcutMgr.getInstance().createShortcut(getReactApplicationContext(), sName, sId, icon);
    }

    @ReactMethod
    public void isExist(String storyName) {
        //调用h5快捷查询回调
        DBShortcutMgr.getInstance().isExist(getReactApplicationContext(), storyName);
    }


    /**
     * DeviceEventEmitter.addListener('keyboardWillShow', (e: Event) => {
     * handle event.
     * });
     *
     * @param reactContext
     * @param eventName
     * @param params
     */
    public static void sendEvent(ReactContext reactContext, String eventName, @Nullable WritableMap params) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, params);
    }
}
