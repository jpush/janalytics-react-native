# Android Configure Part

## Checkout settings.gradle

> your project/android/settings.gradle

```
include ':app', 'janalytics-react-native', 'jcore-react-native'
project(':janalytics-react-native').projectDir = new File(rootProject.projectDir, '../node_modules/janalytics-react-native/android')
project(':jcore-react-native').projectDir = new File(rootProject.projectDir, '../node_modules/jcore-react-native/android')
```

## Checkout module's build.gradle, add configuration

> your project/android/app/build.gradle

```
android {
  ...
  defaultConfig {
    applicationId "your application id"
    ...
    manifestPlaceholders = [
      JPUSH_APPKEY: "your app key",	//在此替换你的APPKey
      APP_CHANNEL: "developer-default",		//应用渠道号, 默认即可
    ]
  }
}
...
dependencies {
  implementation project(':janalytics-react-native')
  implementation project(':jcore-react-native')
}
```

## Checkout app's AndroidManifest.xml，add \<meta-data>。

> your react native project/android/app/AndroidManifest.xml

```
    <application
        ...
        <!-- Required . Enable it you can get statistics data with channel -->
        <meta-data android:name="JPUSH_CHANNEL" android:value="${APP_CHANNEL}"/>
        <meta-data android:name="JPUSH_APPKEY" android:value="${JPUSH_APPKEY}"/>

    </application>
```

​




