import React from "react";
import styled from "styled-components";

interface GitmojiItemCodeProps {
  index: number;
  code: string;
  onSelect: (emoji: string, index: number) => void;
}

export const GitmojiItemCode: React.FC<GitmojiItemCodeProps> = ({
  index,
  code,
  onSelect,
}) => <Container onClick={() => onSelect(code, index)}>{code}</Container>;

const Container = styled.p`
  font-weight: 500;
  font-size: 16px;
  font-weight: bold;
  margin: 0 0 8px;
  padding: 0;
  color: #fff;
  word-break: break-all;
  cursor: pointer;
`;
