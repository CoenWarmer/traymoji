import React, { ChangeEventHandler } from "react";
import styled from "styled-components";

interface SearchInputProps {
  query: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onClear: () => void;
}

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ query, onChange, onClear }, ref) => (
    <>
      <Arrow />
      <SearchContainer>
        <Input
          ref={ref}
          placeholder="Search"
          value={query}
          onChange={onChange}
        />
        <ClearButton onClick={onClear}>
          <span>x</span>
        </ClearButton>
      </SearchContainer>
    </>
  )
);

const SEARCHBAR_HEIGHT = 40;

const SearchContainer = styled.div`
  display: flex;
  padding-top: 10px;
  left: 0;
  width: 100%;
`;

const Arrow = styled.div`
  position: fixed;
  width: 20px;
  height: 20px;
  transform: rotate(45deg);
  background: rgb(255, 255, 255);
  left: 50%;
  margin-left: -10px;
  top: 5px;
`;

const Input = styled.input`
  box-sizing: border-box;
  border-radius: 6px;
  border: solid 1px #eaeaea;
  font-family: "IBM Plex Mono", monospace;
  font-size: 18px;
  padding: 10px;
  width: 100%;
  height: ${SEARCHBAR_HEIGHT}px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);

  &:active,
  &:focus {
    outline: 0;
    border: 0;
  }
`;

const ClearButton = styled.button`
  display: flex;
  position: fixed;
  width: 20px;
  height: 20px;
  top: 20px;
  right: 10px;
  background: #333;
  border: none;
  font-size: 11px;
  font-weight: bold;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  color: #fff;
  cursor: pointer;

  &:active,
  &:focus {
    outline: 0;
    border: 0;
  }

  > span {
    margin-top: -2px;
    cursor: pointer;
  }
`;
