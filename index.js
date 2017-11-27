import {
	NativeModules,
	Platform,
	DeviceEventEmitter
} from 'react-native';

const JAnalyticsModule = NativeModules.JAnalyticsModule;
// const listeners = {};

export default class JAnalytics {
    /**
     * 初始化插件
     * 
     * @param {object} params = {
     *  appKey: String       //极光控制台上注册的应用 appKey
     * }
     */
    static setup(params) {
        JAnalyticsModule.setup(params);
    }
    
    /**
     * 开始记录页面停留
     * 
     * @param {object} params = {
     *  pageName: Stirng   // 页面名称，用于标识页面
     * }
     * 
     */
    static startLogPageView(params) {
        JAnalyticsModule.startLogPageView(params);
    }

    /**
     * 停止记录页面停留
     * 
     * @param {object} params = {
     *  pageName: Stirng   // 页面名称，用于标识页面
     * }
     */
    static stopLogPageView(params) {
        JAnalyticsModule.stopLogPageView(params);
    }

    /**
     * 上报位置信息 iOS Only
     * 
     * @param {object} params = {
     *  latitude: float   // 经度
     *  longitude: float  // 纬度
     * }
     */
    static uploadLocation(params) {
        JAnalyticsModule.uploadLocation(params);
    }

    /**
     * 开启Crash日志收集，默认是关闭状态.
     */
    static crashLogON() {
        JAnalyticsModule.crashLogON();
    }

    /**
     * 设置是否打印sdk产生的Debug级log信息, 默认为NO(不打印log)
     * 
     * @param {object} params = {
     *  enable: Boolean //
     * }
     */
    static setDebug(params) {
        JAnalyticsModule.setDebug(params);
    }

    /**
     * 上报事件
     * 除了 extra 其他都是必填
     * @param {object} event 可以为如下 5 种事件
     * 
     * loginEvent = {
     *  type: 'login',  // 必填
     *  extra: Object,  // 附加键值对，格式 {String: String}
     *  method: String，  // 填自己的登录方法
     *  success: Boolean
     * }
     * 
     * registerEvent = {
     *  type: 'register',  // 必填
     *  extra: Object,  // 附加键值对，格式 {String: String}
     *  method: String，  // 填自己的登录方法
     *  success: Boolean
     * }
     *
     * purchaseEvent = {
     *  type: 'purchase', // 必填
     *  extra: Object,  // 附加键值对，格式 {String: String}
     *  goodsType: String,
     *  goodsId: String,
     *  goodsName: String,
     *  success: Boolen,
     *  price: float,
     *  currency: String, // CNY, USD
     *  count: int
     * }
     * 
     * browseEvent = {
     *  type: 'browse',
     *  id: String,
     *  extra: Object,  // 附加键值对，格式 {String: String}
     *  name: String,
     *  contentType: String,
     *  duration: float
     * }
     * 
     * countEvent = {
     *  type: 'count',
     *  extra: Object,  // 附加键值对，格式 {String: String}
     *  id: String
     * }
     * 
     * calculateEvent = {
     *  type: 'calculate',
     *  extra: Object,  // 附加键值对，格式 {String: String}
     *  id: String,
     *  value: double
     * }
     */
    static postEvent(event) {
        JAnalyticsModule.postEvent(event);
    }
    
}
