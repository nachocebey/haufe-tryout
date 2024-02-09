import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    id: null,
    name: null,
    email: null,
    favorites: [],
  },
  reducers: {
    setUserInfo: (state, action) => {
      state.id = action.payload?._id;
      state.name = action.payload?.name;
      state.email = action.payload?.email;
      state.favorites = action.payload?.favoritesIds;
    },
    clearUserInfo: (state) => {
      state.id = null;
      state.name = null;
      state.email = null;
      state.email = [];
    },
  },
});

export const { setUserInfo, clearUserInfo } = userSlice.actions;

export default userSlice.reducer;
