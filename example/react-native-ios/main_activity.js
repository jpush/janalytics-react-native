'use strict';

import React from 'react';
import ReactNative from 'react-native';
import JAnalytics from 'janalytics-react-native';


// 开启rn错误日志采集（仅ios）
var allowedInDevMode = true;
JAnalytics.rnCrashLogON(allowedInDevMode)

// 也可以自行将捕获到的异常主动递给sdk，不能同时开启JAnalytics.rnCrashLogON(allowedInDevMode)（仅ios）
// import { setJSExceptionHandler } from '../../error_guard';
// var allowedInDevMode = true;
// setJSExceptionHandler((e, isFatal) => {
//   if(isFatal){
//     var param = {
//       name: e.name+"",
//       message:e.message+""
//     }
//     JAnalytics.collectRNCrash(param)
//   }else{
//     console.log(e);
//   }
// }, allowedInDevMode);

const {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  ScrollView
} = ReactNative;



export default class MainActivity extends React.Component {
  constructor(props) {
    super(props);
    JAnalyticsModule.setup({appKey: 'a1703c14b186a68a66ef86c1'})
    JAnalyticsModule.setDebug({enable: true})
    JAnalyticsModule.crashLogON()
  }

  onStartLogPageView = () => {
    JAnalytics.startLogPageView({pageName: "RN page naem"})
  }

  onStopLogPageView = () => {
    JAnalytics.stopLogPageView({pageName: "RN page naem"})
  }
  
  onUploadLocation = () => {
    JAnalytics.uploadLocation({latitude: 0.4, longitude: 0.5})
  }

  onLoginPress = () => {
    var LoginEvent = {
      type: 'login',
      extra: {
        userId: "user1"
      },
      method: "login",
      success: true
    };
    JAnalytics.postEvent(LoginEvent);
  }

  onRegisterPress = () => {
    var RegisterEvent = {
      type: "register",
      extra: {
        userId: "user2"
      },
      method: "register",
      success: true
    };
    JAnalytics.postEvent(RegisterEvent);
  }

  onPurchasePress = () => {
    var PurchaseEvent = {
      goodsId: '123',
      type: 'purchase',
      extra: {
        userId: 'user2',
        customKey1: 'custom var1',
        customKey2: 'custom var2',
        customKey3: 'custom var3',
        customKey4: 'custom var4',
        customKey5: 'custom var5',
      },
      goodsType: 'sports',
      goodsName: 'basketball',
      price: 300,
      currency: 'CNY',
      count: 1,
      success: true
    };
    JAnalytics.postEvent(PurchaseEvent);
  }

  onCountPress = () => {
    var CountEvent = {
      id: 'count1',
      extra: {
        userId: 'user1'
      },
      type: 'count'
    };
    JAnalytics.postEvent(CountEvent);
  }

  onCalculatePress = () => {
    var CalculateEvent = {
      id: 'calculate1',
      extra: {
        userId: 'user1'
      },
      type: 'calculate',
      value: 200
    };
    JAnalytics.postEvent(CalculateEvent);
  }

  onBrowsePress = () => {
    var BrowseEvent = {
      id: 'browse1',
      name: 'shenzhen news',
      type: 'browse',
      extra: {
        userId: 'user1'
      },
      contentType: 'news',
      duration: 60
    };
    JAnalytics.postEvent(BrowseEvent);
  }

  onIdentifyAccount = () => {
    JAnalyticsModule.identifyAccount({
      accountID: 'accountID1',
      name: 'name1',
      creationTime: 12312123123,
      sex: 1,
      paid: 2,
      birthdate: '19900101',
      phone: '123414123',
      email: '380108184@qq.com',
      weiboID: 'weibo213123',
      wechatID: 'wechatID21123',
      qqID: 'qqid 1231',
      extras: {
          key1: 'value1',
          key2: 2
      }

  }, () => {
      console.log('identifyAccount success');
  }, (errMsg) => {
    console.log(`identifyAccount fail ${errMsg}`);
  });
  }

