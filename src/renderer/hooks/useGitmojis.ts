import { useState, useEffect } from "react";
import { GITMOJI_URL } from "src/constants";
import { Gitmoji } from "../types";

export const useGitmojis = () => {
  const [gitmojis, setGitmojis] = useState<Gitmoji[]>([]);
  const [error, setError] = useState<boolean>(false);

  async function fetchGitmojis() {
    try {
      const request = await fetch(GITMOJI_URL);
      const response = await request.json();
      setGitmojis(response.gitmojis);
    } catch (error) {
      setError(true);
    }
  }

  useEffect(() => {
    fetchGitmojis();
  }, []);

  const reload = () => {
    fetchGitmojis();
  };

  return { gitmojis, error, reload };
};
