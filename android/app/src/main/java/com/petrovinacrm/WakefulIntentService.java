package com.petrovinacrm;

import android.app.IntentService;
import android.content.Context;
import android.content.Intent;
import android.os.PowerManager;
import android.support.annotation.Nullable;
import android.util.Log;

public abstract class WakefulIntentService extends IntentService {

  public static final String LOCK_NAME_STATIC= "com.petrovinacrm";
  private static volatile PowerManager.WakeLock lockStatic=null;

    WakefulIntentService(String name) {
        super(name);
        Log.d("FONTANA", "WakefullIntentService#constructor");
    }
    
    protected abstract void doWakefulWork(Intent intent);

  @Override
  protected void onHandleIntent(@Nullable Intent intent) {
        Log.d("FONTANA", "WakefullIntentService#onHandleIntent");
    try {
        doWakefulWork(intent);
    } finally {
        PowerManager.WakeLock wakeLock = getLock(this);
        if (wakeLock.isHeld()) {
            wakeLock.release();
        }
    }
  }

  static void acquireStaticLock(Context context) {
      getLock(context);
  }

  static synchronized private PowerManager.WakeLock getLock(Context context) {
      if (lockStatic == null) {
          PowerManager mgr = (PowerManager) context.getSystemService(Context.POWER_SERVICE);

          lockStatic = mgr.newWakeLock(PowerManager.PARTIAL_WAKE_LOCK, LOCK_NAME_STATIC);
          lockStatic.setReferenceCounted(true);
      }

      return lockStatic;
  }
}