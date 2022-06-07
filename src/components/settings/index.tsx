import React, {FC} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {TextContainer} from '../common/textContainer';

interface SettingsProps {
  containerStyle?: ViewStyle;
}

export const Settings: FC<SettingsProps> = ({containerStyle}) => {
  return (
    <View style={[styles.container, containerStyle && containerStyle]}>
      <TextContainer textHeader="Settings" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});
