import React, {FC} from 'react';
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {DEFAULT_ICON} from '../../../constants/images';

interface IconContainerProps {
  icon?: ImageSourcePropType;
  containerStyle?: ViewStyle;
  imageStyle?: any;
  onPress?: () => void;
}

export const IconContainer: FC<IconContainerProps> = ({
  icon,
  containerStyle,
  imageStyle,
  onPress,
}) => {
  return (
    <View style={[styles.container, containerStyle && containerStyle]}>
      {onPress ? (
        <Pressable onPress={onPress}>
          <Image
            source={icon ? icon : DEFAULT_ICON}
            style={[styles.image, imageStyle && imageStyle]}
          />
        </Pressable>
      ) : (
        <Image
          source={icon ? icon : DEFAULT_ICON}
          style={[styles.image, imageStyle && imageStyle]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    resizeMode: 'contain',
  },
});
