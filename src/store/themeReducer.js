// import { createSlice } from "@reduxjs/toolkit";


// const initialThemeState = {theme: true};

// const themeSlice = createSlice({
//     name: "theme",
//     initalState: initialThemeState,
//     reducers: {
//         theme(state){
//             state.theme = !state.theme;
//         }
//     }
// })


// export const themesActions = themeSlice.actions;
// export default themeSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";

const themeReducer = createSlice({
  name: "theme",
  initialState: {
    darkMode: false,
  },
  reducers: {
    theme(state, action) {
      console.log(action);
      state.theme=!state.theme
    },
  },
});

export const themesActions = themeReducer.actions;
export default themeReducer.reducer
