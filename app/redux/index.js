import { configureStore } from '@reduxjs/toolkit';
import { applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import reducers from './reducer'; // Import the root reducer

const persistConfig = {
  key: 'CarGasm',
  storage: AsyncStorage,
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedReducer = persistReducer(persistConfig, reducers); // Corrected: pass reducers directly to persistReducer

const enhancer = composeEnhancers(applyMiddleware(thunk));

const store = configureStore({
  reducer: persistedReducer, // Corrected: pass persistedReducer as reducer
  enhancer: [enhancer],
});

export const persistor = persistStore(store);

export default store;

