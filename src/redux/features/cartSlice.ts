import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../RootReducer";
import { Program } from "../../models/program";

const cartSlice = createSlice({
  name: "cart",
  initialState: [] as Program[],
  reducers: {
    addToCart: (state: Program[], action: PayloadAction<Program>) => {
      //Kiểm tra xem có trong cart chưa
      //nhiệm vụ của some là trả về true false
      const exists = state.some(
        (program) => program.programId === action.payload.programId
      );
      if (!exists) {
        state.push(action.payload);
      }
    },
    reset: () => [],
    remove: (state: Program[], action: PayloadAction<string>) => {
      return state.filter((program) => program.programId !== action.payload);
    },
  },
});
export const { addToCart, reset, remove } = cartSlice.actions;
export const selectCart = (store: RootState) => store.cart;
export default cartSlice.reducer;
