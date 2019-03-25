# janalytics-react-native

## Install

```
npm install janalytics-react-native --save
npm install jcore-react-native --save
react-native link
```

##### Add with CocoaPods(if you integrated react-native to native iOS project)

Add the JAnalyticsRN pod to your list of application pods in your Podfile, using the path from the Podfile to the installed module:

```
pod 'JAnalyticsRN', :path => '../node_modules/janalytics-react-native'
pod 'JCoreRN', :path => '../node_modules/jcore-react-native'
```

Install pods as usual::

```
pod install
```

##  

## Manually Configure Part

### Android

- [Checkout settings.gradle and build.gradle](./docs/AndroidConfig.md) 

- [Add JAnalyticsPackage, don't forget parameters!](./docs/JAnalyticsPackage.md)

## Usage
- Import JAnalyticsModule:

  > your component.js

  ```javascript
  ...
  import JAnalyticsModule from 'janalytics-react-native';

  JAnalyticsModule.setup({appKey: "you appKey get from jiguang website"}) 
  ```

- You can refer to [example](./example)

## API

- refer to [index.js](./index.js)


