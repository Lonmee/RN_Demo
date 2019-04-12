package com.demo.utils.rnx5.x5;

import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.util.Log;

import com.demo.utils.shortcut.DBShortcutMgr;
import com.facebook.react.ReactActivity;

public class X5AgentActivity extends ReactActivity {
    private static final String Tag = "X5AgentActivity";
    DBShortcutMgr scMgr;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        scMgr = new DBShortcutMgr();
        Class<?> aClass = null;

        try {
            aClass = Class.forName(X5Pool.getInstance().getNextActivity(getIntent().getIntExtra("sId", 0)));
        } catch (Exception e) {
            Log.e(this.Tag, "no Class");
        }

        if (aClass != null) {
            startActivity(new Intent(this, aClass).putExtras(getIntent()));
        }
        finish();
        overridePendingTransition(0,0);
        //For testing
        //DBShortcutMgr.getInstance().createShortcut(getApplicationContext(), "xxx", 123, "");
    }
}
