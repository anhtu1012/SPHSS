import { combineReducers } from "@reduxjs/toolkit";
import cartSlice from "./features/cartSlice";
import userSlice from "./features/userSlice";

const rootReducer = combineReducers({
  user: userSlice,
  cart: cartSlice,
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
