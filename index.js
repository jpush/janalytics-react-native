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

                 /**
                  * 动态配置channel，优先级比AndroidManifest里配置的高
                  *
                  * @param {object} params = {
                  *  'channel': String  //希望配置的channel
                  * }
                  */
                 static setChannel(params) {
                   JAnalyticsModule.setChannel(params);
                 }

                 /**
                  * 设置统计上报的自动周期，未调用前默认即时上报
                  *
                  * @param {object} params = {
                  *  'period': Number  //周期，单位秒，最小10秒，最大1天，超出范围会打印调用失败日志。传0表示统计数据即时上报
                  * }
                  */
                 static setAnalyticsReportPeriod(params) {
                   JAnalyticsModule.setAnalyticsReportPeriod(params);
                 }

                 /**
                  * 设置用户信息
                  * @param {Object} params = {
                  *  'accountID': String,            // 账号ID
                  *  'name': String,                 // 姓名
                  *  'creationTime': Number,         // 账号创建时间
                  *  'sex': Number,                  // 性别
                  *  'paid': Number,                 // 是否付费
                  *  'birthdate': String,            // 出生年月
                  *  'phone': String,                // 手机号码
                  *  'email': String,                // 电子邮件
                  *  'weiboID': String,              // 新浪微博ID
                  *  'wechatID': String,             // 微信ID
                  *  'qqID': String,                 // QQ ID
                  *  'extras': object                // Optional. 扩展参数，附加键值对，格式 {String: String}
                  * }
                  * @param {Function} success = () => {}
                  * @param {Function} fail = () => {}
                  */
                 static identifyAccount(params, success, fail) {
                   JAnalyticsModule.identifyAccount(params, success, fail);
                 }
               }
