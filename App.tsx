import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { LogBox, StatusBar } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider } from 'react-query';

import MainNavigator from '@src/navigations/MainNavigator';
import { persistor, store } from '@src/redux/store';
import { DarkTheme, DefaultTheme } from '@src/theme/theme';

export const queryClient = new QueryClient();

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const theme = isDarkTheme ? DarkTheme : DefaultTheme;

  useEffect(() => {
    // Using redux store outside provider
    const storeListner = store.subscribe(() => {
      setIsDarkTheme(store.getState().theme.isDark);
    });
    return storeListner;
  });

  LogBox.ignoreAllLogs();

  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <PaperProvider theme={theme}>
            <NavigationContainer theme={theme}>
              <StatusBar
                backgroundColor={isDarkTheme ? 'black' : 'white'}
                barStyle={isDarkTheme ? 'light-content' : 'dark-content'}
              />
              <MainNavigator />
            </NavigationContainer>
          </PaperProvider>
        </QueryClientProvider>
      </PersistGate>
    </ReduxProvider>
  );
};

export default App;
