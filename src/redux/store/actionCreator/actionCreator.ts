import {AppDispatch} from '../store';
import {ThemeSlice} from '../reducers/themeSlice';
import {NotesListType} from '../../../types/notes';
import {NotesDataSlice} from '../reducers/notesDataSlice';

export const setTheme = () => (dispatch: AppDispatch) => {
  dispatch(ThemeSlice.actions.setTheme());
};

export const setNote = (item: NotesListType) => (dispatch: AppDispatch) => {
  dispatch(NotesDataSlice.actions.setNotesData(item));
};

export const addNote = (item: NotesListType) => (dispatch: AppDispatch) => {
  dispatch(NotesDataSlice.actions.addNotesData(item));
};

export const deleteNote = (item: NotesListType) => (dispatch: AppDispatch) => {
  dispatch(NotesDataSlice.actions.deleteNotesData(item));
};
