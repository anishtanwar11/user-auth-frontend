import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './slices/authSlice.js';
import notebookReducer from "./slices/notebookSlice.js";

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

// Combine the Reducers
const rootReducer = combineReducers({
  auth: authReducer,
  books: notebookReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer
});

export const persistor = persistStore(store);
export default store;
