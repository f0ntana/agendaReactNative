package com.petrovinacrm;

import android.Manifest;
import android.content.pm.PackageManager;
import android.content.Context;
import android.content.Intent;
import android.os.Environment;
import android.content.SharedPreferences;
import android.support.v4.app.ActivityCompat;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Bundle;
import android.util.Log;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import android.os.SystemClock;
import java.io.IOException;
import java.util.Date;
import com.petrovinacrm.WakefulIntentService;

public class LocationService extends WakefulIntentService {
  
  public static String lastPosition = "";
  private final long DELAY_TIME = (long) 30 * 1000;

  public LocationService() {
    super("LocationService");
  }

  @Override
  protected void doWakefulWork(Intent intent) {
    Log.d("FONTANA", "XABLAU");
    if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
        Log.d("FONTANA", "Permissions missing");
        return;
    }

    LocationManager locationManager = (LocationManager) getApplicationContext().getSystemService(Context.LOCATION_SERVICE);
    LocationListener locationListener = new LocationService.Listener(getApplicationContext());
    locationManager.requestLocationUpdates(LocationManager.GPS_PROVIDER, 5000, 10, locationListener);

    SystemClock.sleep(DELAY_TIME);
    locationManager.removeUpdates(locationListener);
  }

  static class Listener implements LocationListener {
    @Override
    public void onLocationChanged(Location loc) {
        String positionStr = loc.getLatitude() + "|" + loc.getLongitude();
        lastPosition = positionStr;
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