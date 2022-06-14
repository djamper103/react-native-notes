import React, {FC, useEffect} from 'react';
import {FlatList, StyleSheet, View, ViewStyle} from 'react-native';
import {COLORS} from '../../constants/colors';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {NotesListType} from '../../types/notes';
import {dw} from '../../utils/dimensions';
import {ViewContainer} from '../common/viewContainer';
import {TextContainer} from '../common/textContainer';
import {Search} from '../search';
import {HomeListItem} from './components/homeList';
import {
  deleteNote,
  setNote,
} from '../../redux/store/actionCreator/actionCreator';
import {ifJson} from '../functions/ifJson';
import {modalDataCurrenItem} from '../../constants/data';

interface HomeProps {
  navigation?: any;
  containerStyle?: ViewStyle;
  props: any;
}

export const Home: FC<HomeProps> = props => {
  const {notesData} = useAppSelector(reducer => reducer.notesDataReducer);
  const {isTheme} = useAppSelector(reducer => reducer.themeReducer);

  const dispatch = useAppDispatch();

  const onPressModal = (type?: string, value?: any) => {
    if (type === 'Delete') {
      dispatch(deleteNote(value));
    } else {
      props.navigation.navigate('New Note', {
        value: value ? value : {text: '', title: ''},
      });
    }
  };
  const uploadData = () => {};
  const onSearch = () => {};

  useEffect(() => {
    ifJson('Notes', setNote, dispatch);
  }, [dispatch]);

  const renderItem: any = ({item}: {item: any}) => {
    return (
      <HomeListItem
        data={item}
        navigation={props.navigation}
        isTheme={isTheme}
        modalData={modalDataCurrenItem}
        containerModalStyle={styles.containerModal}
        onPressModal={onPressModal}
      />
    );
  };
  return (
    <>
      <ViewContainer
        data={
          <TextContainer textHeaderStyle={styles.circleText} textHeader={'+'} />
        }
        onPress={onPressModal}
      />
      <View>
        <FlatList<NotesListType>
          data={notesData}
          bounces={false}
          keyExtractor={item => item.date}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          refreshing={false}
          onRefresh={uploadData}
          ListHeaderComponent={<Search onSearch={onSearch} />}
          columnWrapperStyle={styles.container}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    paddingHorizontal: dw(10),
  },
  circleText: {
    fontSize: 35,
    color: COLORS.WHITE,
  },
  containerModal: {
    width: '100%',
    paddingVertical: dw(20),
    paddingHorizontal: dw(120),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.MIRAGE,
  },
});
