import { createSlice } from "@reduxjs/toolkit";

const budgetSlice = createSlice({
  name: "budget",
  initialState: { total: 0 },
  reducers: {
    addExpense: (state, action) => {
      state.total += action.payload;
    },
  },
});

export const { addExpense } = budgetSlice.actions;
export default budgetSlice.reducer;
