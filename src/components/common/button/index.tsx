import React, {FC} from 'react';
import {Pressable, StyleSheet, Text, ViewStyle} from 'react-native';
import {COLORS} from '../../../constants/colors';
import {dw} from '../../../utils/dimensions';

interface ButtonContainerProps {
  text?: any;
  containerStyle?: ViewStyle;
  textStyle?: ViewStyle;
  onPress?: () => void;
}

export const ButtonContainer: FC<ButtonContainerProps> = ({
  text = '',
  containerStyle,
  textStyle,
  onPress,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.button,
        containerStyle && containerStyle,
        text.length > 10 && styles.buttonLong,
      ]}>
      {text !== '' && (
        <Text
          style={[
            styles.text,
            textStyle && textStyle,
            text.length > 10 && styles.textLong,
          ]}>
          {text}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.DODGER_BLUE,
    width: dw(185),
    paddingVertical: dw(8),
    borderRadius: dw(15),
    justifyContent: 'center',
  },
  buttonLong: {
    paddingVertical: dw(10),
  },
  text: {
    color: COLORS.WHITE,
    fontSize: 24,
    textAlign: 'center',
  },
  textLong: {
    fontSize: 20,
  },
});
