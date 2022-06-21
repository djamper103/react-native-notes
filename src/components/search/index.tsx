import React, {FC, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants/colors';
import {SEARCH_ICON} from '../../constants/images';
import {useAppSelector} from '../../hooks/redux';
import {dw} from '../../utils/dimensions';
import {Input} from '../input';

interface SearchProps {
  isFocused?: boolean;
  onSearch: (value: string) => void;
}

export const Search: FC<SearchProps> = ({isFocused, onSearch}) => {
  const {isTheme} = useAppSelector(reducer => reducer.themeReducer);
  const {fontSize} = useAppSelector(reducer => reducer.fontReducer);

  const [text, onChangeText] = useState('');

  useEffect(() => {
    !isFocused && onChangeText('');
  }, [isFocused]);

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
    shadowColor: COLORS.MIRAGE,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  inputStyleMedium: {
    fontSize: 22,
  },
  inputStyleLarge: {
    fontSize: 26,
  },
});
