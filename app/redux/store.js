const { configureStore } = require("@reduxjs/toolkit");
import reducers from "./userSlice";
export const store = configureStore({
  reducer: {
    users: reducers,
  },
});
