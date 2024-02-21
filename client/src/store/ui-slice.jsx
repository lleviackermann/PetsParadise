import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    notification: null,
    views: null,
  },
  reducers: {
    showNotification(state, action) {
      state.notification = action.payload.notification;
    },
    removeNotification(state, action) {
      state.notification = null;
    },
    updateViews(state, action) {
      state.views = action.payload.views;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
