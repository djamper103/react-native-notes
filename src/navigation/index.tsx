import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {FC, useEffect} from 'react';
import {Image, StatusBar, StyleSheet} from 'react-native';
import {CurrentNote} from '../components/currentNote';
import {Header} from '../components/header';
import {COLORS} from '../constants/colors';
import {iconDataMenu, modalDataHeaderMenu} from '../constants/data';
import {ARROW_LEFT_ICON} from '../constants/images';
import {useAppDispatch, useAppSelector} from '../hooks/redux';
import {defaultFont} from '../redux/store/actionCreator/actionCreator';
import {dw} from '../utils/dimensions';
import {routes} from './routes';

export const NavigationContainerFC: FC = () => {
  const Stack = createStackNavigator();

  const {isTheme} = useAppSelector(reducer => reducer.themeReducer);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(defaultFont());
  }, [dispatch]);

  return (
    <NavigationContainer>
      <StatusBar backgroundColor={isTheme ? COLORS.MIRAGE : COLORS.WHITE} />
      <Stack.Navigator>
        {routes.map(el => (
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
              cardStyle: {
                backgroundColor: isTheme ? COLORS.MIRAGE : COLORS.WHITE,
              },
              header: (props: any) => {
                return (
                  <Header
                    {...props}
                    iconData={iconDataMenu}
                    modalData={modalDataHeaderMenu}
                  />
                );
              },
            }}
          />
        ))}
        <Stack.Screen
          name={'Current Note'}
          component={CurrentNote}
          key={'Current Note'}
          options={{
            headerTitleStyle: {
              color: COLORS.TRANSPARENT,
            },
            headerStyle: {
              backgroundColor: isTheme ? COLORS.MIRAGE : COLORS.WHITE,
              height: dw(60),
            },
            cardStyle: {
              backgroundColor: isTheme ? COLORS.MIRAGE : COLORS.WHITE,
            },
            headerBackImage: () => (
              <Image
                source={ARROW_LEFT_ICON}
                style={[styles.image, isTheme && styles.imageActive]}
              />
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  image: {
    resizeMode: 'contain',
  },
  imageActive: {
    tintColor: COLORS.WHITE,
  },
});
