import React, { useEffect, useCallback, useState, useRef } from "react";
import styled from "styled-components";
import { GitmojiItemEmoji } from "./GitmojiItemEmoji";
import { GitmojiItemCode } from "./GitmojiItemCode";
import { Gitmoji } from "../types";
import {
  WINDOW_ANIMATION_DURATION,
  COPY_ANIMATION_DURATION,
} from "src/constants";
import { blubber } from "../animations/blubber";

interface GitmojiItemProps {
  gitmoji: Gitmoji;
  index: number;
  isActive: boolean;
  isVisible: boolean;
  onSelect: (index: number) => void;
}

export const GitmojiItem: React.FC<GitmojiItemProps> = ({
  gitmoji,
  index,
  isActive,
  isVisible,
  onSelect,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isCopying, setCopying] = useState<boolean>(false);

  const keydownListener = useCallback(
    (keydownEvent) => {
      const { key } = keydownEvent;

      switch (key) {
        case "Enter":
          if (isActive) {
            navigator.clipboard.writeText(gitmoji.code);
            setCopying(true);
          }
          break;

        default:
          break;
      }
    },
    [isActive]
  );

  useEffect(() => {
    window.addEventListener("keydown", keydownListener, true);
    return () => window.removeEventListener("keydown", keydownListener, true);
  }, [keydownListener]);

  useEffect(() => {
    if (isActive && wrapperRef.current) {
      wrapperRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [isActive]);

  useEffect(() => {
    if (isCopying) {
      setTimeout(() => {
        setCopying(false);
      }, COPY_ANIMATION_DURATION);
    }
  }, [isCopying]);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    onSelect(index);
    setCopying(true);
  };

  return (
    <Wrapper index={index} isVisible={isVisible} ref={wrapperRef}>
      <Container
        key={gitmoji.emoji}
        className={
          isActive && isCopying ? "active copying" : isActive ? "active" : ""
        }
      >
        <Top
          className={
            isActive && isCopying ? "active copying" : isActive ? "active" : ""
          }
        >
          <GitmojiItemEmoji
            index={index}
            emoji={gitmoji.emoji}
            isCopying={isCopying}
            onSelect={handleCopy}
          />
          <GitmojiItemCode
            index={index}
            code={gitmoji.code}
            onSelect={handleCopy}
          />
        </Top>
        <Bottom>
          <Description>{gitmoji.description}</Description>
        </Bottom>
      </Container>
    </Wrapper>
  );
};

const STAGGER_TIMEOUT = 50;

const Wrapper = styled.div<{ isVisible: boolean; index: number }>`
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transition-duration: ${(props) =>
    props.isVisible ? `${WINDOW_ANIMATION_DURATION * 3}ms` : 0};
  transition-timing-function: cubic-bezier(0.42, 0, 0.3, 1.04);
  transition-property: all;
  transition-delay: ${(props) =>
    props.isVisible ? `${props.index * STAGGER_TIMEOUT}ms` : 0};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  text-align: center;
  border-radius: 8px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.18s ease;
  border: solid 2px rgba(0, 0, 0, 0);

  &:hover,
  &.active {
    box-shadow: 10px 10px 8px rgb(0 0 0 / 8%);
    transform: translateY(-2px);
    border: solid 2px #ffdd67;
  }

  &.copying {
    border: solid 2px rgba(255, 120, 120, 1);
    transform: translateY(0);
    animation: ${blubber} 0.65s ease-in-out;
  }
`;

const Top = styled.div`
  background: rgba(28, 52, 80, 1);
  border-radius: 8px 8px 0 0;
  padding: 15px;
  transition: all 0.18s ease;

  &.copying {
    background-position: right center; /* change the direction of the change here */
  }
`;

const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  align-items: center;
  justify-content: center;
  height: 100%;
  background: #fff;
  border-radius: 0 0 6px 6px;
`;

const Description = styled.p`
  font-size: 11px;
  color: rgba(38, 62, 90, 1);
  margin: 0;
`;
