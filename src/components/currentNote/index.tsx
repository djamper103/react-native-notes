import React, {FC} from 'react';
import {StyleSheet, Text} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {COLORS} from '../../constants/colors';
import {dh, dw} from '../../utils/dimensions';
import {TextContainer} from '../common/textContainer';
import {ViewContainer} from '../common/viewContainer';

export const CurrentNote: FC = (props: any) => {
  return (
    <>
      <ViewContainer
        onPress={props.route.params.func}
        data={
          <TextContainer
            textHeader="Edit"
            isTheme={props.route.params.isTheme}
            textHeaderStyle={[
              styles.textMain,
              props.route.params.fontSize === 'Small' && styles.textMainSmall,
              props.route.params.fontSize === 'Large' && styles.textMainLarge,
            ]}
          />
        }
        containerStyle={styles.containerEdit}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[
          styles.container,
          props.containerStyle && props.containerStyle,
        ]}>
        <Text
          style={[
            styles.textTitle,
            props.route.params.isTheme && styles.textActive,
            props.route.params.fontSize === 'Small' && styles.textTitleSmall,
            props.route.params.fontSize === 'Large' && styles.textTitleLarge,
          ]}>
          {props.route.params.data.title}
        </Text>
        <Text
          style={[
            styles.textDate,
            props.route.params.fontSize === 'Small' && styles.textDateSmall,
            props.route.params.fontSize === 'Large' && styles.textDateLarge,
          ]}>
          {props.route.params.data.date &&
            props.route.params.data.date.split('.')[0]}
        </Text>
        <Text
          style={[
            styles.textMain,
            props.route.params.isTheme && styles.textActive,
            props.route.params.fontSize === 'Small' && styles.textMainSmall,
            props.route.params.fontSize === 'Large' && styles.textMainLarge,
          ]}>
          {props.route.params.data.text}
        </Text>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: dw(10),
  },
  containerEdit: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    elevation: 2,
    position: 'absolute',
    top: dh(-53),
    left: dw(320),
  },
  textTitle: {
    fontSize: 34,
    color: COLORS.DUNE,
  },
  textTitleSmall: {
    fontSize: 30,
  },
  textTitleLarge: {
    fontSize: 38,
  },
  textDate: {
    fontSize: 20,
    color: COLORS.GHOST,
    marginVertical: dw(10),
  },
  textDateSmall: {
    fontSize: 16,
  },
  textDateLarge: {
    fontSize: 24,
  },
  textMain: {
    fontSize: 26,
    color: COLORS.DUNE,
  },
  textMainSmall: {
    fontSize: 22,
  },
  textMainLarge: {
    fontSize: 30,
  },
  textActive: {
    color: COLORS.WHITE,
  },
});
