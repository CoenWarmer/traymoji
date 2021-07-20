import React from "react";
import styled from "styled-components";

interface FailedToLoadProps {
  onReload: () => void;
}

export const FailedToLoad: React.FC<FailedToLoadProps> = ({ onReload }) => (
  <Container>
    <Emoji>😭</Emoji>
    <Message>Failed to load Gitmojis.</Message>
    <Button onClick={onReload}>Try again?</Button>
  </Container>
);

const Container = styled.div`
  display: flex;
  height: 400px;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Emoji = styled.div`
  font-size: 40px;
`;

const Message = styled.div`
  margin-bottom: 20px;
`;

const Button = styled.button`
  background: rgba(28, 52, 80, 1);
  border: 0;
  border-radius: 5px;
  font-family: "IBM Plex Mono", monospace;
  color: #fff;
  font-size: 12px;
  padding: 10px 16px;
`;
