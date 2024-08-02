import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";
import secureLocalStorage from "react-secure-storage";
import { toast } from "react-toastify";

export const register = createAsyncThunk(
  "accounts/signup/",
  async (userData, thunkAPI) => {
    try {
      console.log("working", userData);
      const response = await authService.register(userData);
      toast.success("Registration successful!");
      return response;
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "An error occurred"
      );
    }
  }
);

export const login = createAsyncThunk(
  "accounts/login/",
  async (userData, thunkAPI) => {
    try {
      console.log("working", userData);
      const response = await authService.login(userData);
      toast.success("Registration successful!");
      return response;
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "An error occurred"
      );
    }
  }
);

const initialState = {
  user: null,
  token: secureLocalStorage.getItem("token") || "",
  isLoading: false,
  status: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authReset: (state) => {
      state.user = null;
      state.token = "";
      state.isLoading = false;
      state.status = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(login.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload;
        secureLocalStorage.setItem("token", action.payload);
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

// Action creators are generated for each case reducer function
export const { authReset } = authSlice.actions;

export default authSlice.reducer;
