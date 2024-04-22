"use client";
import { FC, useEffect, useState } from "react";
import { Button } from "../components/atoms/Button";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../lib/hook";
import { addFav, addNumFav } from "../lib/features/fav/favSlice";

type Data = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

const ReactSample: FC = () => {
  const dispatch = useAppDispatch();

  const [inputCount, setInputCount] = useState("");

  const fav = useAppSelector((state) => state.fav.count);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    // 入力値が整数であることを確認
    const isInteger = /^-?\d*$/.test(inputValue);

    if (isInteger) {
      setInputCount(inputValue);
    }
  };

  const handleClickInput = () => {
    dispatch(addNumFav(Number(inputCount)));
  };

  const getData = async () => {
    try {
      const res = await axios.get("https://pokeapi.co/api/v2/pokemon/1");
      console.log(`list: ${JSON.stringify(res.data)}`);
    } catch {
      console.error("error: axios.");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div>いいね{fav}</div>

      <button onClick={() => dispatch(addFav())}>いいね！</button>
      <br />
      <input type="number" value={inputCount} onChange={handleChange} />
      <button onClick={handleClickInput}>いいね！</button>
    </>
  );
};

export default ReactSample;
