/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App.js';
import {name as appName} from './app.json';
console.disableYellowBox = true;
AppRegistry.registerComponent(appName, () => App);
