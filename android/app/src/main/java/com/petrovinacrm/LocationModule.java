package com.primeip.invoker;

import android.app.Activity;
import android.content.Intent;
import android.content.ComponentName;
import android.content.pm.PackageManager;
import android.content.pm.PackageManager.NameNotFoundException;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;

import android.support.annotation.NonNull;
import com.facebook.react.bridge.*;

import java.io.Console;
import java.lang.String;
import java.util.Set;
import java.util.Iterator;

public class LocationModule extends ReactContextBaseJavaModule {

    Promise promise;

    public LocationModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "FontanaLocation";
    }

    @ReactMethod
    public String get() {
        SharedPreferences servicePreferences = getReactApplicationContext().getSharedPreferences("bg-service", MODE_PRIVATE);
        return servicePreferences.getString("LAST_KNOWN_POSITION", "");
    }
}
