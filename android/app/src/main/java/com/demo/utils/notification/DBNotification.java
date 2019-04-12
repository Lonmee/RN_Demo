package com.demo.utils.notification;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Color;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

import com.demo.MainActivity;
import com.demo.R;
import com.facebook.react.ReactActivity;

public class DBNotification extends ReactActivity implements View.OnClickListener {

    private Context mContext;
    private NotificationManager notificationManager;
    private Notification notify;
    Bitmap LargeBitmap = null;
    private static final int NOTIFYID = 1;

    private Button btn_show_normal;
    private Button btn_close_normal;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_notification);
        mContext = DBNotification.this;
        //创建大图标的Bitmap
        LargeBitmap = BitmapFactory.decodeResource(getResources(), R.mipmap.iv_lc_icon);
        notificationManager = (NotificationManager) getSystemService(NOTIFICATION_SERVICE);
        bindView();

    }


    private void bindView() {
        btn_show_normal = (Button) findViewById(R.id.btn_show_normal);
        btn_close_normal = (Button) findViewById(R.id.btn_close_normal);
        btn_show_normal.setOnClickListener(this);
        btn_close_normal.setOnClickListener(this);
    }


    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.btn_show_normal:
                //定义一个PendingIntent点击Notification后启动一个Activity
                Intent it = new Intent(mContext, MainActivity.class);
                PendingIntent pit = PendingIntent.getActivity(mContext, 0, it, 0);

                //设置图片,通知标题,发送时间,提示方式等属性
                Notification.Builder mBuilder = new Notification.Builder(this);
                mBuilder.setContentTitle("芸芸故事")                        //标题
                        .setContentText("这是通知内容：这是通知内容这是通知内容这是通知内容")      //内容
                        .setSubText("这是子标题")                    //内容下面的一小段文字
                        .setTicker("状态栏文字。状态栏文字。状态栏文字。")             //收到信息后状态栏显示的文字信息
                        .setWhen(System.currentTimeMillis())           //设置通知时间
                        .setSmallIcon(R.mipmap.ic_lol_icon)            //设置小图标
                        .setLargeIcon(LargeBitmap)                     //设置大图标
                        .setDefaults(Notification.DEFAULT_LIGHTS | Notification.DEFAULT_VIBRATE)    //设置默认的三色灯与振动器
                        .setSound(Uri.parse("android.resource://" + getPackageName() + "/" + R.raw.biaobiao))  //设置自定义的提示音
                        .setAutoCancel(true)                           //设置点击后取消Notification
                        .setContentIntent(pit);                        //设置PendingIntent

                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) { // >= api26
                    String id = "id_YY_01";
                    CharSequence name = "芸芸故事";
                    String description = "关注CP更新";
                    int importance = NotificationManager.IMPORTANCE_HIGH;
                    NotificationChannel mChannel = new NotificationChannel(id, name, importance);
                    mChannel.setDescription(description);
                    mChannel.enableLights(true);
                    mChannel.setLightColor(Color.RED);
                    mChannel.enableVibration(true);
                    notificationManager.createNotificationChannel(mChannel);

                    mBuilder.setChannelId(id);
                }
                notify = mBuilder.build();
                notificationManager.notify(NOTIFYID, notify);
                break;

            case R.id.btn_close_normal:
                //除了可以根据ID来取消Notification外,还可以调用cancelAll();关闭该应用产生的所有通知
                notificationManager.cancel(NOTIFYID);                          //取消Notification
                break;

        }
    }
}