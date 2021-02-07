import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Ratings from "../Ratings/Ratings";
import * as S from "./styled";
import AddIcon from "@material-ui/icons/Add";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 210,
    minHeight: 325,
    maxHeight: 325,
    borderRadius: "15px",
    boxShadow: "0px 4px 6px #12263F30",
    position: "relative",
  },
  media: {
    height: "180px",
    maxWidth: "210px",
    backgroundColor: "transparent",
    margin: "0px auto",
    borderTopLeftRadius: "15px",
    borderTopRightRadius: "15px",
  },
  btn: {
    marginTop: "2px",
  },
}));

const Product = ({ id, product, addToCartHandler }) => {
  const classes = useStyles();
  const history = useHistory();

  const { name, rating, image, numReviews, price, _id } = product;

  return (
    <Card className={classes.root} elevation={0}>
      <CardMedia className={classes.media} image={image} title="Paella dish" />
      <CardContent style={{ padding: "5px 15px" }}>
        <S.Button onClick={() => history.push(`/product/${_id}`)}>
          <p>{name}</p>
        </S.Button>
        <Ratings
          stars={rating}
          reviews={`${numReviews ? numReviews : "0"} Reviews`}
        />
        <S.Price>${price}</S.Price>
      </CardContent>
      <S.AddButon onClick={() => addToCartHandler(id)}>
        <AddIcon size="large" className={classes.btn} />
      </S.AddButon>
    </Card>
  );
};

export default Product;
