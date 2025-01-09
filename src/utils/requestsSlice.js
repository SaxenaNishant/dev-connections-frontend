import { createSlice } from "@reduxjs/toolkit";

const requestsSlice = createSlice({
  name: "requests",
  initialState: null,
  reducers: {
    addRequests: (state, action) => {
      return action.payload;
    },
    removeRequests: () => null,
    removeRequest: (state, action) => {
      const newArray = state.filter((k) => k._id !== action.payload);
      return newArray;
    },
  },
});

export const { addRequests, removeRequests, removeRequest } =
  requestsSlice.actions;

export default requestsSlice.reducer;
