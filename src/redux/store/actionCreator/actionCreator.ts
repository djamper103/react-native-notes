import {AppDispatch} from '../store';
import {ThemeSlice} from '../reducers/themeSlice';
import {NotesListType} from '../../../types/notes';
import {NotesDataSlice} from '../reducers/notesDataSlice';
import {FontSlice} from '../reducers/fontSlece';
import {storageLocal} from '../../../constants/common';
import {HighlightedNotesSlice} from '../reducers/highlightedNotes';

export const setTheme = () => (dispatch: AppDispatch) => {
  dispatch(ThemeSlice.actions.setTheme());
};

export const setNote = (item: any) => (dispatch: AppDispatch) => {
  dispatch(NotesDataSlice.actions.setNotesData(item));
};

export const addNote = (item: NotesListType) => (dispatch: AppDispatch) => {
  dispatch(NotesDataSlice.actions.addNotesData(item));
};

export const deleteNote = (item: NotesListType) => (dispatch: AppDispatch) => {
  dispatch(NotesDataSlice.actions.deleteNotesData(item));
};

export const setFont = (item: string) => (dispatch: AppDispatch) => {
  storageLocal.set('FontSize', JSON.stringify(item));
  dispatch(FontSlice.actions.setFont(item));
};

export const defaultFont = () => (dispatch: AppDispatch) => {
  const json = storageLocal.getString('FontSize');
  if (json !== undefined) {
    dispatch(FontSlice.actions.setFont(json));
  }
};

export const setHighlightedNotes = (item?: any) => (dispatch: AppDispatch) => {
  dispatch(HighlightedNotesSlice.actions.setHighlightedNotes(item));
};

export const deleteHighlightedNotes =
  (item: NotesListType[]) => (dispatch: AppDispatch) => {
    item.forEach(el => dispatch(deleteNote(el)));
    dispatch(HighlightedNotesSlice.actions.setHighlightedNotes([]));
  };
