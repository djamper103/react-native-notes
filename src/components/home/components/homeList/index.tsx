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
  containerStyle?: ViewStyle;
  containerModalStyle?: ViewStyle;
  onPressModal: (type: string, dataItem: NotesListType) => void;
}

export const HomeListItem: FC<ListItemProps> = ({
  data,
  navigation,
  isTheme,
  modalData,
  containerStyle,
  containerModalStyle,
  onPressModal,
}) => {
  const [isModal, setIsModal] = useState(false);

  const onPressItem = () => {
    navigation.navigate('Current Note', {data, isTheme});
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
        ]}>
        {data.date && data.date?.split('.')[0]}
      </Text>
      <Text
        style={[
          styles.textTitle,
          styles.text,
          data.color !== 'white' && styles.textActive,
        ]}>
        {data?.title}
      </Text>
      <Text
        style={[
          styles.textMain,
          styles.text,
          data.color !== 'white' && styles.textActive,
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
            textStyle={styles.textModal}
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
    padding: dw(10),
    backgroundColor: COLORS.WHITE,
    width: 190,
    marginBottom: dw(10),
    borderRadius: dw(10),
    shadowColor: '#000',
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
  textMain: {
    fontSize: 20,
  },
  textDate: {
    fontSize: 18,
  },
  textModal: {
    fontSize: 24,
  },
});
