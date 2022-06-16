import React from 'react';
import {Provider} from 'react-redux';
import {setupStore} from './redux/store/store';
import {NavigationContainerFC} from './navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {LogBox} from 'react-native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
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
