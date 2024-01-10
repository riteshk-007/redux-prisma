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
  },
});

export default InfoSlice.reducer;
