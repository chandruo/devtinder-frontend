import { createSlice } from "@reduxjs/toolkit";

const userslice = createSlice({
  name: "user",
  initialState: {
    firstName: "",
    lastName: "",
    age: 0,
    photoUrl: "",
  },
  reducers: {
    addUser: (state, action) => {
      return action.payload;
    },
    removeUser: () => {
      state = initialState;
    },
  },
});

export const { addUser, removeUser } = userslice.actions;
export default userslice.reducer;
