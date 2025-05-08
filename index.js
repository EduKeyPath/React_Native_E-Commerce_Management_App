/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

// Must be outside of any component LifeCycle (such as `componentDidMount`).

AppRegistry.registerComponent(appName, () => App);
