package com.petrovinacrm;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.SystemClock;
import android.util.Log;

public class OnBootReceiver extends BroadcastReceiver {
  private static final int PERIOD=60000;   // 5 minutes
  
  @Override
  public void onReceive(Context context, Intent intent) {
    Log.d("FONTANA", "OnBootReceiver");
    AlarmManager mgr=(AlarmManager)context.getSystemService(Context.ALARM_SERVICE);
    Intent i=new Intent(context, OnAlarmReceiver.class);
    PendingIntent pi=PendingIntent.getBroadcast(context, 0, i, 0);
    
    mgr.setRepeating(AlarmManager.ELAPSED_REALTIME_WAKEUP, SystemClock.elapsedRealtime()+60000, PERIOD, pi);
  }
}