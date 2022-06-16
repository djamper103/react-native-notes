import React, {FC} from 'react';
import {Pressable, View, ViewStyle} from 'react-native';

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
        <Pressable onPress={onPress} style={containerStyle && containerStyle}>
          {data}
        </Pressable>
      ) : (
        <View style={containerStyle && containerStyle}>{data}</View>
      )}
    </>
  );
};
