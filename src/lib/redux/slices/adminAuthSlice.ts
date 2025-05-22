import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AdminAuthState {
  isLoggedIn: boolean;
  user: string | null;
  error: string | null;
  isLoading: boolean;
}

const initialState: AdminAuthState = {
  isLoggedIn: false,
  user: null,
  error: null,
  isLoading: false,
};

// Async thunk for login
export const loginAsync = createAsyncThunk(
  "adminAuth/loginAsync",
  async (
    { username, password }: { username: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || "Login failed");
      }

      return { username };
    } catch (error) {
      return rejectWithValue("An error occurred during login");
    }
  }
);

// Check authentication status
export const checkAuth = createAsyncThunk(
  "adminAuth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/admin/check-auth");
      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue("Not authenticated");
      }

      return { authenticated: true };
    } catch (error) {
      return rejectWithValue("Authentication check failed");
    }
  }
);

export const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {
    // Simple login for client-side only auth (primarily for demo/testing)
    login: (
      state,
      action: PayloadAction<{ username: string; password: string }>
    ) => {
      // Hardcoded credentials for now
      if (
        action.payload.username === "admin" &&
        action.payload.password === "admin123"
      ) {
        state.isLoggedIn = true;
        state.user = action.payload.username;
        state.error = null;
      } else {
        state.isLoggedIn = false;
        state.user = null;
        state.error = "Invalid username or password";
      }
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.user = action.payload.username;
        state.error = null;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.error = action.payload as string;
      })
      .addCase(checkAuth.fulfilled, (state) => {
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoggedIn = false;
        state.user = null;
      });
  },
});

export const { login, logout, setError } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
