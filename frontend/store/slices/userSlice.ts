import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface UserState {
  id?: string;
  name?: string;
  email?: string;
  token?: string;
  isLoggedIn: boolean;
  loading: boolean;
  error?: string;
}

// Initial state
const initialState: UserState = {
  id: undefined,
  name: undefined,
  email: undefined,
  token: undefined,
  isLoggedIn: false,
  loading: false,
  error: undefined,
};

// Async thunk for login
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (
    payload: { email?: string; password?: string; googleId?: string },
    { rejectWithValue }
  ) => {
    try {
      // Replace with your real API endpoint
      const response = await axios.post("/api/auth/login", payload);
      return response.data; // expected: {id, name, email, token}
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

// Async thunk for signup
export const signupUser = createAsyncThunk(
  "user/signupUser",
  async (
    payload: { name: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post("/api/auth/signup", payload);
      return response.data; // expected: {id, name, email, token}
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Signup failed");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.id = undefined;
      state.name = undefined;
      state.email = undefined;
      state.token = undefined;
      state.isLoggedIn = false;
      state.error = undefined;
      state.loading = false;
    },
    clearError: (state) => {
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(
      loginUser.fulfilled,
      (state, action: PayloadAction<{ id: string; name: string; email: string; token: string }>) => {
        state.id = action.payload.id;
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.loading = false;
      }
    );
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Signup
    builder.addCase(signupUser.pending, (state) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(
      signupUser.fulfilled,
      (state, action: PayloadAction<{ id: string; name: string; email: string; token: string }>) => {
        state.id = action.payload.id;
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.loading = false;
      }
    );
    builder.addCase(signupUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { logout, clearError } = userSlice.actions;
export default userSlice.reducer;
