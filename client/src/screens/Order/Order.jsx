import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrderDetailRequest,
  payOrderRequest,
  deliverOrderRequest
} from "../../store/modules/Order/orderActions";
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from "../../store/modules/Order/orderTypes";
import OrderSummary from "./OrderSummary/OrderSummary";
import OrderDetails from "./OrderDetails/OrderDetails";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%",
    marginTop: theme.spacing(0),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    marginTop: "50px",
  },
  loading: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
  },
}));

const Order = () => {
  const classes = useStyles();
  let { id } = useParams();
  const dispatch = useDispatch();

  const [sdkReady, setSdkReady] = useState(false);

  const orderDetails = useSelector((state) => state.orderDetails);
  const { user } = useSelector((state) => state.user);

  const { order } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { success: successPay, loading: loadingPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { success: successDeliver } = orderDeliver;

  useEffect(() => {
    const addPaypalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || order._id !== id || successPay || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetailRequest(id));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPaypalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [id, order, successPay, successDeliver, dispatch]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrderRequest(id, paymentResult));
    dispatch(getOrderDetailRequest(id));
  };

  const deliverHandler = () => {
    dispatch(deliverOrderRequest(id, order));
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item xs={12} sm={8} lg={8}>
          <OrderDetails order={order} id={id} user={user} />
        </Grid>
        <Grid item xs={12} sm={4} lg={4}>
          <OrderSummary
            order={order}
            loadingPay={loadingPay}
            sdkReady={sdkReady}
            user={user}
            deliverHandler={deliverHandler}
            successPaymentHandler={successPaymentHandler}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Order;
