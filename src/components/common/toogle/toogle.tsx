import React, {FC, useCallback, useState} from 'react';
import {
  Animated,
  Easing,
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {COLORS} from '../../../constants/colors';
import {dw} from '../../../utils/dimensions';
import {RadioButton} from '../radioButton';

type ToogleProps = {
  isActive: boolean;
  startState?: any;
  endState?: any;
  leftIcon?: ImageSourcePropType;
  rightIcon?: ImageSourcePropType;
  leftIconStyle?: any;
  rightIconStyle?: any;
  containerToogleStyle?: any;
  containerLeftIcon?: ViewStyle;
  containerRightIcon?: ViewStyle;
  containerStyleButton?: any;
  setActive: (value: boolean) => void;
  setTheme: () => void;
};

export const Toogle: FC<ToogleProps> = ({
  isActive,
  startState = {x: 6, y: dw(-25)},
  endState = {x: dw(45), y: dw(-25)},
  leftIcon,
  rightIcon,
  leftIconStyle,
  rightIconStyle,
  containerToogleStyle,
  containerLeftIcon,
  containerRightIcon,
  containerStyleButton,
  setTheme,
  setActive,
}) => {
  const onPress = useCallback(() => {
    setActive(!isActive);
    setTheme();
  }, [isActive, setActive, setTheme]);
  const animatedValue = useState(new Animated.ValueXY(startState))[0];
  const moveToogle = () => {
    Animated.timing(animatedValue, {
      toValue: isActive ? startState : endState,
      useNativeDriver: false,
      duration: 300,
      easing: Easing.ease,
    }).start(() => {
      onPress();
    });
  };
  return (
    <TouchableOpacity style={styles.container} onPress={moveToogle}>
      <View
        style={[
          styles.containerToogle,
          isActive && styles.containerToogleActive,
          containerToogleStyle && containerToogleStyle,
        ]}
      />
      <Animated.View style={animatedValue.getLayout()}>
        <RadioButton
          isActive={isActive}
          containerStyleButton={containerStyleButton && containerStyleButton}
          onPress={onPress}
        />
      </Animated.View>
      {leftIcon && (
        <View
          style={[
            styles.containerLeftIcon,
            containerLeftIcon && containerLeftIcon,
          ]}>
          <Image
            source={leftIcon}
            style={[
              styles.image,
              !isActive && styles.imageLeft,
              leftIconStyle && rightIconStyle,
            ]}
          />
        </View>
      )}
      {rightIcon && (
        <View
          style={[
            styles.containerRightIcon,
            containerRightIcon && containerRightIcon,
          ]}>
          <Image
            source={rightIcon}
            style={[
              styles.image,
              isActive && styles.imageRight,
              rightIconStyle && rightIconStyle,
            ]}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {},
  containerToogle: {
    borderRadius: dw(50),
    width: dw(70),
    height: dw(30),
    backgroundColor: COLORS.ABBEY,
  },
  containerToogleActive: {
    backgroundColor: COLORS.ABBEY,
  },
  containerLeftIcon: {
    bottom: dw(49),
    left: dw(5),
  },
  containerRightIcon: {
    bottom: dw(77),
    left: dw(37),
  },
  image: {
    resizeMode: 'contain',
    backgroundColor: COLORS.TRANSPARENT,
  },
  imageLeft: {
    tintColor: COLORS.TRANSPARENT,
  },
  imageRight: {
    tintColor: COLORS.TRANSPARENT,
  },
});
