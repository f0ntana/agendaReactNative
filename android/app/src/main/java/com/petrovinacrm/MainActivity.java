package com.petrovinacrm;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.SystemClock;
import android.util.Log;

import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

    private final String SERVICE_RUNNING_KEY = "service-running";

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "PetrovinaCRM";
    }


    @Override
    protected void onPostResume() {
        super.onPostResume();

        SharedPreferences servicePreferences = getSharedPreferences("bg-service", MODE_PRIVATE);
        
        if (!servicePreferences.contains(SERVICE_RUNNING_KEY) || servicePreferences.getBoolean(SERVICE_RUNNING_KEY, false)) {
            Log.d("FONTANA", "not running service");
            servicePreferences.edit().putBoolean(SERVICE_RUNNING_KEY, false).apply();
            
            Context context = this;
            AlarmManager mgr = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
            Intent i = new Intent(context, OnAlarmReceiver.class);
            PendingIntent pi = PendingIntent.getBroadcast(context, 0, i, 0);
            mgr.setRepeating(AlarmManager.ELAPSED_REALTIME_WAKEUP, SystemClock.elapsedRealtime() + 1000, OnBootReceiver.PERIOD, pi);
            Log.d("FONTANA", "scheduling service");
        }

    }
}
