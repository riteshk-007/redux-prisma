import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// GET API call
export const fetchUsers = createAsyncThunk("fexhUsers", async (thunkAPI) => {
  try {
    const response = await axios.get("/api/get");
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});

// POST API call
export const createUser = createAsyncThunk(
  "createUser",
  async (user, thunkAPI) => {
    try {
      const response = await axios.post("/api/create", {
        name: user.name,
        email: user.email,
        password: user.password,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

// Slice
export const userSlice = createSlice({
  name: "posts",
  initialState: { user: [], loading: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    // GET API call
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = "idle";
      state.user = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = "idle";
      state.error = action.error;
    });

    // POST API call
    builder.addCase(createUser.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.loading = "idle";
      state.user[action.name] = action.payload;
    });
    builder.addCase(createUser.rejected, (state, action) => {
      state.loading = "idle";
      state.error = action.error;
    });
  },
});

export default userSlice.reducer;
