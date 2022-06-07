import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../../constants/colors';
import {dw} from '../../utils/dimensions';

export const CurrentNote: FC = (props: any) => {
  return (
    <View
      style={[styles.container, props.containerStyle && props.containerStyle]}>
      <Text
        style={[
          styles.textTitle,
          props.route.params.isTheme && styles.textActive,
        ]}>
        {props.route.params.data.title}
      </Text>
      <Text
        style={[
          styles.textDate,
          props.route.params.isTheme && styles.textActive,
        ]}>
        {props.route.params.data.date &&
          props.route.params.data.date.split('.')[0]}
      </Text>
      <Text
        style={[
          styles.textMain,
          props.route.params.isTheme && styles.textActive,
        ]}>
        {props.route.params.data.text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: dw(10),
  },
  textTitle: {
    fontSize: 30,
    color: COLORS.DUNE,
  },
  textDate: {
    fontSize: 18,
    color: COLORS.GHOST,
    marginVertical: dw(10),
  },
  textMain: {
    fontSize: 24,
    color: COLORS.DUNE,
  },
  textActive: {},
});
