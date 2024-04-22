import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./features/test/testSlice";
import favSlice from "./features/fav/favSlice";
import pokemonSlice from "./features/pokemon/pokemonSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      theme: themeReducer,
      fav: favSlice,
      pokemon: pokemonSlice,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
