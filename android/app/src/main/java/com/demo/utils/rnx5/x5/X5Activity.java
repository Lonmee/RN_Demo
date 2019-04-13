package com.demo.utils.rnx5.x5;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.graphics.PixelFormat;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;

import com.demo.R;
import com.demo.utils.rnx5.X5Module;
import com.demo.utils.rnx5.x5.core.X5JSFun;
import com.demo.utils.rnx5.x5.core.X5WebView;

public class X5Activity extends Activity {

    protected ViewGroup x5Frame;
    protected X5WebView x5wv;
    private int curSid = 0;
    private String curSname = "";
    private String curUrl = "";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_x5);

        getWindow().setFormat(PixelFormat.TRANSLUCENT);

        try {
            if (Build.VERSION.SDK_INT >= 11) {
                getWindow().setFlags(android.view.WindowManager.LayoutParams.FLAG_HARDWARE_ACCELERATED,
                        android.view.WindowManager.LayoutParams.FLAG_HARDWARE_ACCELERATED);
            }
        } catch (Exception e) {
            Log.d("X5Activity", e.getMessage());
        }

        x5Frame = findViewById(R.id.x5Frame);
        x5Frame.addView(x5wv = new X5WebView(this, null));

        Intent intent = getIntent();
        curSid = intent.getIntExtra("sId", -1);
        curSname = intent.getStringExtra("sName");
        /************** For JS call **************/
        x5wv.addJavascriptInterface(new X5JSFun(), "Android");
        /************** For JS call end **********/
        setTitle(curSname);

        checkTokenWithUrl(curSid, curSname);
        setRequestedOrientation(curSid == 0 ? ActivityInfo.SCREEN_ORIENTATION_USER_PORTRAIT : ActivityInfo.SCREEN_ORIENTATION_SENSOR_LANDSCAPE);
    }

    private void checkTokenWithUrl(int sId, String sName) {
        if (curUrl.equals("")) {
            curSid = sId;
            x5wv.loadUrl(curUrl = sName);
            Log.i("open url:''", curUrl);
        } else if (curSid != sId) {
            curSid = sId;
            x5wv.loadUrl(curUrl = sName);
            Log.i("open", curUrl);
        }
    }

    @Override
    public void onNewIntent(Intent intent) {
        checkTokenWithUrl(intent.getIntExtra("sId", -1), intent.getStringExtra("sName"));
    }

    @Override
    public void onBackPressed() {
/*        if (x5wv.canGoBack()) {
            x5wv.goBack();
        } else {
//            super.onBackPressed();
            moveTaskToBack(false);
        }*/

        moveTaskToBack(false);

        //for kill
        /*if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            finishAndRemoveTask();
        } else {
            finish();
        }*/
    }

    @Override
    protected void onSaveInstanceState(Bundle outState) {
        super.onSaveInstanceState(outState);
        x5wv.saveState(outState);
    }

    @Override
    protected void onRestoreInstanceState(Bundle savedInstanceState) {
        super.onRestoreInstanceState(savedInstanceState);
        x5wv.restoreState(savedInstanceState);
    }

    @Override
    protected void onPause() {
        super.onPause();
        x5wv.onPause();
    }

    @Override
    protected void onStop() {
        super.onStop();
    }

    @Override
    protected void onStart() {
        super.onStart();
    }

    @Override
    protected void onResume() {
        super.onResume();
        x5wv.onResume();
        checkTokenWithUrl(curSid, curSname);
        X5Pool.getInstance().refreshOrder(curSid);
        X5Module.x5Instance = this;
        hide();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        X5Pool.getInstance().retrieveActivity(curSid);
    }

    /**************************** for animate hiding ActiveBar ****************************/
    protected static final int UI_ANIMATION_DELAY = 300;
    protected final Handler mHideHandler = new Handler();

    protected final Runnable mHidePart2Runnable = new Runnable() {
        @SuppressLint("InlinedApi")
        @Override
        public void run() {
            x5Frame.setSystemUiVisibility(View.SYSTEM_UI_FLAG_LOW_PROFILE
                    | View.SYSTEM_UI_FLAG_FULLSCREEN
                    | View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                    | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
                    | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                    | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION);
        }
    };

    protected final Runnable mHideRunnable = new Runnable() {
        @Override
        public void run() {
            hide();
        }
    };

    @Override
    protected void onPostCreate(Bundle savedInstanceState) {
        Log.d("fsa:", "onPostCreate");
        super.onPostCreate(savedInstanceState);

        delayedHide(100);
    }

    protected void hide() {
        mHideHandler.postDelayed(mHidePart2Runnable, UI_ANIMATION_DELAY);
    }

    protected void delayedHide(int delayMillis) {
        mHideHandler.removeCallbacks(mHideRunnable);
        mHideHandler.postDelayed(mHideRunnable, delayMillis);
    }
    /**************************** for animate hiding ActiveBar end ************************/
}
