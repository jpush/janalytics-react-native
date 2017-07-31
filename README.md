# janalytics-react-native

## Install

```
npm install janalytics-react-native --save
npm install jcore-react-native --save
react-native link
```

## Manually Configure Part

### Android

- [Checkout settings.gradle and build.gradle](./docs/AndroidConfig.md) 

- [Add JAnalyticsPackage, don't forget parameters!](./docs/JAnalyticsPackage.md)

## Usage
- Import JShareModule:

  > your component.js

  ```javascript
  ...
  import JAnalyticsModule from 'janalytics-react-native';
  JAnalyticsModule.setup({appKey: "you appKey get from jiguang website"})  // iOS 端需要先调用该方法
  ```

- You can refer to [example](./example)

## API
- refer to [index.js](./index.js)


