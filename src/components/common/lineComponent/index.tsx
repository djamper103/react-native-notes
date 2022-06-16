import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS} from '../../../constants/colors';

interface LineComponentProps {
  containerStyle?: any;
}

export const LineComponent: FC<LineComponentProps> = ({containerStyle}) => {
  return <View style={[styles.container, containerStyle && containerStyle]} />;
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.5,
    borderColor: COLORS.GHOST,
  },
});
