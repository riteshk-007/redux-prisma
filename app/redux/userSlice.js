const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  isloading: true,
};
const Slice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});
export const {} = Slice.actions;
export default Slice.reducer;
