import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Project, ProjectsState } from "../types";

// Initial state
const initialState: ProjectsState = {
  data: [],
  loading: false,
  error: null,
  selectedProject: null,
};

// Create async thunk for fetching projects
export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
        }/api/projects`,
        {
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch projects");
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

// Create async thunk for fetching a single project
export const fetchProject = createAsyncThunk(
  "projects/fetchProject",
  async (id: string | number, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
        }/api/projects`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch project");
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
const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    resetProjectError(state) {
      state.error = null;
    },
    clearSelectedProject(state) {
      state.selectedProject = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchProjects
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProjects.fulfilled,
        (state, action: PayloadAction<Project[]>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Handle fetchProject
      .addCase(fetchProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProject.fulfilled,
        (state, action: PayloadAction<Project>) => {
          state.loading = false;
          state.selectedProject = action.payload;
        }
      )
      .addCase(fetchProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetProjectError, clearSelectedProject } =
  projectsSlice.actions;
export default projectsSlice.reducer;
