import React, {FC, useEffect, useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {COLORS} from '../../constants/colors';
import {dh, dw} from '../../utils/dimensions';
import {Input} from '../input';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {
  addNote,
  deleteNote,
} from '../../redux/store/actionCreator/actionCreator';
import {useIsFocused} from '@react-navigation/native';
import * as yup from 'yup';
import {ScrollView} from 'react-native-gesture-handler';
import {ModalContent} from '../common/modalContent';
import {modalDataColor} from '../../constants/data';
import {IconContainer} from '../common/iconContainer';
import {DONE_ICON} from '../../constants/images';

let schema = yup.object().shape({
  title: yup.string().min(3).max(15),
  text: yup.string().min(3).max(1000),
});

export const WrittenPage: FC = (props: any) => {
  const {fontSize} = useAppSelector(reducer => reducer.fontReducer);

  const isFocused = useIsFocused();

  const dispatch = useAppDispatch();

  const [inputTitle, setInputTitle] = useState('');
  const [inputText, setInputText] = useState('');
  const [color, setColor] = useState('white');

  useEffect(() => {
    if (props.route.params) {
      setInputTitle(props.route.params.value.title);
      setInputText(props.route.params.value.text);
    }
  }, [
    props.route.params,
    props.route.params.value.text,
    props.route.params.value.title,
  ]);

  useEffect(() => {
    if (!isFocused) {
      setInputTitle('');
      setInputText('');
      setColor('');
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
            color,
          }),
        );
        props.route.params.value.date !== undefined &&
          dispatch(
            deleteNote({
              title: props.route.params.value.title,
              text: props.route.params.value.text,
              date: props.route.params.value.date,
              color,
            }),
          );
      })
      .then(() => props.navigation.navigate('Notes'))
      .catch(err => {
        Alert.alert(`${err}`);
      });
  };

  const onPressItem = (value: string) => {
    setColor(value);
  };

  return (
    <>
      {modalDataColor && (
        <View style={styles.containerModal}>
          <ModalContent
            data={modalDataColor}
            isModal={false}
            color={props.route.params.value.color}
            containerStyle={styles.containerModalStyle}
            containerStyleItem={styles.containerStyleItem}
            onPressItem={onPressItem}
          />
          <IconContainer
            icon={DONE_ICON}
            imageStyle={styles.image}
            containerStyle={styles.onSubmit}
            onPress={onSubmit}
          />
        </View>
      )}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[
          styles.container,
          props.route.params && props.route.params.containerStyle,
        ]}>
        <Input
          text={inputTitle}
          containerStyle={[
            styles.containerInput,
            props.route.params.isTheme && styles.containerInputActive,
          ]}
          inputStyle={[
            styles.inputTitle,
            props.route.params.isTheme && styles.inputStyleActive,
            fontSize === 'Small' && styles.inputTitleSmall,
            fontSize === 'Large' && styles.inputTitleLarge,
          ]}
          placeholder={'Title'}
          maxLength={15}
          placeholderTextColor={
            props.route.params.isTheme ? COLORS.WHITE : COLORS.MIRAGE
          }
          onChangeText={setInputTitle}
        />
        <Input
          text={inputText}
          containerStyle={[
            styles.containerInput,
            props.route.params.isTheme && styles.containerInputActive,
          ]}
          placeholder={'Type something...'}
          inputStyle={[
            styles.inputStyle,
            props.route.params.isTheme && styles.inputStyleActive,
            fontSize === 'Small' && styles.inputStyleSmall,
            fontSize === 'Large' && styles.inputStyleLarge,
          ]}
          maxLength={1000}
          placeholderTextColor={
            props.route.params.isTheme ? COLORS.WHITE : COLORS.MIRAGE
          }
          onChangeText={setInputText}
        />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {flexGrow: 1},
  containerInput: {
    alignItems: 'flex-start',
  },
  containerInputActive: {
    backgroundColor: COLORS.MIRAGE,
  },
  containerModal: {
    paddingVertical: dw(20),
    paddingHorizontal: dw(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.WHITE,
    position: 'absolute',
    width: '100%',
    top: dh(626),
    zIndex: 1,
    elevation: 7,
    borderTopWidth: dw(0.6),
    borderColor: COLORS.MIRAGE,
  },
  containerModalStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
  },
  containerStyleItem: {
    width: dw(55),
    height: dw(55),
    borderRadius: dw(10),
    shadowColor: COLORS.DUNE,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  onSubmit: {
    alignItems: 'center',
    justifyContent: 'center',
    width: dw(55),
    height: dw(55),
    borderRadius: dw(50),
    backgroundColor: COLORS.DODGER_BLUE,
  },
  inputTitle: {
    fontSize: 30,
  },
  inputTitleSmall: {
    fontSize: 26,
  },
  inputTitleLarge: {
    fontSize: 34,
  },
  image: {
    tintColor: COLORS.WHITE,
  },
  inputStyle: {
    fontSize: 24,
  },
  inputStyleSmall: {
    fontSize: 20,
  },
  inputStyleLarge: {
    fontSize: 28,
  },
  inputStyleActive: {
    color: COLORS.WHITE,
  },
});
