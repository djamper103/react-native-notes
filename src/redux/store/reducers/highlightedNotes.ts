import {createSlice} from '@reduxjs/toolkit';
import {NotesListType} from '../../../types/notes';

interface HighlightedNotesState {
  highlightedNotes: NotesListType[];
}

const initialState: HighlightedNotesState = {
  highlightedNotes: [],
};

export const HighlightedNotesSlice = createSlice({
  name: 'HighlightedNotes',
  initialState: initialState,
  reducers: {
    setHighlightedNotes(state, action) {
      if (state.highlightedNotes.length > 0) {
        if (action.payload) {
          if (action.payload.length !== undefined) {
            state.highlightedNotes = action.payload;
          } else {
            state.highlightedNotes.filter(el => {
              if (el.date !== action.payload.date) {
                state.highlightedNotes = [
                  ...state.highlightedNotes,
                  action.payload,
                ];
              } else {
                state.highlightedNotes = state.highlightedNotes.filter(
                  elm => elm.date !== action.payload.date,
                );
              }
            });
          }
        } else {
          state.highlightedNotes = [];
        }
      } else {
        if (action.payload.length !== undefined) {
          state.highlightedNotes = action.payload;
        } else {
          state.highlightedNotes = [...state.highlightedNotes, action.payload];
        }
      }
    },
  },
});

export default HighlightedNotesSlice.reducer;
