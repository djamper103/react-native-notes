import React, {FC, useCallback, useEffect, useState} from 'react';
import {FlatList, StyleSheet, View, ViewStyle} from 'react-native';
import {COLORS} from '../../constants/colors';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {NotesListType} from '../../types/notes';
import {dh, dw} from '../../utils/dimensions';
import {Search} from '../search';
import {HomeListItem} from './components/homeList';
import {
  deleteHighlightedNotes,
  deleteNote,
  setHighlightedNotes,
  setNote,
} from '../../redux/store/actionCreator/actionCreator';
import {ifJson} from '../functions/ifJson';
import {modalDataAllItem, modalDataCurrenItem} from '../../constants/data';
import {IconContainer} from '../common/iconContainer';
import {PLUS_ICON} from '../../constants/images';
import {ModalContent} from '../common/modalContent';
import {useIsFocused} from '@react-navigation/native';

interface HomeProps {
  navigation?: any;
  containerStyle?: ViewStyle;
  props: any;
}

export const Home: FC<HomeProps> = props => {
  const [state, setState] = useState<NotesListType[]>([]);
  const [textSearch, setTextSearch] = useState('');

  const {notesData} = useAppSelector(reducer => reducer.notesDataReducer);
  const {isTheme} = useAppSelector(reducer => reducer.themeReducer);
  const {fontSize} = useAppSelector(reducer => reducer.fontReducer);
  const {highlightedNotes} = useAppSelector(
    reducer => reducer.highlightedSlice,
  );

  const [isModal, setIsModal] = useState(false);
  const [modalItem, setModalItem] = useState<any>();

  const isFocused = useIsFocused();

  const dispatch = useAppDispatch();

  useEffect(() => {
    ifJson('Notes', setNote, dispatch);
  }, [dispatch]);

  const onPressModal = (type?: string, value?: any) => {
    value && setModalItem(value);
    if (type === 'Delete') {
      dispatch(setHighlightedNotes([]));
      dispatch(deleteNote(modalItem));
      setModalState();
    } else if (type === 'Highlight') {
      value && dispatch(setHighlightedNotes(value));
    } else if (type === 'Delete All') {
      setModalState();
      dispatch(deleteHighlightedNotes(highlightedNotes));
    } else if (type === 'Deselect All') {
      setModalState();
      dispatch(setHighlightedNotes([]));
    } else if (type === 'Select All') {
      dispatch(setHighlightedNotes(notesData));
    } else {
      setModalItem(false);
      props.navigation.navigate('New Note', {
        value: value ? value : {text: '', title: ''},
        isTheme,
      });
    }
  };

  const onSearch = useCallback(
    (value: string) => {
      if (value !== '') {
        setTextSearch(value);
        let filter = notesData.filter(el => el.title === value);
        setState(filter);
      } else {
        setTextSearch('');
        setState([]);
      }
    },
    [notesData],
  );

  const uploadData = () => {
    onSearch('');
  };

  useEffect(() => {
    onSearch(textSearch);
  }, [notesData, onSearch, textSearch]);

  const setModalState = (value?: boolean) => {
    setIsModal(value ? value : !isModal);
  };

  useEffect(() => {
    if (!isFocused) {
      dispatch(setHighlightedNotes([]));
      setIsModal(false);
    }
  }, [dispatch, isFocused]);

  useEffect(() => {
    highlightedNotes.length === 0 && setIsModal(false);
  }, [highlightedNotes]);

  const renderItem: any = ({item}: {item: any}) => {
    return (
      <HomeListItem
        data={item}
        navigation={props.navigation}
        isTheme={isTheme}
        modalData={
          highlightedNotes.length > 1 ? modalDataAllItem : modalDataCurrenItem
        }
        fontSize={fontSize}
        highlightedNotes={highlightedNotes}
        onPressModal={onPressModal}
        setModalState={setModalState}
      />
    );
  };

  return (
    <View>
      <View>
        <FlatList<NotesListType>
          data={state.length > 0 ? state : notesData}
          bounces={false}
          keyExtractor={item => item.date}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          refreshing={false}
          style={isModal && styles.containerList}
          // style={notesData.length >= 4 && isModal && styles.containerList}
          columnWrapperStyle={styles.container}
          onRefresh={uploadData}
          ListHeaderComponent={
            <Search onSearch={onSearch} isFocused={isFocused} />
          }
        />
      </View>
      {!isModal && (
        <IconContainer
          icon={PLUS_ICON}
          imageStyle={styles.image}
          containerStyle={styles.containerImage}
          onPress={onPressModal}
        />
      )}
      {isModal && (
        <View
          style={[
            styles.containerModal,
            highlightedNotes.length > 1 && styles.containerModalAll,
          ]}>
          <ModalContent
            data={
              highlightedNotes.length > 1
                ? modalDataAllItem
                : modalDataCurrenItem
            }
            isModal={isModal}
            color={COLORS.WHITE}
            containerStyle={styles.containerModalStyle}
            onPressItem={onPressModal}
            isData={true}
            textStyle={[
              styles.textModal,
              highlightedNotes.length > 1 && styles.textModalLong,
              fontSize === 'Small' && styles.textModalSmall,
            ]}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    paddingHorizontal: dw(10),
  },
  containerModal: {
    paddingVertical: dw(25),
    paddingHorizontal: dw(35),
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    top: dh(580),
    borderTopWidth: 0.6,
    borderColor: COLORS.GHOST,
    backgroundColor: COLORS.WHITE,
  },
  containerModalStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  containerModalAll: {
    paddingHorizontal: dw(12),
  },
  containerList: {
    marginBottom: dh(80),
  },
  containerImage: {
    position: 'absolute',
    top: dh(575),
    left: dw(290),
    backgroundColor: COLORS.DODGER_BLUE,
    width: dw(60),
    height: dw(60),
    borderRadius: dw(60),
    shadowColor: COLORS.MIRAGE,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.58,
    shadowRadius: 5.0,
    elevation: 10,
  },
  image: {
    tintColor: COLORS.WHITE,
  },
  textModal: {
    color: COLORS.MIRAGE,
    fontSize: 22,
  },
  textModalSmall: {
    fontSize: 18,
  },
  textModalLong: {
    fontSize: 20,
  },
});
