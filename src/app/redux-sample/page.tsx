"use client";
import { FC, useEffect, useState } from "react";
import ThemeToggle from "../components/atoms/ThemeToggle";

type Data = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

const ReactSample: FC = () => {
  return (
    <>
      <ThemeToggle />
    </>
  );
};

export default ReactSample;
