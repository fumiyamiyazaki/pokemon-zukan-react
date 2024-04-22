import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AsyncThunkConfig } from "node_modules/@reduxjs/toolkit/dist/createAsyncThunk";

type Type = {
  type: string;
  enType: string;
  color: string;
};

export type PokemonInfo = {
  id: number;
  name: string;
  img: string;
  types: Type[];
};

type initialStateType = {
  pokemons: PokemonInfo[];
  loading: "idle" | "pending" | "succeeded" | "rejected";
};

const initialState: initialStateType = {
  pokemons: [],
  loading: "idle",
};

export const fetchPokemons = createAsyncThunk<
  PokemonInfo[],
  undefined,
  AsyncThunkConfig
>("pokemons", async (_, { rejectWithValue }) => {
  const ids = Array.from({ length: 151 }, (_, i) => i + 1);

  try {
    const [info, speciesInfo] = await Promise.all([
      fetchPokemon(ids),
      fetchPokemonSpecies(ids),
    ]);

    const res: PokemonInfo[] = info.map((v) => {
      const id = v.species.url.match(/\/([^/]+)\/?$/)[1];

      const specInfo = speciesInfo.find(
        (v) => v.id.toString() === id.toString()
      );

      const jaName = specInfo.names?.find((v) => v.language.name === "ja").name;

      return {
        id: id,
        name: jaName ?? "",
        img: v.sprites.other["official-artwork"].front_default,
        types: [],
      };
    });

    return res;
  } catch (err) {
    throw err;
  }
});

const fetchPokemon = async (ids: number[]): Promise<any[]> => {
  const responses = await Promise.all(
    ids.map((id) =>
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then((res) => res.data)
    )
  );
  return responses;
};

const fetchPokemonSpecies = async (ids: number[]): Promise<any[]> => {
  const responses = await Promise.all(
    ids.map((id) =>
      axios
        .get(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
        .then((res) => res.data)
    )
  );
  return responses;
};

export const pokemonSlice = createSlice({
  name: "pokemons",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchPokemons.fulfilled,
      (state, action: PayloadAction<PokemonInfo[]>) => {
        state.pokemons = action.payload;
        state.loading = "succeeded";
      }
    );
    builder.addCase(fetchPokemons.rejected, (state, action) => {
      state.loading = "rejected";
    });
  },
});

// export const {} = pokemonSlice.actions;
export default pokemonSlice.reducer;
