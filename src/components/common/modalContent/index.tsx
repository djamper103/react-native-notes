import React, {FC} from 'react';
import {View, ViewStyle} from 'react-native';
import {ModalListItem} from './modalListItem';

interface HeaderProps {
  data: any;
  isModal?: boolean;
  textStyle?: any;
  containerStyle?: ViewStyle;
  onPressContainer: () => void;
  onPressItem: (value: string) => void;
}

export const ModalContent: FC<HeaderProps> = ({
  data,
  textStyle,
  containerStyle,
  onPressItem,
}) => {
  return (
    <View style={containerStyle && containerStyle}>
      {data &&
        data.map((el: any) => {
          return (
            <ModalListItem
              data={el}
              onPress={onPressItem}
              key={el}
              textStyle={textStyle}
            />
          );
        })}
    </View>
  );
};
