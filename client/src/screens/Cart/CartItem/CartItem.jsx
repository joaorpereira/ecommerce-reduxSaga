import React from "react";
import { useDispatch } from "react-redux";
import {
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  List,
  makeStyles,
  MenuItem,
  Select,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { StyledListItem, StyledImage, StyledName, StyledPrice } from "./styled";

const CartItem = ({ cart, setId, setQuantity, removeFromCart }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { image, name, price, quantity, countInStock, product } = cart;

  const handleChange = (e) => {
    setQuantity(e.target.value);
    setId(product);
  };

  return (
    <List>
      <StyledListItem>
        <StyledImage src={image} alt={image} />
        <StyledName>{name}</StyledName>
        <StyledPrice>$ {price}</StyledPrice>
        <FormControl
          size="small"
          variant="outlined"
          className={classes.formControl}
        >
          <InputLabel shrink id="quantity" className={classes.label}>
            Quantity
          </InputLabel>
          <Select labelId="quantity" value={quantity} onChange={handleChange}>
            {[...Array(countInStock).keys()].map((x) => (
              <MenuItem key={x + 1} value={x + 1}>
                {x + 1}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <IconButton className={classes.trash} onClick={() => dispatch(removeFromCart(product))}>
          <DeleteIcon className={classes.trashIcon} />
        </IconButton>
      </StyledListItem>
      <Divider style={{ margin: "10px 0px 0px 30px", width: "75%" }} />
    </List>
  );
};

export default CartItem;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: "100%",
    margin: "0px",
    minHeight: "75vh",
  },
  product: {
    flexGrow: 1,
  },
  formControl: {
    width: "100px",
  },
  label: {
    backgroundColor: "#fff",
    padding: "0px 5px",
    color: "#000",
  },
  trash: {
    marginLeft: "20px", 
    background: 'none !important'
  },
  trashIcon: {
    "&:hover": { color: theme.palette.secondary.main }
  }
}));
