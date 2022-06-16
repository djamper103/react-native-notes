import React, {FC, useState} from 'react';
import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants/colors';
import {SEARCH_ICON} from '../../constants/images';
import {useAppSelector} from '../../hooks/redux';
import {dw} from '../../utils/dimensions';
import {Input} from '../input';

interface SearchProps {
  onSearch: (value: string) => void;
}

export const Search: FC<SearchProps> = ({onSearch}) => {
  const {isTheme} = useAppSelector(reducer => reducer.themeReducer);
  const {fontSize} = useAppSelector(reducer => reducer.fontReducer);

  const [text, onChangeText] = useState('');

  const searchItem = () => {
    onSearch(text);
    onChangeText('');
  };

  return (
    <Input
      placeholder="Search"
      text={text}
      rightIcon={SEARCH_ICON}
      isTheme={isTheme}
      containerStyle={styles.containerStyle}
      inputStyle={[
        styles.inputStyle,
        fontSize === 'Medium' && styles.inputStyleMedium,
        fontSize === 'Large' && styles.inputStyleLarge,
      ]}
      onChangeText={onChangeText}
      onPressRightIcon={searchItem}
    />
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    margin: dw(20),
    borderRadius: dw(14),
    marginHorizontal: dw(10),
    height: dw(50),
    shadowColor: COLORS.MIRAGE,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  inputStyle: {
    height: dw(50),
  },
  inputStyleMedium: {
    fontSize: 22,
  },
  inputStyleLarge: {
    fontSize: 26,
  },
});
