import React, { useEffect, useState, useRef } from "react";
import { ipcRenderer } from "electron";
import styled from "styled-components";
import { SearchInput } from "./SearchInput/SearchInput";
import { Gitmojis } from "./Gitmoji/Gitmojis";
import { WINDOW_ANIMATION_DURATION } from "src/constants";
import { useGitmojis } from "./hooks/useGitmojis";
import { FailedToLoad } from "./Gitmoji/FailedToLoad";

export function App() {
  const input = useRef<HTMLInputElement>();
  const [query, setQuery] = useState<string>("");

  const [showWindow, setShowWindow] = useState<"show" | "hide">("hide");

  const { gitmojis, reload, error } = useGitmojis();

  ipcRenderer.on("showWindow", (_, message) => {
    setShowWindow(message);

    if (message === "show" && input.current) {
      input.current.focus();
    }
  });

  useEffect(() => {
    setTimeout(() => {
      setShowWindow("show");
    }, WINDOW_ANIMATION_DURATION);
  }, []);

  const handleSearch = (e) => {
    setQuery(e.target.value.toLowerCase());
  };

  const handleClear = () => {
    setQuery("");
  };

  const handleReload = () => {
    reload();
  };

  return (
    <Container showWindow={showWindow === "show"}>
      <SearchInput
        query={query}
        onClear={handleClear}
        onChange={handleSearch}
        ref={input}
      />
      {!error && gitmojis && (
        <Gitmojis
          gitmojis={gitmojis}
          query={query}
          isVisible={showWindow === "show"}
        />
      )}
      {error && <FailedToLoad onReload={handleReload} />}
    </Container>
  );
}

const Container = styled.div<{ showWindow: boolean }>`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  opacity: ${(props) => (props.showWindow ? 1 : 0)};
  transform: ${(props) =>
    props.showWindow ? "translateY(0%)" : "translateY(-10%)"};
  transition: all ${WINDOW_ANIMATION_DURATION}ms cubic-bezier(0.42, 0, 0.58, 1);
`;
