import React, {FC, useState} from 'react';
import {Pressable, StyleSheet, Text, ViewStyle} from 'react-native';
import {COLORS} from '../../../../constants/colors';
import {NotesListType} from '../../../../types/notes';
import {dw} from '../../../../utils/dimensions';
import {ModalContainer} from '../../../common/modal';
import {ModalContent} from '../../../common/modalContent';

interface ListItemProps {
  data: NotesListType;
  navigation?: any;
  isTheme?: boolean;
  modalData?: any;
  fontSize?: string;
  containerStyle?: ViewStyle;
  containerModalStyle?: ViewStyle;
  onPressModal: (type: string, dataItem: NotesListType) => void;
}

export const HomeListItem: FC<ListItemProps> = ({
  data,
  navigation,
  isTheme,
  modalData,
  fontSize,
  containerStyle,
  containerModalStyle,
  onPressModal,
}) => {
  const [isModal, setIsModal] = useState(false);

  const onPressItem = () => {
    navigation.navigate('Current Note', {
      data,
      isTheme,
      fontSize,
      func: () => {
        navigation.navigate('New Note', {
          value: data,
          isTheme,
        });
      },
    });
  };
  const onLongPressItem = () => {
    setIsModal(!isModal);
  };

  const onPressItemModal = (type: string) => {
    onPressModal(type, data);
  };

  return (
    <Pressable
      style={[
        styles.container,
        containerStyle && containerStyle,
        data.color === 'blue' && styles.containerBlue,
        data.color === 'green' && styles.containerGreen,
        data.color === 'orange' && styles.containerOrange,
      ]}
      onPress={onPressItem}
      onLongPress={onLongPressItem}>
      <Text
        style={[
          styles.textDate,
          styles.text,
          data.color !== 'white' && styles.textActive,
          fontSize === 'Small' && styles.textDateSmall,
          fontSize === 'Large' && styles.textDateLarge,
        ]}>
        {data.date && data.date?.split('.')[0]}
      </Text>
      <Text
        style={[
          styles.textTitle,
          styles.text,
          data.color !== 'white' && styles.textActive,
          fontSize === 'Small' && styles.textTitleSmall,
          fontSize === 'Large' && styles.textTitleLarge,
        ]}>
        {data?.title}
      </Text>
      <Text
        style={[
          styles.textMain,
          styles.text,
          data.color !== 'white' && styles.textActive,
          fontSize === 'Small' && styles.textMainSmall,
          fontSize === 'Large' && styles.textMainLarge,
        ]}
        numberOfLines={4}>
        {data?.text}
      </Text>
      {modalData && (
        <ModalContainer
          onPress={onLongPressItem}
          isModal={isModal}
          containerMainStyle={styles.containerModal}>
          <ModalContent
            data={modalData}
            isModal={true}
            isData={true}
            textStyle={[
              styles.textModal,
              fontSize === 'Small' && styles.textModalSmall,
              fontSize === 'Large' && styles.textModalLarge,
            ]}
            containerStyle={containerModalStyle}
            onPressItem={onPressItemModal}
          />
        </ModalContainer>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: dw(15),
    backgroundColor: COLORS.WHITE,
    width: 190,
    marginBottom: dw(10),
    borderRadius: dw(10),
    shadowColor: COLORS.DUNE,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  containerModal: {
    justifyContent: 'flex-end',
  },
  containerBlue: {
    backgroundColor: COLORS.DODGER_BLUE,
  },
  containerGreen: {
    backgroundColor: COLORS.APPLE,
  },
  containerOrange: {
    backgroundColor: COLORS.MY_SIN,
  },
  text: {
    color: COLORS.DUNE,
    textAlign: 'left',
  },
  textActive: {
    color: COLORS.WHITE,
  },
  textTitle: {
    fontSize: 24,
  },
  textTitleSmall: {
    fontSize: 20,
  },
  textTitleLarge: {
    fontSize: 28,
  },
  textMain: {
    fontSize: 20,
  },
  textMainSmall: {
    fontSize: 16,
  },
  textMainLarge: {
    fontSize: 24,
  },
  textDate: {
    fontSize: 18,
  },
  textDateSmall: {
    fontSize: 14,
  },
  textDateLarge: {
    fontSize: 22,
  },
  textModal: {
    color: COLORS.MIRAGE,
    fontSize: 26,
  },
  textModalSmall: {
    fontSize: 22,
  },
  textModalLarge: {
    fontSize: 30,
  },
});
