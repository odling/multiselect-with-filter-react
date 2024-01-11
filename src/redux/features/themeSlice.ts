import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Themes } from "../../theming/styled";

const initialState: { currentTheme: keyof Themes } = {
  currentTheme: (localStorage.getItem("theme") as keyof Themes) ?? "light",
};

const themeSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<keyof Themes>) => {
      state.currentTheme = action.payload;
      localStorage.setItem("theme", action.payload);
    },
  },
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
