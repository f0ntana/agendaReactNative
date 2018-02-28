package com.petrovinacrm;

import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.location.Location;
import android.location.LocationManager;
import android.os.Looper;
import android.support.v7.app.AlertDialog;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.modules.core.PermissionListener;
import com.google.android.gms.location.LocationCallback;
import com.google.android.gms.location.LocationRequest;
import com.google.android.gms.location.LocationResult;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.location.LocationSettingsRequest;
import com.google.android.gms.location.SettingsClient;

import javax.annotation.Nullable;

public class LocationModule extends ReactContextBaseJavaModule implements PermissionListener {

    private LocationManager locationManager;
    private LocationRequest mLocationRequest;
    private LocationCallback mLocationCallback;
    private AlertDialog gpsDisabledDialog;
    private boolean hasListener = false;

    private final long UPDATE_INTERVAL = 10 * 1000;  /* 10 secs */
    private final long FASTEST_INTERVAL = 2000; /* 2 sec */


    public LocationModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    private void sendEvent(ReactContext reactContext, String eventName, @Nullable WritableMap params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }

    // Trigger new location updates at interval
    protected void startLocationUpdates() throws LocationAlreadyStartedException {
        if (hasListener) throw new LocationAlreadyStartedException();

        if (mLocationRequest == null) {
            // Create the location request to start receiving updates
            mLocationRequest = new LocationRequest();
            mLocationRequest.setPriority(LocationRequest.PRIORITY_HIGH_ACCURACY);
            mLocationRequest.setInterval(UPDATE_INTERVAL);
            mLocationRequest.setFastestInterval(FASTEST_INTERVAL);

            // Create LocationSettingsRequest object using location request
            LocationSettingsRequest.Builder builder = new LocationSettingsRequest.Builder();
            builder.addLocationRequest(mLocationRequest);
            LocationSettingsRequest locationSettingsRequest = builder.build();

            // Check whether location settings are satisfied
            // https://developers.google.com/android/reference/com/google/android/gms/location/SettingsClient
            SettingsClient settingsClient = LocationServices.getSettingsClient(getReactApplicationContext());
            settingsClient.checkLocationSettings(locationSettingsRequest);
        }

        if (mLocationCallback == null) {
            mLocationCallback = new LocationCallback() {
                @Override
                public void onLocationResult(LocationResult locationResult) {
                    onLocationChanged(locationResult.getLastLocation());
                }
            };
        }

        // new Google API SDK v11 uses getFusedLocationProviderClient(this)
        if (!hasListener) {
            LocationServices.getFusedLocationProviderClient(getReactApplicationContext()).requestLocationUpdates(mLocationRequest, mLocationCallback, Looper.myLooper());
            hasListener = true;
        }
    }

    protected void stopLocationUpdates() throws LocationNotRunningException {
        if (mLocationCallback == null) {
            throw new LocationNotRunningException();
        }

        LocationServices.getFusedLocationProviderClient(getReactApplicationContext()).removeLocationUpdates(mLocationCallback);
        hasListener = false;
    }

    public void onLocationChanged(Location location) {
        if (location == null) {
            return;
        }
        Log.d("FONTANA", location.toString());
        WritableMap params = Arguments.createMap();

        params.putDouble("latitude", location.getLatitude());
        params.putDouble("longitude", location.getLongitude());
        params.putDouble("altitude", location.getAltitude());
        params.putDouble("speed", location.getSpeed());
        params.putDouble("bearing", location.getBearing());
        params.putDouble("accuracy", location.getAccuracy());

        sendEvent(getReactApplicationContext(), "fontanaLocation", params);
    }

    @Override
    public String getName() {
        return "FontanaLocation";
    }

    @ReactMethod
    public void startListener() {
        Log.d("FONTANA", "GPS Enabled: " + isGpsEnabled());
        if (!isGpsEnabled()) {
            showDialogWhenGpsIsDisabled();
            return;
        }

        try {
            startLocationUpdates();
        } catch (LocationAlreadyStartedException e) {
            e.printStackTrace();
        }
    }

    @Override
    public boolean onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        return grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED;
    }

    @ReactMethod
    public void stopListener() {
        try {
            stopLocationUpdates();
        } catch (LocationNotRunningException e) {
            e.printStackTrace();
        }
    }

    private boolean isGpsEnabled() {
        if (locationManager == null) {
            locationManager = (LocationManager) getReactApplicationContext().getSystemService(Context.LOCATION_SERVICE);
        }

        return locationManager.isProviderEnabled(LocationManager.GPS_PROVIDER);
    }

    private void showDialogWhenGpsIsDisabled() {
        if (gpsDisabledDialog == null) {
            AlertDialog.Builder alertDialogBuilder = new AlertDialog.Builder(getCurrentActivity());
            alertDialogBuilder.setMessage("Seu GPS está desativado. Deseja ativar agora?")
                    .setCancelable(false)
                    .setPositiveButton("Ativar",
                            new DialogInterface.OnClickListener() {
                                public void onClick(DialogInterface dialog, int id) {
                                    Intent callGPSSettingIntent = new Intent(
                                            android.provider.Settings.ACTION_LOCATION_SOURCE_SETTINGS);
                                    getCurrentActivity().startActivity(callGPSSettingIntent);
                                }
                            });
            alertDialogBuilder.setNegativeButton("Cancelar",
                    new DialogInterface.OnClickListener() {
                        public void onClick(DialogInterface dialog, int id) {
                            dialog.cancel();
                        }
                    });
            gpsDisabledDialog = alertDialogBuilder.create();
        }

        if (!gpsDisabledDialog.isShowing()) {
            gpsDisabledDialog.show();
        }
    }

    static class LocationAlreadyStartedException extends Exception {
    }

    static class LocationNotRunningException extends Exception {
    }

}
