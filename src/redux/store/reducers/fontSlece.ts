import {createSlice} from '@reduxjs/toolkit';

interface FontState {
  fontSize: string;
}

const initialState: FontState = {
  fontSize: 'Medium',
};

export const FontSlice = createSlice({
  name: 'font',
  initialState: initialState,
  reducers: {
    setFont(state, action) {
      state.fontSize = action.payload;
    },
  },
});

export default FontSlice.reducer;
