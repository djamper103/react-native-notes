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
  const onPressItem = () => {
    navigation.navigate('Current Note', {data, isTheme});
  };
  const onLongPressItem = () => {
    setIsModal(!isModal);
  };

  const onPressItemModal = (type: string) => {
    onPressModal(type, data);
  };

  const [isModal, setIsModal] = useState(false);

  return (
    <Pressable
      style={[styles.container, containerStyle && containerStyle]}
      onPress={onPressItem}
      onLongPress={onLongPressItem}>
      <Text style={[styles.textDate, isTheme && styles.textActive]}>
        {data.date && data.date?.split('.')[0]}
      </Text>
      <Text style={[styles.textTitle, isTheme && styles.textActive]}>
        {data?.title}
      </Text>
      <Text
        style={[styles.textMain, isTheme && styles.textActive]}
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
            textStyle={styles.textModal}
            containerStyle={containerModalStyle}
            onPressContainer={onLongPressItem}
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
    backgroundColor: COLORS.GHOST,
    width: 190,
    marginBottom: dw(10),
    borderRadius: dw(10),
  },
  containerModal: {
    justifyContent: 'flex-end',
  },
  textTitle: {
    fontSize: 24,
    color: COLORS.WHITE,
    textAlign: 'left',
  },
  textMain: {
    fontSize: 20,
    color: COLORS.WHITE,
    textAlign: 'left',
  },
  textDate: {
    fontSize: 18,
    color: COLORS.WHITE,
    textAlign: 'left',
  },
  textModal: {
    fontSize: 22,
    color: COLORS.WHITE,
  },
  textActive: {},
});
