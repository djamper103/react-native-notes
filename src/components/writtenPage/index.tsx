import React, {FC, useEffect, useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {COLORS} from '../../constants/colors';
import {dw} from '../../utils/dimensions';
import {ViewContainer} from '../common/viewContainer';
import {IconContainer} from '../common/iconContainer';
import {Input} from '../input';
import {DONE_ICON} from '../../constants/images';
import {useAppDispatch} from '../../hooks/redux';
import {
  addNote,
  deleteNote,
} from '../../redux/store/actionCreator/actionCreator';
import {useIsFocused} from '@react-navigation/native';
import * as yup from 'yup';

let schema = yup.object().shape({
  title: yup.string().min(3).max(15),
  text: yup.string().min(3).max(500),
});

export const WrittenPage: FC = (props: any) => {
  const isFocused = useIsFocused();

  const dispatch = useAppDispatch();

  const [inputTitle, setinputTitle] = useState('');
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    if (props.route.params) {
      setinputTitle(props.route.params.value.title);
      setInputText(props.route.params.value.text);
    }
  }, [
    props.route.params,
    props.route.params.value.text,
    props.route.params.value.title,
  ]);

  useEffect(() => {
    if (!isFocused) {
      setinputTitle('');
      setInputText('');
    }
  }, [isFocused]);

  const onSubmit = () => {
    schema
      .validate({title: inputTitle, text: inputText})
      .then(() => {
        dispatch(
          addNote({
            title: inputTitle,
            text: inputText,
            date: '',
          }),
        );
        props.route.params.value.date !== undefined &&
          dispatch(
            deleteNote({
              title: props.route.params.value.title,
              text: props.route.params.value.text,
              date: props.route.params.value.date,
            }),
          );
      })
      .then(() => props.navigation.navigate('Notes'))
      .catch(err => {
        Alert.alert(`${err}`);
      });
  };

  return (
    <View
      style={[
        styles.container,
        props.route.params && props.route.params.containerStyle,
      ]}>
      <ViewContainer
        data={<IconContainer icon={DONE_ICON} imageStyle={styles.image} />}
        onPress={onSubmit}
      />
      <Input
        text={inputTitle}
        containerStyle={styles.containerTitle}
        inputStyle={styles.inputTitle}
        placeholder={'Title'}
        maxLength={15}
        onChangeText={setinputTitle}
      />
      <Input
        text={inputText}
        containerStyle={styles.containerMainText}
        placeholder={'Type something...'}
        inputStyle={styles.inputStyle}
        maxLength={500}
        onChangeText={setInputText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  containerTitle: {
    alignItems: 'flex-start',
  },
  containerMainText: {
    alignItems: 'flex-start',
    height: '100%',
  },
  circleText: {
    fontSize: 35,
    color: COLORS.WHITE,
  },
  inputTitle: {
    fontSize: 30,
  },
  image: {
    tintColor: COLORS.WHITE,
  },
  text: {
    color: COLORS.DUNE,
    textAlign: 'center',
    fontSize: 18,
    marginVertical: dw(5),
  },
  inputStyle: {
    fontSize: 24,
  },
});
