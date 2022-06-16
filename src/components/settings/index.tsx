import React, {FC, useState} from 'react';
import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import {COLORS} from '../../constants/colors';
import {modalDataFont} from '../../constants/data';
import {DARK_THEME_ICON, LIGHT_THEME_ICON} from '../../constants/images';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {setFont, setTheme} from '../../redux/store/actionCreator/actionCreator';
import {dh, dw} from '../../utils/dimensions';
import {LineComponent} from '../common/lineComponent';
import {ModalContainer} from '../common/modal';
import {ModalContent} from '../common/modalContent';
import {TextContainer} from '../common/textContainer';
import {Toogle} from '../common/toogle/toogle';
import {ViewContainer} from '../common/viewContainer';

interface SettingsProps {
  containerStyle?: ViewStyle;
}

export const Settings: FC<SettingsProps> = ({containerStyle}) => {
  const [isActiveToogle, setIsModalToogle] = useState(false);
  const [isModal, setIsModal] = useState(false);

  const {isTheme} = useAppSelector(reducer => reducer.themeReducer);
  const {fontSize} = useAppSelector(reducer => reducer.fontReducer);

  const dispatch = useAppDispatch();

  const onPressToggle = () => {
    dispatch(setTheme());
  };

  const onPressModal = () => {
    setIsModal(!isModal);
  };

  const onPressItemModal = (value: string) => {
    dispatch(setFont(value));
    onPressModal();
  };

  return (
    <View style={[styles.container, containerStyle && containerStyle]}>
      <TextContainer
        textHeader="Settings"
        isTheme={isTheme}
        textHeaderStyle={[
          styles.textTitle,
          fontSize === 'Small' && styles.textTitleSmall,
          fontSize === 'Large' && styles.textTitleLarge,
        ]}
      />
      <View style={styles.containerMainItem}>
        <TextContainer
          textHeader="Style"
          textHeaderStyle={[
            styles.textHeader,
            fontSize === 'Small' && styles.textHeaderSmall,
            fontSize === 'Large' && styles.textHeaderLarge,
          ]}
        />
        <View style={styles.containerTheme}>
          <TextContainer
            textHeader="Set Theme"
            isTheme={isTheme}
            textHeaderStyle={[
              styles.textFooter,
              fontSize === 'Small' && styles.textFooterSmall,
              fontSize === 'Large' && styles.textFooterLarge,
            ]}
          />
          <Toogle
            isActive={isActiveToogle}
            leftIcon={LIGHT_THEME_ICON}
            rightIcon={DARK_THEME_ICON}
            containerToogleStyle={isActiveToogle && styles.containerToogle}
            containerStyleButton={[
              styles.containerButton,
              isActiveToogle && styles.containerButtonActive,
            ]}
            setActive={setIsModalToogle}
            setTheme={onPressToggle}
          />
        </View>
        <View style={styles.containerTheme}>
          <TextContainer
            textHeader="Font size"
            isTheme={isTheme}
            textHeaderStyle={[
              styles.textFooter,
              fontSize === 'Small' && styles.textFooterSmall,
              fontSize === 'Large' && styles.textFooterLarge,
            ]}
          />
          <ViewContainer
            onPress={onPressModal}
            data={<Text style={styles.textHeader}>{fontSize}</Text>}
          />
        </View>
      </View>
      <LineComponent />
      {modalDataFont && (
        <ModalContainer
          onPress={onPressModal}
          isModal={isModal}
          containerMainStyle={styles.containerModal}>
          <ModalContent
            data={modalDataFont}
            isModal={true}
            isData={true}
            textStyle={[
              styles.textModal,
              fontSize === 'Small' && styles.textModalSmall,
              fontSize === 'Large' && styles.textModalLarge,
            ]}
            containerStyle={styles.containerModalStyle}
            onPressItem={onPressItemModal}
          />
        </ModalContainer>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  containerMainItem: {
    paddingHorizontal: dw(30),
    marginTop: dw(30),
  },
  containerTheme: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: dh(80),
  },
  containerButton: {
    width: dw(20),
    height: dw(20),
    borderRadius: dw(20),
    backgroundColor: COLORS.WHITE,
    paddingVertical: 0,
  },
  containerToogle: {
    backgroundColor: COLORS.WHITE,
  },
  containerButtonActive: {
    backgroundColor: COLORS.ABBEY,
  },
  containerModal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerModalStyle: {
    width: dw(250),
    height: dw(250),
    borderRadius: dw(15),
    paddingTop: dw(20),
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    shadowColor: COLORS.DUNE,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 10,
  },
  textTitle: {
    fontSize: 28,
    color: COLORS.DUNE,
    textAlign: 'center',
  },
  textTitleSmall: {
    fontSize: 24,
  },
  textTitleLarge: {
    fontSize: 32,
  },
  textHeader: {
    fontSize: 24,
    color: COLORS.GHOST,
    marginBottom: dw(30),
  },
  textHeaderSmall: {
    fontSize: 20,
  },
  textHeaderLarge: {
    fontSize: 28,
  },
  textFooter: {
    fontSize: 26,
    color: COLORS.DUNE,
  },
  textFooterSmall: {
    fontSize: 22,
  },
  textFooterLarge: {
    fontSize: 30,
  },
  textModal: {
    fontSize: 24,
    color: COLORS.DUNE,
    marginTop: dw(30),
  },
  textModalSmall: {
    fontSize: 20,
  },
  textModalLarge: {
    fontSize: 28,
  },
});
