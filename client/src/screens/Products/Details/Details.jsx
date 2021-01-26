import React from "react";
import Ratings from "../../../components/Ratings/Ratings";
import {
  Divider,
  List,
  ListItem,
  makeStyles,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: "100%",
    margin: "0px",
    padding: "15px",
    marginBottom: "50px",
  },
  control: {
    padding: theme.spacing(2),
    textAlign: "center",
    maxWidth: "100%",
    margin: "0px",
    display: "flex",
    justifyContent: "center",
  },
  product: {
    flexGrow: 1,
  },
}));

function Details({ product }) {
  const classes = useStyles();

  const { name, rating, numReviews, price, description } = product;

  return (
    <div className={classes.demo}>
      <List>
        <ListItem>
          <Typography
            style={{
              fontWeight: 900,
              textTransform: "uppercase",
              fontSize: "20px",
            }}
          >
            {name}
          </Typography>
        </ListItem>
        <Divider />
        <ListItem>
          <Ratings stars={rating} reviews={`${numReviews} Reviews`} />
        </ListItem>
        <ListItem>
          <Typography style={{ fontSize: "20px" }}>
            <strong style={{ fontSize: "16px" }}>Price:</strong> ${price}
          </Typography>
        </ListItem>
        <ListItem>
          <Typography style={{ fontSize: "16px", textAlign: "justify" }}>
            <strong>Description:</strong>{" "}
            <span style={{ fontSize: "14px" }}>{description}</span>.
          </Typography>
        </ListItem>
      </List>
    </div>
  );
}

export default Details;
