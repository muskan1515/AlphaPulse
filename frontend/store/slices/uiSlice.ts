import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  loading: boolean;
  message: string | null;
  type: "success" | "error" | "info" | null;
}

const initialState: UIState = {
  loading: false,
  message: null,
  type: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    showLoader: (state) => {
      state.loading = true;
    },
    hideLoader: (state) => {
      state.loading = false;
    },
    showMessage: (
      state,
      action: PayloadAction<{ message: string; type: "success" | "error" | "info" }>
    ) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    clearMessage: (state) => {
      state.message = null;
      state.type = null;
    },
  },
});

export const { showLoader, hideLoader, showMessage, clearMessage } = uiSlice.actions;
export default uiSlice.reducer;
