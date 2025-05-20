import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "../types";

// Initial state
const initialState: AuthState = {
  token: null,
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Create the slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    setUser(state, action: PayloadAction<unknown>) {
      state.user = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    clearAuth(state) {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
});

export const { setToken, setUser, setLoading, setError, clearAuth } =
  authSlice.actions;
export default authSlice.reducer;
