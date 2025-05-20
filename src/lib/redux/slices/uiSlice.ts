import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UIState } from "../types";

// Initial state
const initialState: UIState = {
  connectionStatus: {
    status: "unknown",
    message: "",
  },
  notifications: [],
  theme: "system",
};

// Create the slice
const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setConnectionStatus(
      state,
      action: PayloadAction<{
        status: "connected" | "disconnected" | "warning" | "unknown";
        message: string;
      }>
    ) {
      state.connectionStatus = action.payload;
    },
    addNotification(
      state,
      action: PayloadAction<{
        type: "success" | "error" | "warning" | "info";
        message: string;
        timeout?: number;
      }>
    ) {
      const id = Date.now().toString();
      state.notifications.push({
        id,
        ...action.payload,
      });
    },
    removeNotification(state, action: PayloadAction<string>) {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    },
    clearNotifications(state) {
      state.notifications = [];
    },
    setTheme(state, action: PayloadAction<"light" | "dark" | "system">) {
      state.theme = action.payload;
    },
  },
});

export const {
  setConnectionStatus,
  addNotification,
  removeNotification,
  clearNotifications,
  setTheme,
} = uiSlice.actions;
export default uiSlice.reducer;
