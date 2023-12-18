import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { alertsSlice } from "./alertReducer";

const rootReducer = combineReducers({
  alerts: alertsSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
