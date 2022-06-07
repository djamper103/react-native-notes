import React, {FC} from 'react';
import {Pressable, Text} from 'react-native';

interface ModalListItemProps {
  data: any;
  textStyle?: any;
  onPress: (value: string) => void;
}

export const ModalListItem: FC<ModalListItemProps> = ({
  data,
  textStyle,
  onPress,
}) => {
  const onPressItem = () => {
    onPress(data);
  };
  return (
    <Pressable onPress={onPressItem}>
      <Text style={textStyle && textStyle}>{data}</Text>
    </Pressable>
  );
};
