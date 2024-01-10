const { configureStore } = require("@reduxjs/toolkit");
import reducers from "./userSlice";
import infoReducer from "./UserInfo";
export const store = configureStore({
  reducer: {
    users: reducers,
    info: infoReducer,
  },
});
