import styled from "styled-components";
import ListItem from "@material-ui/core/ListItem";

export const StyledListItem = styled(ListItem)`
  display: flex;
  align-items: center;
`;

export const StyledImage = styled.img`
  height: 75px;
  margin: 0 30px;
  border-radius: 8px;
`;

export const StyledName = styled.h4`
  width: 150px;
  font-size: 14px;
  margin: 0px;
  padding: 0px;
`;

export const StyledPrice = styled.p`
  width: 150px;
  font-size: 18px;
  margin: 0 10px 0px 0px;
  text-align: center;
`;
