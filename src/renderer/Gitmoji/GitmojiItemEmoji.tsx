import React from "react";
import { COPY_ANIMATION_DURATION } from "src/constants";
import styled from "styled-components";
import { bounce } from "../animations/bounce";

interface GitmojiItemEmojiProps {
  index: number;
  emoji: string;
  isCopying: boolean;
  onSelect: (emoji: string, index: number) => void;
}

export const GitmojiItemEmoji: React.FC<GitmojiItemEmojiProps> = ({
  index,
  emoji,
  isCopying,
  onSelect,
}) => (
  <Container
    onClick={() => onSelect(emoji, index)}
    className={isCopying ? "copying" : ""}
  >
    {emoji}
  </Container>
);

const Container = styled.div`
  font-size: 35px;
  height: 40px;
  margin: 0 0 12px;
  padding: 0;
  border: 0;

  &.copying {
    animation: ${bounce} ${COPY_ANIMATION_DURATION}ms ease-in-out;
  }
`;