  render() {
    return (
      <ScrollView>
        <TouchableHighlight 
          underlayColor = '#e4083f'
          activeOpacity = {0.5}
          style = {styles.btnStyle}
          onPress = {this.onStartLogPageView}>
          <Text style={styles.btnTextStyle}>
            startLogPageView
          </Text> 
        </TouchableHighlight>
        <TouchableHighlight 
          underlayColor = '#e4083f'
          activeOpacity = {0.5}
          style = {styles.btnStyle}
          onPress = {this.onStopLogPageView}>
          <Text style={styles.btnTextStyle}>
            stopLogPageView
          </Text> 
        </TouchableHighlight>
        <TouchableHighlight 
          underlayColor = '#e4083f'
          activeOpacity = {0.5}
          style = {styles.btnStyle}
          onPress = {this.onUploadLocation}>
          <Text style={styles.btnTextStyle}>
            UploadLocation
          </Text> 
        </TouchableHighlight>
        
        <TouchableHighlight 
          underlayColor = '#e4083f'
          activeOpacity = {0.5}
          style = {styles.btnStyle}
          onPress = {this.startLogPageView}>
          <Text style={styles.btnTextStyle}>
            startLogPageView
          </Text> 
        </TouchableHighlight>
        <TouchableHighlight 
          underlayColor = '#e4083f'
          activeOpacity = {0.5}
          style = {styles.btnStyle}
          onPress = {this.onLoginPress}>
          <Text style={styles.btnTextStyle}>
            Login event
          </Text> 
        </TouchableHighlight>
        <TouchableHighlight 
          underlayColor = "#e4083f"
          activeOpacity = {0.5}
          style = {styles.btnStyle}
          onPress = {this.onRegisterPress}>
          <Text style = {styles.btnTextStyle}>
            Register event
          </Text>
        </TouchableHighlight>
        <TouchableHighlight 
          underlayColor = "#e4083f"
          activeOpacity = {0.5}
          style = {styles.btnStyle}
          onPress = {this.onPurchasePress}>
          <Text style = {styles.btnTextStyle}>
            Purchase event
          </Text>
        </TouchableHighlight>
        <TouchableHighlight 
          underlayColor = "#e4083f"
          activeOpacity = {0.5}
          style = {styles.btnStyle}
          onPress = {this.onCountPress}>
          <Text style = {styles.btnTextStyle}>
            Count event
          </Text>
        </TouchableHighlight>
        <TouchableHighlight 
          underlayColor = "#e4083f"
          activeOpacity = {0.5}
          style = {styles.btnStyle}
          onPress = {this.onCalculatePress}>
          <Text style = {styles.btnTextStyle}>
            Calculate event
          </Text>
        </TouchableHighlight>
        <TouchableHighlight 
          underlayColor = "#e4083f"
          activeOpacity = {0.5}
          style = {styles.btnStyle}
          onPress = {this.onBrowsePress}>
          <Text style = {styles.btnTextStyle}>
            Browse event
          </Text>
        </TouchableHighlight>
        <TouchableHighlight 
          underlayColor = "#e4083f"
          activeOpacity = {0.5}
          style = {styles.btnStyle}
          onPress = {this.onIdentifyAccount}>
          <Text style = {styles.btnTextStyle}>
            identify account
          </Text>
        </TouchableHighlight>
      </ScrollView>
    );
  }
}

var styles = StyleSheet.create({
  welcome: {
    textAlign: 'center',
    margin: 10,
  },
  btnStyle: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#3e83d7',
    borderRadius: 8,
    backgroundColor: '#3e83d7',
    alignSelf: 'center',
    justifyContent: 'center'
  },
  btnTextStyle: {
    textAlign: 'center',
    fontSize: 25,
    color: '#ffffff'
  },
});