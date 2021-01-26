import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import * as S from "./styled";

import Details from "./Details/Details";
import AddCart from "./AddCart/AddCart";
import Button from "../../components/Button/Button";
import Loading from "../../components/Loading/Loading";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, useParams } from "react-router-dom";

import { productRequest } from "../../store/modules/Product/productActions";
import { addToCartRequest } from "../../store/modules/Cart/cartActions";

const Products = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const { product, loading } = useSelector((state) => state.product);
  const { isLoggedIn } = useSelector((state) => state.user);
  const [quantity, setQuantity] = useState(1);

  let { id } = useParams();

  useEffect(() => {
    dispatch(productRequest(id));
  }, [id, dispatch]);

  const addToCartHandler = () => {
    if (isLoggedIn) {
      dispatch(addToCartRequest({ id, quantity }));
      history.push("/cart");
    } else {
      history.push("/login");
    }
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3} style={{ margin: "20px 0px", width: "100%" }}>
        <Button
          style={{ marginBottom: "30px", marginLeft: "40px" }}
          onClick={() => history.push("/")}
        >
          <ArrowBackIcon style={{ marginRight: "5px" }} /> Return
        </Button>
        {loading ? (
          <Loading />
        ) : (
          <div className={classes.product}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} lg={4} className={classes.container}>
                <S.Image src={product.image} alt={product.alt} />
              </Grid>
              <Grid item xs={12} sm={6} lg={4}>
                <Details product={product} />
              </Grid>
              <Grid item xs={12} sm={12} lg={4} className={classes.container}>
                <AddCart
                  product={product}
                  addToCartHandler={addToCartHandler}
                  quantity={quantity}
                  setQuantity={setQuantity}
                />
              </Grid>
            </Grid>
          </div>
        )}
      </Grid>
    </div>
  );
};

export default Products;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: "100%",
    margin: "0px",
    padding: "15px",
    marginBottom: "50px",
  },
  product: {
    flexGrow: 1,
  },
  container: {
    display: "flex",
    justifyContent: "center",
  },
}));
