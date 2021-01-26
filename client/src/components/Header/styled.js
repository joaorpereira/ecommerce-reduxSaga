import styled from "styled-components";
import Typography from "@material-ui/core/Typography";

export const StyledTypography = styled(Typography)`
  transition: 0.3s ease-out;
  background-color: none !important;
  color: #fff;
  :hover {
    color: #4ecca3;
    background-color: none !important;
  }
`;
