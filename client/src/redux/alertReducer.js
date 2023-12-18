import { createSlice } from "@reduxjs/toolkit";

const alertsSlice = createSlice({
  name: "alerts",
  initialState: {
    loading: false,
  },
  reducers: {
    showLoader: (state) => {
      state.loading = true;
    },
    closeLoader: (state) => {
      state.loading = false;
    },
  },
});

export const { showLoader, closeLoader } = alertsSlice.actions;
export { alertsSlice };
