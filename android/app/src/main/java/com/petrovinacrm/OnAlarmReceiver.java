package com.petrovinacrm;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.util.Log;

import com.petrovinacrm.WakefulIntentService;

public class OnAlarmReceiver extends BroadcastReceiver {
  @Override
  public void onReceive(Context context, Intent intent) {
    Log.d("FONTANA", "OnAlarmReceiver");
    WakefulIntentService.sendWakefulWork(context, LocationService.class);
  }
}