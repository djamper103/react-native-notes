import React, {FC} from 'react';
import {Pressable, StyleSheet, Text, ViewStyle} from 'react-native';
import {COLORS} from '../../../../constants/colors';
import {dw} from '../../../../utils/dimensions';

interface ModalListItemProps {
  data: any;
  isData?: boolean;
  isItem?: any;
  textStyle?: any;
  isTheme?: boolean;
  containerStyle?: ViewStyle;
  onPress: (value: string) => void;
}

export const ModalListItem: FC<ModalListItemProps> = ({
  data,
  isData,
  textStyle,
  isItem,
  isTheme,
  containerStyle,
  onPress,
}) => {
  const onPressItem = () => {
    onPress(data);
  };
  return (
    <>
      {isData ? (
        <Pressable
          onPress={onPressItem}
          style={containerStyle && containerStyle}>
          <Text
            style={[
              styles.text,
              textStyle && textStyle,
              isTheme && styles.textActive,
            ]}>
            {data}
          </Text>
        </Pressable>
      ) : (
        <Pressable
          onPress={onPressItem}
          style={[
            styles.container,
            data === 'blue' && styles.containerBlue,
            data === 'green' && styles.containerGreen,
            data === 'orange' && styles.containerOrange,
            isItem === data && styles.containerPress,
            containerStyle && containerStyle,
          ]}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
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
  containerPress: {
    borderWidth: dw(2),
    borderColor: COLORS.RED,
  },
  text: {
    color: COLORS.WHITE,
  },
  textActive: {
    color: COLORS.MIRAGE,
  },
});
