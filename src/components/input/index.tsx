import React, {FC} from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {COLORS} from '../../constants/colors';
import {dw} from '../../utils/dimensions';

interface InputProps {
  text?: string;
  leftIcon?: ImageSourcePropType;
  rightIcon?: ImageSourcePropType;
  placeholder?: string;
  placeholderTextColor?: string;
  isTheme?: boolean;
  secureTextEntry?: boolean;
  maxLength?: number;
  inputStyle?: any;
  containerStyle?: ViewStyle;
  containerLeftIcon?: ViewStyle;
  containerRightIcon?: ViewStyle;
  leftIconStyle?: any;
  rightIconStyle?: any;
  onChangeText: (value: string) => any;
  onPressLeftIcon?: () => void;
  onPressRightIcon?: () => void;
}

export const Input: FC<InputProps> = ({
  text,
  leftIcon,
  rightIcon,
  placeholder = 'Search',
  placeholderTextColor = COLORS.BLACK,
  isTheme,
  secureTextEntry,
  maxLength,
  inputStyle,
  containerStyle,
  containerLeftIcon,
  containerRightIcon,
  leftIconStyle,
  rightIconStyle,
  onChangeText,
  onPressLeftIcon,
  onPressRightIcon,
}) => {
  return (
    <View
      style={[
        styles.container,
        isTheme && styles.containerActive,
        containerStyle,
      ]}>
      {leftIcon && (
        <TouchableOpacity
          style={containerLeftIcon && containerLeftIcon}
          onPress={onPressLeftIcon}>
          <Image
            source={leftIcon}
            style={[styles.image, leftIconStyle && leftIconStyle]}
          />
        </TouchableOpacity>
      )}
      <TextInput
        onChangeText={onChangeText}
        value={text}
        placeholder={placeholder}
        style={[styles.input, inputStyle && inputStyle]}
        placeholderTextColor={placeholderTextColor}
        secureTextEntry={secureTextEntry}
        multiline={true}
        maxLength={maxLength}
      />
      {rightIcon && (
        <TouchableOpacity
          style={containerRightIcon && containerRightIcon}
          onPress={onPressRightIcon}>
          <Image
            source={rightIcon}
            style={[styles.image, leftIconStyle && rightIconStyle]}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: COLORS.MIRAGE,
    paddingHorizontal: dw(10),
    backgroundColor: COLORS.WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  containerActive: {
    borderColor: COLORS.WHITE,
  },
  input: {
    color: COLORS.BLACK,
    fontSize: 18,
  },
  image: {
    resizeMode: 'contain',
    backgroundColor: COLORS.TRANSPARENT,
    tintColor: COLORS.DUNE,
  },
});
