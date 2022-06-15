import React, {FC} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {CustomDrawer} from './customDrawer/index';
import {routes} from '../routes';
import {Header} from '../../components/header';
import {iconDataMenu, modalDataHeaderMenu} from '../../constants/data';
import {COLORS} from '../../constants/colors';
import {useAppSelector} from '../../hooks/redux';

const Drawer = createDrawerNavigator();

export const DrawerScreen: FC = () => {
  const {isTheme} = useAppSelector(reducer => reducer.themeReducer);
  return (
    <Drawer.Navigator
      drawerContent={(props: any) => <CustomDrawer {...props} />}
      screenOptions={{
        header: (props: any) => (
          <Header
            {...props}
            iconData={iconDataMenu}
            modalData={modalDataHeaderMenu}
          />
        ),
        swipeEnabled: false,
        drawerPosition: 'right',
        sceneContainerStyle: {
          backgroundColor: isTheme ? COLORS.MIRAGE : COLORS.WHITE,
        },
      }}>
      {routes.map(route => (
        <Drawer.Screen
          name={route.name}
          component={route.component}
          key={route.name}
        />
      ))}
    </Drawer.Navigator>
  );
};
