import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const userInfo = createAsyncThunk("userinfo", async (id, thunkAPI) => {
  try {
    const response = await axios.get(`/api/get/${id}`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});

export const udateUser = createAsyncThunk(
  "updateuser",
  async (info, thunkAPI) => {
    try {
      const response = await axios.put(`/api/get/${info.id}`, {
        name: info.name,
        email: info.email,
        oldPassword: info.password,
        newPassword: info.newPassword,
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
export const deleteUser = createAsyncThunk("deleteUser", async (id) => {
  try {
    const response = await axios.delete(`/api/get/${id}`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});
export const InfoSlice = createSlice({
  name: "info",
  initialState: { user: [], loading: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    // User info API call
    builder.addCase(userInfo.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(userInfo.fulfilled, (state, action) => {
      state.loading = "idle";
      state.user = action.payload;
    });
    builder.addCase(userInfo.rejected, (state, action) => {
      state.loading = "idle";
      state.error = action.error;
    });
    // User update API call
    builder.addCase(udateUser.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(udateUser.fulfilled, (state, action) => {
      state.loading = "idle";
      state.user = action.payload;
    });
    builder.addCase(udateUser.rejected, (state, action) => {
      state.loading = "idle";
      state.error = action.error;
    });
    // Delete user API call
    builder.addCase(deleteUser.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.loading = "idle";
      state.user = action.payload;
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.loading = "idle";
      state.error = action.error;
    });
  },
});

export default InfoSlice.reducer;
