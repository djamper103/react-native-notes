import {combineReducers, configureStore} from '@reduxjs/toolkit';
import themeReducer from './reducers/themeSlice';
import notesDataReducer from './reducers/notesDataSlice';
import fontReducer from './reducers/fontSlece';
import highlightedSlice from './reducers/highlightedNotes';

const rootReducer = combineReducers({
  themeReducer,
  notesDataReducer,
  fontReducer,
  highlightedSlice,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
