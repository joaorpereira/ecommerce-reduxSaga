import styled from "styled-components";
import { Chip } from "@material-ui/core";

export const StyledWrap = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 100%;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const StyledFilter = styled.div`
  margin-left: 20px;
`;

export const StyledFilterItem = styled.div`
  margin-bottom: 15px;
`;

export const StyledButton= styled.button`
  margin-right: 5px;
  cursor: pointer;
  font-size: 11px;
  font-weight: 900;
  outline: none;
  border: none;
  border-radius: 100px;
  padding: 6px 10px;
  color: white;
  transition: 0.3s ease-out;
  background-color: #393e46;
  :hover{
    background-color: #4ecca3;
  }
`;
