import { Box, Dialog, useMediaQuery } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
////////////////////////////////////////////////////////////////
import { paramCase } from "param-case";
import { AiOutlineClose, AiOutlineEye } from "react-icons/ai";
import { FiHeart } from "react-icons/fi";
import { addTocart, localAddToCart } from "../../AsyncFunctions/cart";
import ProductViewContainer from "../product-details/ProductView";
import {
  ImageBox,
  LoginButton,
  LoginToAddButton,
  ProductAddButton,
  ProductButton,
  ProductCard,
  ProductContent,
  ProductName,
  ProductPrice,
  ProductPriceContainer,
  ProductQuickView,
  QuickView,
  QuickViewBtn,
} from "./productCard.style";
// import { QuantityComponent } from "../product-details/variantsTable/QuantityComponent";
import { PiHandbag } from "react-icons/pi";
import { getRandomColor } from "../../utilities/utils";
import { checkMainQtyMinMax } from "../product-details/variantsTable/VariatnRow";
import { setAlert } from "../../AsyncFunctions/alert";
import { LiaShoppingCartSolid } from "react-icons/lia";
import { RiShoppingCart2Line } from "react-icons/ri";

const CommonProductCard = ({
  product,
  onListPage,
  isNew,
  tag,
  handleProducts,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const imageRef = useRef(null);
  const [showQuickView, setShowQuickView] = useState(false);
  const [value, setValue] = useState(4);
  const userDetails = useSelector((state) => state.auth.userDetails);
  const token = useSelector((state) => state.auth.tokens?.token);
  const allowLocalCartData = useSelector(
    (state) => state.cart.allowLocalCartData
  );
  const allowLocalCart = !userDetails && allowLocalCartData;
  const cartData = useSelector((state) => state.cart.cartData);
  const cartItem = cartData?.cartLineItemDtoList?.find(
    (cartItem) => cartItem?.productId === product?.productId
  );
  const cartQuantity = cartItem?.quantity || 0;
  const isMobile = useMediaQuery("(max-width:768px)");
  const [isHovered, setIsHovered] = useState(false);

  const addToCart = () => {
    const finalQuantity = parseInt(
      checkMainQtyMinMax({
        min: product?.minQuantityToSale,
        max: product?.maxQuantityToSale,
        availableQuantity: product?.availableQuantity,
        quantity: 1,
        cartQuantity: cartQuantity,
        dispatch,
      })
    );
    let selectedProduct = [{ ...product, quantity: finalQuantity }];
    if (allowLocalCart) {
      localAddToCart(selectedProduct, localCartData)(dispatch);
    } else {
      const checkCartQuantity = selectedProduct?.some((item) => {
        const cartItem = cartData?.cartLineItemDtoList?.find(
          (cartItem) => cartItem?.productId === item?.productId
        );
        return (
          cartItem?.quantity >= (item?.availableQuantity || 0) ||
          cartItem?.quantity >= (item?.maxQuantityToSale || 0)
        );
      });
      if (checkCartQuantity) {
        return setAlert(
          "warn",
          "Product quantity cannot exceed the available stock or the maximum allowed quantity."
        )(dispatch);
      }
      addTocart(selectedProduct, token)(dispatch);
    }
  };
  const ProductButtons = ({ isMobile }) => {
    return (
      <div
        className="cartButtons"
        style={
          isMobile
            ? {
                // position: "absolut e",
                bottom: 10,
                width: "100%",
              }
            : { width: "100%" }
        }
      >
        <div style={{ margin: "0 auto", maxWidth: isMobile ? "100%" : "100%" }}>
          {userDetails || false ? (
            <>
              <ProductPriceContainer className="cardButton">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    gap: "1rem",
                    margin: "0 auto",
                  }}
                  className="addToCartContainer"
                >
                  {product?.availableQuantity > 0 ||
                  product?.hasChildProduct ? (
                    <ProductButton
                      whileHover={{ scale: 1 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                      }}
                      small={onListPage}
                      onClick={(e) => {
                        if (product?.hasChildProduct) return;
                        e.stopPropagation();
                        addToCart();
                      }}
                    >
                      <ProductAddButton>
                        {/* {(!(product?.standardPriceWithoutDiscount > product?.standardPrice) || isTablet) && ( */}
                        {/* <span className="icon">{<FaAnglesRight />}</span> */}
                        <span className="icon">
                          <RiShoppingCart2Line />
                        </span>
                        <div className="hideContent">
                          {product?.hasChildProduct
                            ? "Choose options"
                            : "Add To Cart"}
                        </div>
                        {/* )} */}
                      </ProductAddButton>
                    </ProductButton>
                  ) : (
                    <ProductButton
                      style={{ cursor: "default" }}
                      disabled
                      small={onListPage}
                    >
                      <ProductAddButton>
                        <span className="icon">
                          <RiShoppingCart2Line />
                        </span>
                        <div className="hideContent">{"Out of stock"}</div>
                      </ProductAddButton>
                    </ProductButton>
                  )}
                </div>
              </ProductPriceContainer>
            </>
          ) : (
            <>
              <LoginButton
                whileHover={{ scale: 1 }}
                whileTap={{ scale: 0.9 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 17,
                }}
                small={onListPage}
                onClick={(e) => {
                  e.stopPropagation();
                  router.push("/account/login");
                }}
              >
                <LoginToAddButton>
                  <span className="icon">
                    <RiShoppingCart2Line />
                  </span>
                  <div className="hideContent">
                    {!isMobile ? "Login" : "Login for Price"}
                  </div>
                </LoginToAddButton>
              </LoginButton>
            </>
          )}
        </div>
      </div>
    );
  };
  return (
    <>
      <Dialog
        open={showQuickView}
        onClose={() => setShowQuickView(false)}
        maxWidth="xl"
        fullWidth={true}
      >
        <ProductQuickView>
          <AiOutlineClose
            className="closeIcon"
            onClick={() => setShowQuickView(false)}
          />
          {showQuickView && <ProductViewContainer id={product.productId} />}
        </ProductQuickView>
      </Dialog>
      <Link
        href={`/product-details/${paramCase(
          product.alias ?? product.productName
        )}?id=${product.productId}`}
      >
        <ProductCard
          isWhiteBg={isNew}
          className="product-card"
          onListPage={onListPage}
          onClick={handleProducts}
          color={getRandomColor()}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            style={{
              position: "absolute",
              top: "10px",
              right: "20px",
              zIndex: 20,
            }}
          >
            <QuickView className="quickView">
              {/* <QuickViewBtn onlyIcon>
                <FiHeart />
              </QuickViewBtn> */}
              <QuickViewBtn
                onlyIcon
                onClick={(e) => {
                  if (product?.hasChildProduct) return;
                  e.stopPropagation();
                  addToCart();
                }}
              >
                <RiShoppingCart2Line />
              </QuickViewBtn>
              <QuickViewBtn
                onlyIcon
                onClick={(e) => {
                  e.stopPropagation();
                  setShowQuickView(true);
                }}
              >
                <AiOutlineEye />
              </QuickViewBtn>
            </QuickView>
          </div>
          <ImageBox className="imageContainer" small={onListPage}>
            <Box className="imageBox">
              <div>
                <Image
                  src={
                    product.imageUrl && product.imageUrl !== "null"
                      ? product.imageUrl
                      : "/images/products/noImageAvailable.png"
                  }
                  alt={product.productName}
                  layout="intrinsic"
                  placeholder="blur"
                  blurDataURL={
                    product.imageUrl && product.imageUrl !== "null"
                      ? product.imageUrl
                      : "/images/products/noImageAvailable.png"
                  }
                  width={252}
                  height={252}
                  objectFit="contain"
                />
              </div>
            </Box>

            {/* {!isMobile && isHovered &&} */}
          </ImageBox>
          <ProductContent small={onListPage}>
            <ProductName small={onListPage}>{product.productName}</ProductName>
            {userDetails || false ? (
              <>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: { xs: "center" },
                    justifyContent: "space-between",
                    flexDirection: { xs: "column", md: "column" },
                    // width: "85%",
                    // padding: "0 0.875rem",
                    gap: { xs: "0", md: "0.5rem" },
                    // gap: "1rem",
                  }}
                >
                  {product?.standardPriceWithoutDiscount >
                  product?.standardPrice ? (
                    <ProductPrice small={onListPage} className="price">
                      <p>${product.standardPrice?.toFixed(2)}</p>
                      <del>
                        ${product.standardPriceWithoutDiscount?.toFixed(2)}
                      </del>
                    </ProductPrice>
                  ) : (
                    <ProductPrice small={onListPage} className="price">
                      <p>${product.standardPrice?.toFixed(2)}</p>
                    </ProductPrice>
                  )}
                </Box>
              </>
            ) : (
              <></>
            )}
            <ProductButtons />
          </ProductContent>
        </ProductCard>
      </Link>
    </>
  );
};

export default CommonProductCard;
