import { createSlice } from "@reduxjs/toolkit";

const conenctionsSlice = createSlice({
  name: "connections",
  initialState: null,
  reducers: {
    addConnections: (state, action) => {
      return action.payload;
    },
    removeConnetions: () => null,
  },
});

export const { addConnections, removeConnetions } = conenctionsSlice.actions;

export default conenctionsSlice.reducer;
