import React, { useRef, useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import { GitmojiItem } from "./GitmojiItem";
import { Gitmoji } from "../types";

interface GitmojisProps {
  gitmojis: Gitmoji[];
  query: string;
  isVisible: boolean;
}

export const Gitmojis: React.FC<GitmojisProps> = ({
  gitmojis = [],
  query,
  isVisible,
}) => {
  const [filteredGitmojis, setFilteredGitmojis] = useState<Gitmoji[]>(gitmojis);
  const [cursorPos, setCursorPos] = useState<number | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query === "") {
      setFilteredGitmojis(gitmojis);
    } else {
      const filtered = gitmojis.filter(
        (gitmoji) =>
          gitmoji.code.includes(query) ||
          gitmoji.description.toLowerCase().includes(query)
      );

      setFilteredGitmojis(filtered);

      if (filtered.length === 1) {
        setCursorPos(0);
      }
    }
  }, [query, gitmojis]);

  const keydownListener = useCallback(
    (keydownEvent) => {
      const { key } = keydownEvent;

      switch (key) {
        case "ArrowUp":
          if (cursorPos === null || cursorPos <= 2) {
            setCursorPos(0);
          } else {
            setCursorPos(cursorPos - 2);
          }
          break;

        case "ArrowDown":
          if (cursorPos === null) {
            setCursorPos(0);
          } else if (cursorPos + 2 >= filteredGitmojis.length - 1) {
            setCursorPos(filteredGitmojis.length - 1);
          } else {
            setCursorPos(cursorPos + 2);
          }

          break;
        case "ArrowRight":
          if (cursorPos === null) {
            setCursorPos(1);
          } else if (cursorPos + 1 > filteredGitmojis.length - 1) {
            setCursorPos(filteredGitmojis.length - 1);
          } else {
            setCursorPos(cursorPos + 1);
          }
          break;

        case "ArrowLeft":
          if (cursorPos === null || cursorPos === 0) {
          } else {
            setCursorPos(cursorPos - 1);
          }
          break;

        default:
          break;
      }
    },
    [cursorPos, filteredGitmojis]
  );

  const handleSelect = (index: number) => {
    setCursorPos(index);
  };

  useEffect(() => {
    window.addEventListener("keydown", keydownListener, true);

    return () => window.removeEventListener("keydown", keydownListener, true);
  }, [keydownListener]);

  return (
    <ScrollContainer ref={scrollRef}>
      <Grid>
        {filteredGitmojis.map((gitmoji, index) => (
          <GitmojiItem
            key={gitmoji.emoji}
            index={index}
            gitmoji={gitmoji}
            isVisible={isVisible}
            isActive={cursorPos === index}
            onSelect={handleSelect}
          />
        ))}
      </Grid>
    </ScrollContainer>
  );
};

const ScrollContainer = styled.div`
  display: flex;
  height: 100%;
  overflow: scroll;
  background: rgba(28, 52, 80, 0.4);
  padding: 15px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 48% 48%;
  column-gap: 4%;
  row-gap: 20px;
  width: 100%;
  align-self: end;
`;
