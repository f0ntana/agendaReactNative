package com.petrovinacrm;

import android.content.Intent;
import android.os.Environment;
import android.util.Log;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Date;
import com.petrovinacrm.WakefulIntentService;

public class LocationService extends WakefulIntentService {
  public LocationService() {
    super("LocationService");
  }

  @Override
  protected void doWakefulWork(Intent intent) {
    Log.d("FONTANA", "XABLAU");
  }
}