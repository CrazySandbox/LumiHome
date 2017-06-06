package com.lumihome;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.rnfs.RNFSPackage;
import com.zmxv.RNSound.RNSoundPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.remobile.toast.RCTToastPackage;
import com.reactlibrary.RNReactNativeUpnpPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.babisoft.ReactNativeLocalization.ReactNativeLocalizationPackage;
import com.peel.react.TcpSocketsModule;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNFSPackage(),
            new RNSoundPackage(),
            new VectorIconsPackage(),
            new RCTToastPackage(),
            new RNReactNativeUpnpPackage(),
            new LinearGradientPackage(),
            new ReactNativeLocalizationPackage(),
            new TcpSocketsModule()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
