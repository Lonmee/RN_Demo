package com.demo.utils.rnx5.x5.core;

import android.util.Log;
import android.webkit.JavascriptInterface;

import com.demo.utils.rnx5.X5Module;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;

public class X5JSFun implements WebViewJavaScriptFunction {
    private static final String TAG = "X5JSFun";
    private ReactContext reactContext;

    public X5JSFun() {
        this.reactContext = null;
    }

    @JavascriptInterface

    public void onJsFunctionCalled(String tag, String params) {
        Log.d(this.TAG, "onJsFunctionCalled: " + tag + "(" + params + ")");

        switch (tag) {
            case "tag":
                break;
            default:
                WritableMap wm = Arguments.createMap();
                wm.putString("params", params);
                X5Module.sendEvent(reactContext, tag, wm);
        }
    }

}
