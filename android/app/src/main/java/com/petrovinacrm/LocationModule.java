package com.petrovinacrm;

import android.content.SharedPreferences;
import com.facebook.react.bridge.*;
import java.lang.String;
import java.util.LinkedList;
import java.util.List;

import android.content.Context;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Bundle;
import android.os.SystemClock;
import android.util.Log;

public class LocationModule extends ReactContextBaseJavaModule {

    final long DELAY_TIME = (long) 10 * 1000;
    Promise promise;

    public LocationModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "FontanaLocation";
    }

    boolean isRunning = false;
    @ReactMethod
    public void getPosition(final Promise promise) {
        Log.d("FONTANA", "getPosition");
        this.promise = promise;
        if (LocationService.lastPosition == null || LocationService.lastPosition.isEmpty()) {
            promise.reject("NOT_READY_YET", "NOT_READY_YET");
            return;
        }

        promise.resolve(LocationService.lastPosition);
    }

  static class Listener implements LocationListener {

    List<String> positions;
    Listener(List<String> positions) {
        this.positions = positions;
    }

    @Override
    public void onLocationChanged(Location loc) {
        String positionStr = loc.getLatitude() + "|" + loc.getLongitude();
        positions.add(positionStr);
        Log.d("onLocationChanged", positionStr);
    }

    @Override
    public void onProviderDisabled(String provider) {}

    @Override
    public void onProviderEnabled(String provider) {}

    @Override
    public void onStatusChanged(String provider, int status, Bundle extras) {}
  }
}
