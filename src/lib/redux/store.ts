import { configureStore } from "@reduxjs/toolkit";
import {
  AuthState,
  BlogsState,
  ProfileState,
  ProjectsState,
  UIState,
} from "./types";

// Import only authReducer that actually exists
import authReducer from "./slices/authSlice";

// Create initial state for slices
const initialBlogsState: BlogsState = {
  data: [],
  loading: false,
  error: null,
  selectedBlog: null,
  submitStatus: "idle",
};

const initialUIState: UIState = {
  connectionStatus: {
    status: "unknown",
    message: "",
  },
  notifications: [],
  theme: "system",
};

const initialProfileState: ProfileState = {
  data: null,
  loading: false,
  error: null,
};

const initialProjectsState: ProjectsState = {
  data: [],
  loading: false,
  error: null,
  selectedProject: null,
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    blogs: (state = initialBlogsState) => state,
    ui: (state = initialUIState) => state,
    profile: (state = initialProfileState) => state,
    projects: (state = initialProjectsState) => state,
  },
  // Add middleware or other configuration as needed
});

// Export types
export type RootState = {
  auth: AuthState;
  blogs: BlogsState;
  ui: UIState;
  profile: ProfileState;
  projects: ProjectsState;
};
export type AppDispatch = typeof store.dispatch;
