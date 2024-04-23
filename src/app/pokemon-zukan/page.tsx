"use client";
import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../lib/hook";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import Image from "next/image";
import {
  PokemonInfo,
  fetchPokemons,
} from "../lib/features/pokemon/pokemonSlice";

const ReactSample: FC = () => {
  const dispatch = useAppDispatch();

  const pokemonList: PokemonInfo[] = useAppSelector(
    (state) => state.pokemon.pokemons
  );
  const loading = useAppSelector((state) => state.pokemon.loading);

  const [start, setStart] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonInfo>();

  // pokemon取得
  useEffect(() => {
    dispatch(fetchPokemons());
  }, [dispatch]);

  // 選択初期値をゲンガーに設定
  useEffect(() => {
    if (pokemonList.length === 0) return;

    const gengar = pokemonList.find((v) => v.name === "ゲンガー");
    if (gengar) {
      setSelectedPokemon(gengar);
    }
  }, [pokemonList]);

  // start/backボタンのクリックイベント
  const handleClick = () => {
    setStart((prev) => !prev);
  };

  // セレクトボックスのオンチェンジイベント
  const handleChangePokemon = (event: SelectChangeEvent) => {
    setSelectedId(event.target.value);

    const selectedPokemon = pokemonList.find(
      (v) => v.id.toString() === event.target.value
    );
    if (selectedPokemon) {
      setSelectedPokemon(selectedPokemon);
    }
  };

  return (
    <>
      <Box
        height="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ bgcolor: "secondary.main" }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          minWidth={300}
        >
          {start ? (
            <>
              {selectedPokemon && (
                <Card
                  sx={{
                    height: 420,
                    width: 350,
                    background: "#fff",
                  }}
                >
                  <CardHeader title={`#${selectedPokemon.id}`} />
                  <Box display="flex" justifyContent="center">
                    <Avatar
                      src={selectedPokemon.img}
                      sx={{ width: 250, height: 250, background: "#e5e7eb" }}
                    />
                  </Box>
                  <CardContent
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="h3">{selectedPokemon.name}</Typography>
                  </CardContent>
                </Card>
              )}

              <Box mt={5} minWidth={200}>
                <FormControl fullWidth>
                  <InputLabel id="pokemon-label">Pokemon</InputLabel>
                  <Select
                    labelId="pokemon-label"
                    id="pokemon"
                    value={selectedId}
                    label="pokemon"
                    onChange={handleChangePokemon}
                  >
                    <MenuItem defaultChecked>選択してください</MenuItem>
                    {pokemonList.map((v) => (
                      <MenuItem
                        key={v.id}
                        value={v.id}
                      >{`#${v.id}: ${v.name}`}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </>
          ) : (
            <Image src="/gengar.png" alt="" width={500} height={500} />
          )}

          {loading === "succeeded" ? (
            <Button
              variant="contained"
              size="large"
              color="secondary"
              sx={{ marginTop: 5 }}
              onClick={handleClick}
            >
              {start ? "Back" : "Start"}
            </Button>
          ) : (
            <CircularProgress color="inherit" />
          )}
        </Box>
      </Box>
    </>
  );
};

export default ReactSample;
