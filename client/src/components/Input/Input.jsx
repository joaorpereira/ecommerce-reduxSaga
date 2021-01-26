import React from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";

export const StyledTextField = styled(TextField)`
  margin: 10px 0px;
`;

function Input({ label, value, onChange, ...rest }) {
  return (
    <StyledTextField
      variant="outlined"
      fullWidth
      label={label}
      value={value}
      onChange={onChange}
      {...rest}
    />
  );
}

export default Input;
