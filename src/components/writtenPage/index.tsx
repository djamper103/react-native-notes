import React, {FC} from 'react';
import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import {COLORS} from '../../constants/colors';
import {dw} from '../../utils/dimensions';
import {ViewContainer} from '../common/viewContainer';
import {IconContainer} from '../common/iconContainer';
import {Input} from '../input';
import {DONE_ICON} from '../../constants/images';
import {useAppDispatch} from '../../hooks/redux';
import {addNote} from '../../redux/store/actionCreator/actionCreator';
import {useForm, Controller} from 'react-hook-form';

interface WrittenPageProps {
  containerStyle?: ViewStyle;
}

export const WrittenPage: FC<WrittenPageProps> = ({containerStyle}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm({
    defaultValues: {
      title: '',
      text: '',
    },
  });
  const dispatch = useAppDispatch();

  const onSubmit = async (data: any) => {
    dispatch(addNote(data));
    reset();
  };
  return (
    <View style={[styles.container, containerStyle && containerStyle]}>
      <ViewContainer
        data={<IconContainer icon={DONE_ICON} imageStyle={styles.image} />}
        onPress={handleSubmit(onSubmit)}
      />
      <Controller
        control={control}
        rules={{
          maxLength: 15,
          minLength: 3,
          required: true,
        }}
        render={({field: {onChange, value}}) => (
          <Input
            text={value}
            containerStyle={styles.containerTitle}
            inputStyle={styles.inputTitle}
            placeholder={'Title'}
            maxLength={15}
            onChangeText={onChange}
          />
        )}
        name="title"
      />
      {errors.title && (
        <Text style={styles.text}>
          Enter title correctly minimum Length 3, maximum 15
        </Text>
      )}

      <Controller
        control={control}
        rules={{
          maxLength: 500,
          minLength: 3,
          required: true,
        }}
        render={({field: {onChange, value}}) => (
          <Input
            text={value}
            containerStyle={styles.containerMainText}
            placeholder={'Type something...'}
            inputStyle={styles.inputStyle}
            maxLength={500}
            onChangeText={onChange}
          />
        )}
        name="text"
      />
      {/* {errors.text && (
        <Text style={styles.text}>
          Enter text correctly minimum Length 3, maximum 150
        </Text>
      )} */}
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
