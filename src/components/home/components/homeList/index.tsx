import React, {FC} from 'react';
import {Pressable, StyleSheet, Text, ViewStyle} from 'react-native';
import {COLORS} from '../../../../constants/colors';
import {NotesListType} from '../../../../types/notes';
import {dw} from '../../../../utils/dimensions';
import {highlightedNoteFunc} from '../../../functions/highlightedNote';

interface ListItemProps {
  data: NotesListType;
  navigation?: any;
  isTheme?: boolean;
  modalData?: any;
  fontSize?: string;
  highlightedNotes: NotesListType[];
  containerStyle?: ViewStyle;
  onPressModal: (type: string, dataItem: NotesListType) => void;
  setModalState: (value?: boolean) => void;
}

export const HomeListItem: FC<ListItemProps> = ({
  data,
  navigation,
  isTheme,
  fontSize,
  highlightedNotes,
  containerStyle,
  setModalState,
  onPressModal,
}) => {
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
    setModalState(true);
    onPressModal('Highlight', data);
  };

  return (
    <Pressable
      style={[
        styles.container,
        containerStyle && containerStyle,
        data.color === 'blue' && styles.containerBlue,
        data.color === 'green' && styles.containerGreen,
        data.color === 'orange' && styles.containerOrange,
        highlightedNoteFunc(highlightedNotes, data) && styles.containerActive,
      ]}
      onPress={onPressItem}
      onLongPress={onLongPressItem}>
      <Text
        style={[
          styles.text,
          styles.textDate,
          data.color !== 'white' && styles.textDateActive,
          fontSize === 'Small' && styles.textDateSmall,
          fontSize === 'Large' && styles.textDateLarge,
        ]}>
        {data.date?.split('.')[0]}
      </Text>
      <Text
        style={[
          styles.text,
          styles.textTitle,
          data.color !== 'white' && styles.textActive,
          fontSize === 'Small' && styles.textTitleSmall,
          fontSize === 'Large' && styles.textTitleLarge,
        ]}
        numberOfLines={1}>
        {data?.title}
      </Text>
      <Text
        style={[
          styles.text,
          styles.textMain,
          data.color !== 'white' && styles.textActive,
          fontSize === 'Small' && styles.textMainSmall,
          fontSize === 'Large' && styles.textMainLarge,
        ]}
        numberOfLines={3}>
        {data?.text}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: dw(15),
    backgroundColor: COLORS.WHITE,
    width: dw(176),
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
  containerBlue: {
    backgroundColor: COLORS.DODGER_BLUE,
  },
  containerGreen: {
    backgroundColor: COLORS.APPLE,
  },
  containerOrange: {
    backgroundColor: COLORS.MY_SIN,
  },
  containerActive: {
    borderWidth: 2,
    padding: dw(13),
    borderColor: COLORS.CARNATION,
  },
  text: {
    color: COLORS.DUNE,
    textAlign: 'left',
  },
  textActive: {
    color: COLORS.WHITE,
  },
  textTitle: {
    fontSize: 26,
  },
  textTitleSmall: {
    fontSize: 22,
  },
  textTitleLarge: {
    fontSize: 30,
  },
  textMain: {
    color: '#404553',
    fontSize: 20,
  },
  textMainSmall: {
    fontSize: 16,
  },
  textMainLarge: {
    fontSize: 24,
  },
  textDate: {
    color: COLORS.GHOST,
    fontSize: 18,
  },
  textDateActive: {
    color: COLORS.WHITE,
  },
  textDateSmall: {
    fontSize: 14,
  },
  textDateLarge: {
    fontSize: 22,
  },
});
