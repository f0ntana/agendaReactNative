package com.petrovinacrm;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.util.Log;

public class OnAlarmReceiver extends BroadcastReceiver {
  @Override
  public void onReceive(Context context, Intent intent) {
    Log.d("FONTANA", "OnAlarmReceiver#onReceive");

    WakefulIntentService.acquireStaticLock(context);
    context.startService(new Intent(context, LocationService.class));
  }
}