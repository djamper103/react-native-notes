import React, {FC, useState} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {COLORS} from '../../constants/colors';
import {useAppSelector} from '../../hooks/redux';
import {dw} from '../../utils/dimensions';
import {ModalContainer} from '../common/modal';
import {IconContent} from './components/iconContent';
import {ModalContent} from '../common/modalContent';

interface HeaderProps {
  props: any;
  navigation?: any;
  modalData?: any;
  iconData?: any;
  containerStyle?: ViewStyle;
}

export const Header: FC<HeaderProps> = props => {
  const [isModal, setIsModal] = useState(false);
  const {isTheme} = useAppSelector(reducer => reducer.themeReducer);

  const onPressMenu = () => {
    setIsModal(!isModal);
  };

  const onPressItem = (value: string) => {
    props.navigation.navigate(value);
  };

  return (
    <>
      <View
        style={[
          styles.container,
          isTheme && styles.containerActive,
          props.containerStyle && props.containerStyle,
        ]}>
        {props.iconData &&
          props.iconData.map((el: any) => {
            return (
              <IconContent
                data={el}
                onPressMenu={onPressMenu}
                onPress={onPressItem}
                key={el.name}
              />
            );
          })}
      </View>
      {props.modalData && (
        <ModalContainer onPress={onPressMenu} isModal={isModal}>
          <ModalContent
            data={props.modalData}
            textStyle={styles.textModal}
            containerStyle={styles.modalContainer}
            onPressContainer={onPressMenu}
            onPressItem={onPressItem}
          />
        </ModalContainer>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: dw(20),
    paddingLeft: dw(180),
    height: dw(60),
    backgroundColor: COLORS.WHITE,
  },
  containerActive: {
    backgroundColor: COLORS.MIRAGE,
  },
  modalContainer: {
    width: dw(120),
    height: dw(150),
    backgroundColor: COLORS.DODGER_BLUE,
    top: dw(14),
    left: dw(250),
  },
  textHeaderStyle: {
    fontSize: 26,
    fontWeight: '500',
    color: COLORS.SCORPION,
  },
  textHeaderStyleActive: {
    color: COLORS.WHITE,
    fontSize: 28,
    fontWeight: '500',
  },
  textModal: {
    fontSize: 22,
    color: COLORS.WHITE,
    marginLeft: dw(20),
    marginTop: dw(20),
  },
  modal: {
    width: dw(120),
    height: dw(150),
    backgroundColor: COLORS.DODGER_BLUE,
    top: dw(14),
    left: dw(250),
  },
});