import React, {FC} from 'react';
import {Pressable, StyleSheet, View, ViewStyle} from 'react-native';
import {COLORS} from '../../../constants/colors';
import {dw} from '../../../utils/dimensions';

interface ViewContainerProps {
  data?: any;
  containerStyle?: ViewStyle;
  onPress: () => void;
}

export const ViewContainer: FC<ViewContainerProps> = ({
  data,
  containerStyle,
  onPress,
}) => {
  return (
    <>
      {onPress ? (
        <Pressable
          onPress={onPress}
          style={[styles.container, containerStyle && containerStyle]}>
          {data}
        </Pressable>
      ) : (
        <View style={[styles.container, containerStyle && containerStyle]}>
          {data}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: dw(55),
    height: dw(55),
    borderRadius: dw(50),
    backgroundColor: COLORS.DODGER_BLUE,
    top: dw(540),
    left: dw(280),
    zIndex: 1,
    elevation: 2,
    position: 'absolute',
  },
});
