import React from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import JAnalytics from 'janalytics-react-native';

// 如果错误被红屏捕捉，可以选择release模式测试或者关闭红屏模式让应用崩溃
// 开启rn错误日志采集（仅ios）
JAnalytics.rnCrashLogON();

// 也可以自行将捕获到的异常主动递给sdk，不能同时开启JAnalytics.rnCrashLogON(allowedInDevMode)（仅ios）
// import { setJSExceptionHandler } from '../JExceptionHandler';
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    setBtnStyle: {
        width: 320,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#3e83d7',
        borderRadius: 8,
        backgroundColor: '#3e83d7',
        padding: 10
    },
    textStyle: {
        textAlign: 'center',
        fontSize: 25,
        color: '#ffffff'
    }
});

class Button extends React.Component {
    render() {
        return <TouchableHighlight
            onPress={this.props.onPress}
            underlayColor='#e4083f'
            activeOpacity={0.5}
        >
            <View
                style={styles.setBtnStyle}>
                <Text
                    style={styles.textStyle}>
                    {this.props.title}
                </Text>
            </View>
        </TouchableHighlight>
    }
}

const RegisterEvent = {
    type: "register",
    extra: {
        "registerKey": "registerValue"
    },
    method: "register",
    success: true
};

const LoginEvent = {
    type: 'login',
    extra: {
        "loginKey": "loginValue"
    },
    method: "login",
    success: true
};

const PurchaseEvent = {
    goodsId: '123',
    type: 'purchase',
    extra: {
        purchaseKey: 'purchaseValue'
    },
    goodsType: 'sports',
    goodsName: 'basketball',
    price: 300,
    currency: 'CNY',
    count: 1,
    success: true
};

const CountEvent = {
    id: 'count1',
    extra: {
        countKey: 'countValue'
    },
    type: 'count'
};

const CalculateEvent = {
    id: 'calculate1',
    extra: {
        userId: 'user1'
    },
    calculateKey: 'calculateValue',
    value: 200
};

var BrowseEvent = {
    id: 'browse1',
    name: 'shenzhen news',
    type: 'browse',
    extra: {
        browseKey: 'browseValue'
    },
    contentType: 'news',
    duration: 60
};

const accountInfo = {
    accountID: 'accountID1',
    name: 'name1',
    creationTime: 12312123123,
    sex: 1,
    paid: 2,
    birthday: '19900101',
    phone: '123414123',
    email: '380108184@qq.com',
    weiboID: 'weibo213123',
    wechatID: 'wechatID21123',
    qqID: 'qqid 1231',
    extras: {
        accountKey1: 'accountValue1',
        accountKey2: "accountValue2"
    }
};

export default class App extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        JAnalytics.setLoggerEnable({"enable": true});
        JAnalytics.init({appKey: '129c21dc4cb5e6f6de194003'});
    }

    render() {
        return (
            <View style={styles.container}>
                <Button title="postEvent"
                        onPress={() => JAnalytics.postEvent({
                                type: "register",
                                extra: {
                                    "registerKey": "registerValue"
                                },
                                method: "register",
                                success: true
                            }
                        )}/>
                <Button title="identifyAccount"
                        onPress={() => JAnalytics.identifyAccount(accountInfo, () => {
                                console.log("identifyAccount success");
                            }, (errMsg) => {
                                console.log("identifyAccount fail:" + errMsg);
                            }
                        )}/>
                <Button title="detachAccount"
                        onPress={() => JAnalytics.detachAccount(() => {
                                console.log("detachAccount success");
                            }, (errMsg) => {
                                console.log("detachAccount fail:" + errMsg);
                            }
                        )}/>
            </View>
        );
    }

}
