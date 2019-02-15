package com.softphonesip;

//import com.facebook.react.ReactActivity;
import com.reactnativenavigation.NavigationActivity;
import io.wazo.callkeep.RNCallKeepModule;

public class MainActivity extends NavigationActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */

    /* @Override
    protected String getMainComponentName() {
        return "softphoneSIP";
    }*/

    // Permission results
    @Override
    public void onRequestPermissionsResult(int permsRequestCode, String[] permissions, int[] grantResults) {
        super.onRequestPermissionsResult(permsRequestCode, permissions, grantResults);
        switch (permsRequestCode) {
            case RNCallKeepModule.REQUEST_READ_PHONE_STATE:
                RNCallKeepModule.onRequestPermissionsResult(grantResults);
                break;
        }
    }
}
