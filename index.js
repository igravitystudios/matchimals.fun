// This is pretty much a copy of ./src/index.js,
// specifically for the native-build.
// (web requires index.js to be inside ./src directory)

import { AppRegistry, Platform } from 'react-native';
import App from './src/App';

AppRegistry.registerComponent('matchimals', () => App);
