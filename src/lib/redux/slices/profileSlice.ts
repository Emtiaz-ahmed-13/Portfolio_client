import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Profile, ProfileState } from "../types";

// Initial state
const initialState: ProfileState = {
  data: null,
  loading: false,
  error: null,
};

// Create async thunk for fetching profile
export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
        }/api/profile`,
        {
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

// Create the slice
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    resetProfileError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProfile.fulfilled,
        (state, action: PayloadAction<Profile>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetProfileError } = profileSlice.actions;
export default profileSlice.reducer;
