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
        SharedPreferences servicePreferences = getReactApplicationContext().getSharedPreferences("bg-service", Context.MODE_PRIVATE);
        return servicePreferences.getString("LAST_KNOWN_POSITION", "");
    }
}
