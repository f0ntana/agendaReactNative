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

    final long DELAY_TIME = (long) 30 * 1000;
    Promise promise;

    public LocationModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "FontanaLocation";
    }

    @ReactMethod
    public void getPosition(final Promise promise) {
        this.promise = promise;
        try {
            LocationManager locationManager = (LocationManager) getReactApplicationContext().getSystemService(Context.LOCATION_SERVICE);
            LocationModule.Listener locationListener = new LocationModule.Listener();
            locationManager.requestLocationUpdates(LocationManager.GPS_PROVIDER, 5000, 10, locationListener);

            SystemClock.sleep(DELAY_TIME);
            List<String> positions = locationListener.getPositions();
            locationManager.removeUpdates(locationListener);

            Log.d("FONTANA", "POSITIONS:"+positions.size());
            if (positions.size() == 0) {
                promise.reject("NOT_READY_YET", "NOT_READY_YET");
                return;
            }

            promise.resolve(positions.get(0));
        } catch (Exception ex) {
            ex.printStackTrace();
            promise.reject("GENERIC_ERROR", "GENERIC_ERROR");
        }
    }

  static class Listener implements LocationListener {

    List<String> positions = new LinkedList<>();

    public List<String> getPositions() {
        return this.positions;
    }

    @Override
    public void onLocationChanged(Location loc) {
        String positionStr = loc.getLatitude() + "|" + loc.getLongitude();
        this.getPositions().add(positionStr);
        Log.d("FONTANA", positionStr);
    }

    @Override
    public void onProviderDisabled(String provider) {}

    @Override
    public void onProviderEnabled(String provider) {}

    @Override
    public void onStatusChanged(String provider, int status, Bundle extras) {}
  }
}
