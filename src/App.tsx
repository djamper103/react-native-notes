import React from 'react';
import {Provider} from 'react-redux';
import {setupStore} from './redux/store/store';
import {NavigationContainerFC} from './navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {LogBox} from 'react-native';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

const store = setupStore();

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainerFC />
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
