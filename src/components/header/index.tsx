import React, {FC, useState} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {COLORS} from '../../constants/colors';
import {useAppSelector} from '../../hooks/redux';
import {dh, dw} from '../../utils/dimensions';
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
  const {fontSize} = useAppSelector(reducer => reducer.fontReducer);

  const onPressMenu = () => {
    setIsModal(!isModal);
  };

  const onPressItem = (value: string) => {
    props.navigation.navigate(value, {value: {text: '', title: ''}, isTheme});
    setIsModal(false);
  };

  return (
    <View>
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
                isTheme={isTheme}
              />
            );
          })}
      </View>
      {props.modalData && (
        <ModalContainer onPress={onPressMenu} isModal={isModal}>
          <ModalContent
            data={props.modalData}
            textStyle={[
              styles.textModal,
              fontSize === 'Small' && styles.textModalSmall,
              fontSize === 'Large' && styles.textModalLarge,
            ]}
            containerStyle={[
              styles.modalContainer,
              isTheme && styles.modalContainerActive,
            ]}
            isData={true}
            isTheme={isTheme}
            onPressItem={onPressItem}
          />
        </ModalContainer>
      )}
    </View>
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
    width: dw(130),
    height: dh(160),
    backgroundColor: COLORS.DODGER_BLUE,
    top: dw(14),
    left: dw(240),
  },
  modalContainerActive: {
    backgroundColor: COLORS.WHITE,
  },
  textModal: {
    fontSize: 22,
    marginTop: dw(20),
    textAlign: 'center',
  },
  textModalSmall: {
    fontSize: 18,
  },
  textModalLarge: {
    fontSize: 26,
  },
});
