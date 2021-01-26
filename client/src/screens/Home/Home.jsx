import React, { useEffect, useLayoutEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Product from "../../components/Cart/Cart";
import Loading from "../../components/Loading/Loading";

import {
  Chip,
  Grid,
  Fade,
  FormControlLabel,
  Slider,
  Switch,
  TextField,
  Typography,
} from "@material-ui/core";
import { StyledWrap, StyledFilter, StyledFilterItem } from "./styled";

import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/modules/Product/productActions";
import { addToCartRequest } from "../../store/modules/Cart/cartActions";
import { useHistory } from "react-router";

const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const [checked, setChecked] = useState(false);
  const [value, setValue] = useState([0, 10000]);
  // const [productName, setProductName] = useState("");

  const [newList, setNewList] = useState(null);

  const products = useSelector((state) => state.products);
  const { isLoggedIn } = useSelector((state) => state.user);
  const { loading, products: productsList } = products;

  useLayoutEffect(() => {
    dispatch(actions.productsRequest());
  }, [dispatch]);

  useEffect(() => {
    setNewList(productsList);
  }, []);

  const [chipData, setChipData] = useState([
    { key: 0, label: "Angular" },
    { key: 1, label: "jQuery" },
    { key: 2, label: "Polymer" },
    { key: 3, label: "React" },
    { key: 4, label: "Vue.js" },
  ]);

  const handleChange = () => {
    setChecked(!checked);
  };

  const handleSlider = (event, newValue) => {
    setValue(newValue);
  };

  // const productNameFilter = (e) => {
  //   const value = e.target.value;
  //   setProductName(value);
  //   let filtered = productsList;

  //   if (value.length > 0) {
  //     const newData = filtered.filter((product) =>
  //       product.name.trim().toLowerCase().includes(value.trim().toLowerCase())
  //     );
  //     setNewList(newData);
  //   } else {
  //     setNewList(filtered);
  //   }
  // };

  const priceFilter = () => {
    let filtered = productsList;
    let newProducList = null;
    if (value[0]) {
      newProducList = filtered.filter(
        (item) => Math.ceil(item.price) > value[0] && item
      );
    } else if (value[1]) {
      newProducList = filtered.filter(
        (item) => Math.ceil(item.price) < value[1] && item
      );
    }
    setNewList(newProducList);
  };

  const addToCartHandler = (id) => {
    console.log(id);
    if (isLoggedIn && id) {
      dispatch(addToCartRequest({ id: id, quantity: 1 }));
      history.push("/cart");
    } else {
      history.push("/login");
    }
  };

  useEffect(() => {
    priceFilter();
  }, [value]);

  return (
    <div className={classes.root}>
      <h2 style={{ marginLeft: "45px" }}>Products</h2>
      <FormControlLabel
        style={{ marginLeft: "37px", marginBottom: "15px" }}
        control={<Switch checked={checked} onChange={handleChange} />}
        label="Filters"
      />
      {loading ? (
        <Loading />
      ) : (
        <Grid container spacing={3} style={{ width: "100%", margin: 0 }}>
          {checked && (
            <Fade in={checked}>
              <Grid item xs={2}>
                <StyledFilter>
                  <StyledFilterItem>
                    <TextField
                      variant="outlined"
                      margin="dense"
                      fullWidth
                      label="Product Name"
                      InputLabelProps={{ shrink: true }}
                      // value={productName}
                      // onChange={(e) => productNameFilter(e)}
                    />
                  </StyledFilterItem>
                  <StyledFilterItem>
                    <Typography gutterBottom style={{ marginBottom: "40px" }}>
                      Price
                    </Typography>
                    <Slider
                      color="secondary"
                      value={value}
                      onChange={handleSlider}
                      valueLabelDisplay="on"
                      max={1000}
                      min={0}
                    />
                  </StyledFilterItem>
                  <StyledFilterItem>
                    <StyledWrap>
                      {chipData.map((data) => (
                        <div key={data.key}>
                          <Chip
                            label={data.label}
                            // onDelete={
                            //   data.label === "React" ? undefined : handleDelete(data)
                            // }
                            // className={classes.chip}
                          />
                        </div>
                      ))}
                    </StyledWrap>
                  </StyledFilterItem>
                </StyledFilter>
              </Grid>
            </Fade>
          )}
          <Grid item xs={checked ? 10 : 12} style={{ width: "100%" }}>
            <Grid container spacing={3}>
              {newList &&
                newList.map((product) => (
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    lg={3}
                    className={classes.control}
                    key={product._id}
                  >
                    <Product
                      id={product._id}
                      addToCartHandler={addToCartHandler}
                      product={product}
                    />
                  </Grid>
                ))}
            </Grid>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default Home;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: "100%",
    margin: "0px",
    minHeight: "80vh",
  },
  control: {
    padding: theme.spacing(2),
    textAlign: "center",
    maxWidth: "100%",
    margin: "0px",
    display: "flex",
    justifyContent: "center",
  },
}));
