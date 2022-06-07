import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import {COLORS} from '../../../../constants/colors';
import {IconContainer} from '../../../common/iconContainer';

interface IconContentProps {
  data: any;
  isTheme?: any;
  onPress: (value: string) => void;
  onPressMenu: () => void;
}

export const IconContent: FC<IconContentProps> = ({
  data,
  isTheme,
  onPress,
  onPressMenu,
}) => {
  const onPressItem = () => {
    data.name === 'Menu' ? onPressMenu() : onPress(data.name);
  };
  return (
    <IconContainer
      icon={data.icon}
      imageStyle={isTheme ? styles.imageStyleActive : styles.imageStyle}
      onPress={onPressItem}
    />
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    tintColor: COLORS.DODGER_BLUE,
  },
  imageStyleActive: {
    tintColor: COLORS.WHITE,
  },
});
