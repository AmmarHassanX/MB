import { CartDrawer } from "@salesgenterp/ui-components";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
///
import { setAlert } from "../../AsyncFunctions/alert";
import {
  RemoveLocalProduct,
  deleteProductFromCart,
  updateCartQuantity,
  updateLocalCart,
} from "../../AsyncFunctions/cart";
import { toggleOpenDrawer } from "../../store/cart";
import theme from "../../utilities/theme/theme";
const CartDrawerStyle = styled.div`
  width: 600px;
  @media only screen and (max-width: 768px) {
    width: 90vw;
  }
`;

const CartDrawerStack = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const token = useSelector((state) => state.auth.tokens?.token);
  const localCart = useSelector((state) => state.cart.localCartData);
  const cartData = useSelector((state) => state.cart.cartData);
  const loading = useSelector((state) => state.cart.isLoading);
  const userDetails = useSelector((state) => state.auth.userDetails);
  const allowLocalCartData = useSelector(
    (state) => state.cart.allowLocalCartData
  );
  const allowLocalCart = !userDetails && allowLocalCartData;

  ///////update cart qt
  const updateCart = (item) => {
    if (allowLocalCart) {
      updateLocalCart({ ...item }, localCart)(dispatch);
    } else {
      updateCartQuantity([{ ...item }], token)(dispatch);
    }
  };

  const handleRedirect = (link) => {
    router.push(`/${link}`);
    dispatch(toggleOpenDrawer(false));
  };
  return (
    <CartDrawerStyle>
      <CartDrawer
        cartData={allowLocalCart ? localCart : cartData}
        color={theme.palette.colors.primary}
        loading={loading}
        maxWidth="600px"
        handleClose={() => dispatch(toggleOpenDrawer(false))}
        handleRemoveProduct={(product) => {
          allowLocalCart
            ? RemoveLocalProduct(product, localCart)(dispatch)
            : deleteProductFromCart([product], token)(dispatch);
        }}
        handleIncrementDecrement={(product) => updateCart(product)}
        imgnotfoundUrl="/images/products/imgnotfound.png"
        handleRedirect={(link) => handleRedirect(link)}
      />
    </CartDrawerStyle>
  );
};

export default CartDrawerStack;
