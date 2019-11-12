# JAnalytics-React-Native

## 1. 安装

```
npm install janalytics-react-native --save
```

* 注意：如果项目里没有jcore-react-native，需要安装

  ```
  npm install jcore-react-native --save
  ```

## 2. 配置

### 2.1 Android

* build.gradle

  ```
  android {
        defaultConfig {
            applicationId "yourApplicationId"           //在此替换你的应用包名
            ...
            manifestPlaceholders = [
                    JPUSH_APPKEY: "yourAppKey",         //在此替换你的APPKey
                    JPUSH_CHANNEL: "yourChannel"        //在此替换你的channel
            ]
        }
    }
  ```

  ```
  dependencies {
        ...
        implementation project(':janalytics-react-native')  // 添加 janalytics 依赖
        implementation project(':jcore-react-native')  			// 添加 jcore 依赖
    }
  ```

* AndridManifest.xml

  ```
  <meta-data
  android:name="JPUSH_CHANNEL"
  android:value="${JPUSH_CHANNEL}" />
  <meta-data
  android:name="JPUSH_APPKEY"
  android:value="${JPUSH_APPKEY}" />
  ```

* setting.gradle

  ```
  include ':janalytics-react-native'
  project(':janalytics-react-native').projectDir = new File(rootProject.projectDir, '../node_modules/janalytics-react-native/android')
  include ':jcore-react-native'
  project(':jcore-react-native').projectDir = new File(rootProject.projectDir, '../node_modules/jcore-react-native/android')
  ```

### 2.2 iOS

### 2.2.1 pod

```
pod install
```

* 注意：如果项目里使用pod安装过，请先执行命令

  ```
  pod deintegrate
  ```

### 2.2.2 手动方式

* Libraries

  ```
  Add Files to "your project name"
  node_modules/jcore-react-native/ios/RCTJCoreModule.xcodeproj
  node_modules/janalytics-react-native/ios/RCTJAnalyticsModule.xcodeproj
  ```

* Build Settings

  ```
  All --- Search Paths --- Header Search Paths --- +
  $(SRCROOT)/../node_modules/jcore-react-native/ios/RCTJCoreModule/
  $(SRCROOT)/../node_modules/janalytics-react-native/ios/RCTJAnalyticsModule/
  ```

* Build Phases

  ```
  libRCTJCoreModule.a
  libRCTJAnalyticsModule.a
  ```

## 3. 引用

详见：[App.js](https://github.com/jpush/janalytics-react-native/blob/master/example/App.js)

## 4. API

详见：[index.js](https://github.com/jpush/janalytics-react-native/blob/master/index.js)

## 5.  其他

* 集成前务必将example工程跑通
* 如有紧急需求请前往[极光社区](https://community.jiguang.cn/c/question)
* 上报问题还麻烦先调用JAnalytics.setLoggerEnable({"debug": true}，拿到debug日志

 