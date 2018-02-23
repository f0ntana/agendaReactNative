package com.petrovinacrm;

import android.content.SharedPreferences;
import com.facebook.react.bridge.*;
import java.lang.String;
import android.content.Context;

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
        return LocationService.lastPosition;
    }
}
