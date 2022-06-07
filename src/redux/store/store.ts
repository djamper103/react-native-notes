import {combineReducers, configureStore} from '@reduxjs/toolkit';
import themeReducer from './reducers/themeSlice';
import notesDataReducer from './reducers/notesDataSlice';

const rootReducer = combineReducers({
  themeReducer,
  notesDataReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
