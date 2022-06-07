import React, {FC, useState} from 'react';
import {StyleSheet} from 'react-native';
import {SEARCH_ICON} from '../../constants/images';
import {useAppSelector} from '../../hooks/redux';
import {dw} from '../../utils/dimensions';
import {Input} from '../input';

interface SearchProps {
  onSearch: (value: string) => void;
}

export const Search: FC<SearchProps> = ({onSearch}) => {
  const {isTheme} = useAppSelector(reducer => reducer.themeReducer);
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
      inputStyle={styles.inputStyle}
      onChangeText={onChangeText}
      onPressRightIcon={searchItem}
    />
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    borderRadius: dw(14),
    margin: dw(20),
    height: dw(50),
  },
  inputStyle: {
    height: dw(50),
  },
});
