/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

// import React, { Component } from 'react';
// import {
//   AppRegistry,
//   StyleSheet,
//   Text,
//   View,
//   Button,
//   NativeModules
// } from 'react-native';
// import JAnalytics from 'janalytics'
// // const janaly = NativeModules.JAnalyticsModule;
// // const janaly = NativeModules.RCTJAnalytics;
// // var JAnalytics = require('Janalytics');                
// // import IMUI from 'aurora-imui-react-native'
// export default class janalytics extends Component {
//   constructor() {
//     super()

//   }
  
//   onClick() {
//     // console.log(janaly)
//     // janaly.setup({re: 555})
//     // JAnalytics.startLogPageView({pageName: 'loginPage'})
//     // console.log(janaly)
//     var janaly = new JAnalytics()
//     console.log(janaly)
//     // console.log(janaly)

//   }

//   render() {
//     return (
//       <View style={styles.container}>
//         <Button
//           onPress={this.onClick}
//           title="Learn More"
//           color="#841584"
//           accessibilityLabel="Learn more about this purple button"
//         />
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });

`use strict`;

import React from 'react';
import {
	AppRegistry,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import MainActivity from './react-native-ios/main_activity.js';


const janalytics = StackNavigator({
	Home: { screen: MainActivity }
});

AppRegistry.registerComponent('janalytics', () => janalytics);
// AppRegistry.registerComponent('JAnalyticsApp', () => JAnalyticsDemo);ls
