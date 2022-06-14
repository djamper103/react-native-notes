import {createSlice} from '@reduxjs/toolkit';
import {storageLocal} from '../../../constants/common';
import {NotesListType} from '../../../types/notes';

interface NotesDataSliceState {
  notesData: NotesListType[];
}

const initialState: NotesDataSliceState = {
  notesData: [],
};

export const NotesDataSlice = createSlice({
  name: 'notesData',
  initialState: initialState,
  reducers: {
    setNotesData(state, action) {
      state.notesData = action.payload;
    },
    addNotesData(state, action) {
      action.payload.date =
        new Date().toDateString().split(' ').splice(1, 3).join(' ') +
        '.' +
        new Date().toJSON().split('T')[1].split('.')[0];
      storageLocal.set(
        'Notes',
        JSON.stringify([action.payload, ...state.notesData]),
      );
      state.notesData = [action.payload, ...state.notesData];
    },
    deleteNotesData(state, action) {
      state.notesData = state.notesData.filter(
        el => el.date + el.title !== action.payload.date + action.payload.title,
      );
      storageLocal.set('Notes', JSON.stringify(state.notesData));
    },
  },
});

export default NotesDataSlice.reducer;
