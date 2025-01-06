import UserSclice from "./UserSclice";
import TweetSclice from "./TweetSclice";
import { createRoot } from 'react-dom/client'
import { configureStore,combineReducers } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
  }
  const rootReducer= combineReducers({
    user:UserSclice,
    tweet:TweetSclice,
  })
  const persistedReducer = persistReducer(persistConfig, rootReducer)  

const store= configureStore({
    reducer:persistedReducer
});


export default store;