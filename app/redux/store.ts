import thunk from "redux-thunk";
import appReducer from "./ducks";
import { applyMiddleware, createStore } from "redux";

const middlewares = [thunk];

const store = createStore(appReducer, applyMiddleware(...middlewares));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
