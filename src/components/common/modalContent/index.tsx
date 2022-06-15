import React, {FC, useState} from 'react';
import {View, ViewStyle} from 'react-native';
import {ModalListItem} from './modalListItem';

interface HeaderProps {
  data: any;
  isModal?: boolean;
  isData?: boolean;
  textStyle?: any;
  containerStyle?: any;
  containerStyleItem?: ViewStyle;
  onPressItem: (value: string) => void;
}

export const ModalContent: FC<HeaderProps> = ({
  data,
  isData,
  textStyle,
  containerStyle,
  containerStyleItem,
  onPressItem,
}) => {
  const [isItem, setIsItem] = useState('white');
  const handleItemPress = (item: any) => {
    onPressItem(item);
    setIsItem(item);
  };
  return (
    <View style={containerStyle && containerStyle}>
      {data &&
        data.map((el: any) => {
          return (
            <ModalListItem
              data={el}
              key={el}
              isData={isData}
              isItem={isItem}
              textStyle={textStyle}
              containerStyle={containerStyleItem}
              onPress={handleItemPress}
            />
          );
        })}
    </View>
  );
};
