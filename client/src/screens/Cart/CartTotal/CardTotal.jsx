import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Typography, Divider } from "@material-ui/core";
import Button from "../../../components/Button/Button";
import { StyledCardActions } from "./styled";

const CartTotal = ({ cartItems, checkOutHandler }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography style={{ margin: "10px 0px" }}>
          <strong>Subtotal:</strong>&nbsp;(
          {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
          )&nbsp;items
        </Typography>
        <Divider />
        <Typography style={{ margin: "10px 0px" }}>
          $&nbsp;
          {cartItems
            .reduce((acc, item) => acc + item.quantity * item.price, 0)
            .toFixed(2)}
        </Typography>
        <Divider />
      </CardContent>
      <StyledCardActions>
        <Button
          className={classes.button}
          fullWidth
          variant="contained"
          size="medium"
          color="secondary"
          onClick={checkOutHandler}
          disabled={cartItems.length === 0}
        >
          Proceed to Checkout
        </Button>
      </StyledCardActions>
    </Card>
  );
};

export default CartTotal;

const useStyles = makeStyles({
  root: {
    width: 275,
    height: 180,
  },
  title: {
    fontSize: 14,
  },
  button: {
    marginTop: "-10px",
    width: "220px",
    boxShadow: "none",
    color: '#fff',
    fontWeight: 900
  },
});
