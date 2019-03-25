# Add JAnalyticsPackage

> your project/android/app/src…/MainApplication.java

```
// 需要 import JAnalyticsInterface 和 JAnalyticsPackage
import cn.jiguang.analytics.android.api.JAnalyticsInterface;
import cn.jpush.reactnativejanalytics.JAnalyticsPackage;

public class MainApplication extends Application implements ReactApplication {

    // 是否关闭 Log，默认不关闭
    private static boolean SHUTDOWN_LOG = false;
    // 是否关闭 toast，默认不关闭
    private static boolean SHUTDOWN_TOAST = false;
    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }


        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
                    new JAnalyticsPackage(SHUTDOWN_TOAST, SHUTDOWN_LOG)
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
        SoLoader.init(this, false);
//      在 Init 之前调用，设置为 true，则会打印 debug 级别日志，否则只会打印 warning 级别以上的日志
//      JAnalyticsPackage.setDebugMode(true);

//      如果需要动态设置 channel，请去掉这里的初始化。在 RN 层调用 setChannel 设置渠道后再调用 setup 进行初始化。
        JAnalyticsPackage.init(this);
    }
}
```





