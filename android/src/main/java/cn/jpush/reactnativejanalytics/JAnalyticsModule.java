package cn.jpush.reactnativejanalytics;

import android.util.Log;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;

import cn.jiguang.analytics.android.api.Account;
import cn.jiguang.analytics.android.api.AccountCallback;
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

    @ReactMethod
    public void setup(ReadableMap map) {
        JAnalyticsInterface.init(getReactApplicationContext());
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

    /**
     * 开始页面统计，和 stopLogPageView 成对调用，需要在页面的生命周期中调用，否则会对生命周期造成影响。
     * @param map includes pageName
     */
    @ReactMethod
    public void startLogPageView(ReadableMap map) {
        Logger.i(JANALYTICS_NAME, "Starting page statistics");
        String name = map.getString("pageName");
        if(getCurrentActivity() != null)
            JAnalyticsInterface.onPageStart(getCurrentActivity(), name);
    }

    /**
     * 结束页面统计，和 startLogPageView 成对调用，需要在页面的生命周期中调用，否则会对生命周期造成影响。
     * @param map includes pageName
     */
    @ReactMethod
    public void stopLogPageView(ReadableMap map) {
        Logger.i(JANALYTICS_NAME, "Stopping page statistics");
        String name = map.getString("pageName");
        if (getCurrentActivity() != null)
            JAnalyticsInterface.onPageEnd(getCurrentActivity(), name);
    }

    @ReactMethod
    public void setChannel(ReadableMap map) {
        String channel = map.getString("channel");
        Logger.i(JANALYTICS_NAME, "setChannel"+channel);
        JAnalyticsInterface.setChannel(getCurrentActivity(), channel);
    }

    @ReactMethod
    public void setAnalyticsReportPeriod(ReadableMap map) {
        int period = map.getInt("period");
        JAnalyticsInterface.setAnalyticsReportPeriod(getCurrentActivity(), period);
    }

    /**
     * 设置账户维度模型
     */
    @ReactMethod
    public void identifyAccount(ReadableMap map, final Callback success, final Callback fail) {
        Logger.i(JANALYTICS_NAME, "Stopping page statistics");
        String accountID = map.getString("accountID");
        long creationTime = map.getInt("creationTime");
        String name = map.getString("name");
        int sex = map.getInt("sex");
        int paid = map.getInt("paid");
        String birthdate = map.getString("birthdate");
        String phone = map.getString("phone");
        String email = map.getString("email");
        String weiboID = map.getString("weiboID");
        String wechatID = map.getString("wechatID");
        String qqID = map.getString("qqID");
        ReadableMap extras = map.getMap("extras");

        Account account = new Account(accountID);
        account.setCreationTime(creationTime); // 账户创建的时间戳
        account.setName(name);
        account.setSex(sex);
        account.setPaid(paid);
        account.setBirthdate(birthdate); // "19880920"是yyyyMMdd格式的字符串
        account.setPhone(phone);
        account.setEmail(email);
        account.setWeiboId(weiboID);
        account.setWechatId(wechatID);
        account.setQqId(qqID);
        if (extras != null) {
            ReadableMapKeySetIterator iterator = extras.keySetIterator();
            while (iterator.hasNextKey()) {
                String key = (String) iterator.nextKey();
                String value = extras.getString(key);
                account.setExtraAttr(key, value); // key如果为空，或者以极光内部namespace(符号$)开头，会设置失败并打印日志
            }
        }
        JAnalyticsInterface.identifyAccount(getCurrentActivity(), account, new AccountCallback() {
            @Override
            public void callback(int code, String msg) {
                if (code == 0) {
                    success.invoke();
                } else {
                    Log.i(JAnalyticsModule.class.getSimpleName(), "Identify account error code " + code + " :" + msg);
                    fail.invoke(msg);
                }
            }
        });
    }
}
