package com.petrovinacrm;

import android.util.Log;
import com.facebook.react.bridge.*;
import java.lang.String;

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
