import { CartPageComponent } from "@salesgenterp/ui-components";
import getConfig from "next/config";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  RemoveLocalProduct,
  deleteProductFromCart,
  fetchCartData,
  updateCartQuantity,
  updateLocalCart,
} from "../src/AsyncFunctions/cart";
// import dynamic from "next/dynamic";
///

const Container = styled.div`
  width: 100%;
  min-height: 80vh;
  background: #00000010;
  padding: 6rem 0;
  display: grid;
  place-items: center;
  font-family: "Poppins";
  font-size: 16px;
  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  span,
  div,
  button {
    font-family: "Poppins";
    /* font-size: 16px; */
  }
  @media screen and (max-width: 1200px) {
    padding: 2em 0;
  }
  @media screen and (max-width: 740px) {
    font-size: 12px;
  }
`;

const CartDrawerStack = () => {
  const { publicRuntimeConfig } = getConfig();
  const { API_BASE_URL } = publicRuntimeConfig;
  const dispatch = useDispatch();
  const router = useRouter();
  const token = useSelector((state) => state.auth.tokens?.token);
  const cartData = useSelector((state) => state.cart.cartData);
  const localCart = useSelector((state) => state.cart.localCartData);
  const loading = useSelector((state) => state.cart.isLoading);
  const discountCoupons = useSelector(
    (state) => state.checkout?.discountCoupons
  );
  const userDetails = useSelector((state) => state.auth.userDetails);
  const allowLocalCartData = useSelector(
    (state) => state.cart.allowLocalCartData
  );
  const allowLocalCart = !userDetails && allowLocalCartData;

  const onChangeDiscountCoupon = () => {
    fetchCartData(token)(dispatch);
  };

  ///////update cart qt
  const updateCart = (item) => {
    if (allowLocalCart) {
      updateLocalCart({ ...item }, localCart)(dispatch);
    } else {
      updateCartQuantity([{ ...item }], token)(dispatch);
    }
  };

  let styles = {
    imgSize: {
      width: "80px",
      height: "80px",
    },
    name: {
      lines: 3,
      size: "1em",
    },
    price: {
      size: "1.19em",
    },
    cartSummary: {
      bg: "#0C525520",
      color: "var(--text)",
      hr: "rgba(50, 50, 50, 0.3)",
      input: {
        bg: "white",
        color: "grey",
      },
    },
    bg: "#0C525520",
    scroll: {
      bg: "#00000040",
      color: "var(--text)",
    },
    Btn: {
      background: "var(--accent)",
      color: "white",
    },
  };

  const handleRedirect = (link) => console.log(link);
  // if (!userDetails) return <></>;
  return (
    <Container>
      <CartPageComponent
        apiEndPoint={API_BASE_URL}
        token={token}
        onChangeDiscountCoupon={onChangeDiscountCoupon}
        discountCoupons={discountCoupons}
        cartData={allowLocalCart ? localCart : cartData}
        loading={loading}
        styles={styles}
        handleRemoveProduct={(product) => {
          if (allowLocalCart) {
            RemoveLocalProduct(product, localCart)(dispatch);
          } else {
            deleteProductFromCart([product], token)(dispatch);
          }
        }}
        handleRemoveAll={(product) => {
          if (allowLocalCart) {
            RemoveLocalProduct(product, null)(dispatch);
          } else {
            deleteProductFromCart(product, token)(dispatch);
          }
        }}
        retail={false}
        handleIncrementDecrement={(product) => updateCart(product)}
        imgnotfoundUrl="/images/products/imgnotfound.png"
        clickRedirect={(link) => router.push(link)}
      />
    </Container>
  );
};

export default CartDrawerStack;
