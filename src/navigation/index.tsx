import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {FC} from 'react';
import {StatusBar} from 'react-native';
import {COLORS} from '../constants/colors';
import {useAppSelector} from '../hooks/redux';
import {dw} from '../utils/dimensions';
import {DrawerScreen} from './components';
import {routesStack} from './routes';

export const NavigationContainerFC: FC = () => {
  const Stack = createStackNavigator();

  const {isTheme} = useAppSelector(reducer => reducer.themeReducer);

  return (
    <NavigationContainer>
      <StatusBar backgroundColor={isTheme ? COLORS.MIRAGE : COLORS.WHITE} />
      <Stack.Navigator>
        <Stack.Screen
          name="Drawer"
          component={DrawerScreen}
          options={{
            headerShown: false,
          }}
        />
        {routesStack.map(el => (
          <Stack.Screen
            name={el.name}
            component={el.component}
            key={el.name}
            options={{
              headerTitleStyle: {
                color: COLORS.TRANSPARENT,
              },
              headerStyle: {
                backgroundColor: isTheme ? COLORS.MIRAGE : COLORS.WHITE,
                height: dw(60),
              },
              headerTintColor: isTheme ? COLORS.WHITE : COLORS.SCORPION,
              // cardStyle: {
              //   backgroundColor: isTheme ? COLORS.MIRAGE : COLORS.WHITE,
              // },
            }}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
