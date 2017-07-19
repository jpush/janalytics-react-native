package cn.jpush.reactnativejanalytics;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;

import cn.jiguang.analytics.android.api.BrowseEvent;
import cn.jiguang.analytics.android.api.CalculateEvent;
import cn.jiguang.analytics.android.api.CountEvent;
import cn.jiguang.analytics.android.api.Currency;
import cn.jiguang.analytics.android.api.Event;
import cn.jiguang.analytics.android.api.JAnalyticsInterface;
import cn.jiguang.analytics.android.api.LoginEvent;
import cn.jiguang.analytics.android.api.PurchaseEvent;
import cn.jiguang.analytics.android.api.RegisterEvent;


public class JAnalyticsModule extends ReactContextBaseJavaModule {

    private static final String JANALYTICS_NAME = "RCTJAnalyticsModule";

    public JAnalyticsModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return JANALYTICS_NAME;
    }

    /**
     * 开启 crash log 日志上报
     */
    @ReactMethod
    public void crashLogON() {
        JAnalyticsInterface.initCrashHandler(getReactApplicationContext());
    }

    @ReactMethod
    public void crashLogOFF() {
        JAnalyticsInterface.stopCrashHandler(getReactApplicationContext());
    }

    @ReactMethod
    public void postEvent(ReadableMap map) {
        String type = map.getString("type");
        switch (type) {
            case "login":
                String method = map.getString("method");
                boolean success = map.getBoolean("success");
                LoginEvent loginEvent = new LoginEvent(method, success);
                sendEvent(loginEvent, map);
                break;
            case "register":
                method = map.getString("method");
                success = map.getBoolean("success");
                RegisterEvent registerEvent = new RegisterEvent(method, success);
                sendEvent(registerEvent, map);
                break;
            case "purchase":
                String goodsId = map.getString("goodsId");
                String goodsType = map.getString("goodsType");
                String goodsName = map.getString("goodsName");
                double price = map.getDouble("price");
                success = map.getBoolean("success");
                String currency = map.getString("currency");
                int count = map.getInt("count");
                PurchaseEvent purchaseEvent;
                if (currency.equals(Currency.CNY.name())) {
                    purchaseEvent = new PurchaseEvent(goodsId, goodsName, price, success, Currency.CNY, goodsType, count);
                } else {
                    purchaseEvent = new PurchaseEvent(goodsId, goodsName, price, success, Currency.USD, goodsType, count);
                }
                sendEvent(purchaseEvent, map);
                break;
            case "browse":
                String id = map.getString("id");
                String name = map.getString("name");
                String contentType = map.getString("contentType");
                float duration = (float) map.getDouble("duration");
                BrowseEvent browseEvent = new BrowseEvent(id, name, contentType, duration);
                sendEvent(browseEvent, map);
                break;
            case "count":
                id = map.getString("id");
                CountEvent countEvent = new CountEvent(id);
                sendEvent(countEvent, map);
                break;
            default:
                id = map.getString("id");
                double value = map.getDouble("value");
                CalculateEvent calculateEvent = new CalculateEvent(id, value);
                sendEvent(calculateEvent, map);
        }
    }

    private void sendEvent(Event event, ReadableMap map) {
        ReadableMap extra = map.getMap("extra");
        ReadableMapKeySetIterator iterator = extra.keySetIterator();
        while (iterator.hasNextKey()) {
            String key = iterator.nextKey();
            event.addKeyValue(key, extra.getString(key));
        }
        Logger.d("JAnalyticsModule", "sending event: " + event);
        JAnalyticsInterface.onEvent(getReactApplicationContext(), event);
    }
}
