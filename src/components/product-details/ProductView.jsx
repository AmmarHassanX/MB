import {
  Box,
  Chip,
  CircularProgress,
  Dialog,
  DialogContent,
  Grid,
  Rating,
  Skeleton,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
///////
import { makeStyles } from "@mui/styles";
import axios from "axios";
import { debounce } from "lodash";
import { useRouter } from "next/router";
import { AiFillCaretUp, AiOutlineCaretDown } from "react-icons/ai";
import {
  MdOutlineRemove,
  MdOutlineVerifiedUser,
  MdRemoveRedEye,
} from "react-icons/md";
import styled from "styled-components";
import { setAlert } from "../../AsyncFunctions/alert";
import { addTocart, localAddToCart } from "../../AsyncFunctions/cart";
import theme from "../../utilities/theme/theme";
import FrequentlyBought from "./FrequentlyBought";
import { GoArrowRight } from "react-icons/go";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { BsCart3 } from "react-icons/bs";

import {
  AttachmentChip,
  BtnsSection,
  PriceBox,
  ProductDetailedName,
  ProductDetailsBox,
  ProductDetailsTitle,
  ProductImageContainer,
  ProductShortDescriptions,
  ProductView,
  QuantityBox,
} from "./ProductDetails.styles";
import ProductImgCarousel from "./ProductImageCarousel/ProductImageCarousel";
import VariantsTable from "./variantsTable/VariantsTable";
import { checkMainQtyMinMax } from "./variantsTable/VariatnRow";
import { BsFillBasket2Fill } from "react-icons/bs";
import { PiHandbag } from "react-icons/pi";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { GrFormAdd } from "react-icons/gr";

const useStyles = makeStyles({
  root: {
    position: "relative",
    marginTop: 35,
    maxWidth: "426px",
    "& > span": {
      width: "100%!important",
    },
  },
  bg: {
    backgroundColor: "var(--surface)",
  },
  img: {
    // height: "256px",

    objectFit: "contain",
  },
  inner: {
    position: "absolute",
    left: 20,
    bottom: 30,
  },
  h5: {
    color: "#fff",
  },
  btn: {
    borderColor: "#fff",
    color: "#fff",
    borderRadius: 0,
    marginTop: 8,
  },
});

const ProductViewContainer = ({ productDetails, loading, id }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const router = useRouter();
  const isLoading = useSelector((state) => state.cart.isLoading);
  const userDetails = useSelector((state) => state.auth.userDetails);
  const token = useSelector((state) => state.auth.tokens?.token);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [reset, setReset] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [data, setData] = useState(null);
  const [productLoading, setProductLoading] = useState(false);
  const stateId = useSelector(
    (state) => state.auth.userDetails
  )?.customerDto?.customerStoreAddressList?.find(
    (address, index) => address?.active === true || index === 0
  )?.stateId;
  const [attachmentModal, setAttachmentModal] = useState({
    open: false,
    url: "",
  });
  const allowLocalCartData = useSelector(
    (state) => state.cart.allowLocalCartData
  );
  const allowLocalCart = !userDetails && allowLocalCartData;

  let product = productDetails || data;

  const cartData = useSelector((state) => state.cart.cartData);
  const cartItem = cartData?.cartLineItemDtoList?.find(
    (cartItem) =>
      cartItem?.productId === product?.masterProductDetails?.productId
  );

  const debouncedAddQty = debounce(
    (e, product, cartItem, dispatch, setQuantity) => {
      if (e.target.value > 0) {
        setQuantity(
          parseInt(
            checkMainQtyMinMax({
              min: product?.masterProductDetails?.minQuantityToSale,
              max: product?.masterProductDetails?.maxQuantityToSale,
              quantity: e.target.value,
              cartQuantity: cartItem?.quantity || 0,
              availableQuantity:
                product?.masterProductDetails?.availableQuantity,
              flavor: product?.masterProductDetails?.productName.substring(
                0,
                15
              ),
              dispatch,
            })
          )
        );
      } else {
        setQuantity("");
      }
    },
    1000
  ); // Delay of 1 second

  const handleInputChange = (e) => {
    setQuantity(e.target.value); // Immediately update the input value
    debouncedAddQty(e, product, cartItem, dispatch, setQuantity); // Debounced update
  };

  const openAttachment = (url) => {
    setAttachmentModal({
      open: true,
      url: url,
    });
  };

  ///////fetching details if not
  // const { data, loading: productLoading } = useDatafetcher(
  //   `/ecommerce/product/${id}?storeIds=${2}`,
  //   !productDetails && id
  // );
  //setting products and images
  let images =
    product?.productImageList && product?.productImageList.length > 0
      ? product?.productImageList
      : ["/images/products/imgnotfound.png"];
  // //short description
  const shortDescription = () => {
    return { __html: product?.masterProductDetails?.shortDescription || "" };
  };

  ///////functions
  const handleIncremenDecrement = (type) => {
    const { availableQuantity, minQuantityToSale, maxQuantityToSale } =
      product?.masterProductDetails;
    if (!userDetails)
      return setAlert("warn", "login to add quantity")(dispatch);
    if (type === "increment") {
      setQuantity(
        parseInt(
          checkMainQtyMinMax({
            min: minQuantityToSale,
            max: maxQuantityToSale,
            quantity: quantity + 1,
            cartQuantity: cartItem?.quantity || 0,
            availableQuantity: availableQuantity,
            flavor: product?.masterProductDetails?.productName.substring(0, 15),
            dispatch,
          })
        )
      );
    } else {
      if (quantity > 0) {
        setQuantity(
          parseInt(
            checkMainQtyMinMax({
              min: minQuantityToSale,
              max: maxQuantityToSale,
              quantity: quantity - 1,
              cartQuantity: cartItem?.quantity || 0,
              availableQuantity: availableQuantity,
              flavor: product?.masterProductDetails?.productName.substring(
                0,
                15
              ),
              dispatch,
            })
          )
        );
      }
    }
  };
  ///////
  const addToCart = () => {
    if (isLoading) return;
    if (selectedProducts.length > 0) {
      if (allowLocalCart) {
        localAddToCart(selectedProducts, localCartData)(dispatch);
      } else {
        addTocart(
          selectedProducts,
          token
        )(dispatch).then(() => {
          setReset((reset) => !reset);
          setSelectedProducts([]);
        });
      }
    } else {
      setAlert("warn", "Please add some quantity to continue")(dispatch);
    }
  };

  useEffect(() => {
    let newList = selectedProducts.filter(
      (variant) =>
        variant.productId !== product?.masterProductDetails?.productId
    );
    if (quantity > 0) {
      newList.push({ ...product?.masterProductDetails, quantity });
    }
    setSelectedProducts(newList);
  }, [quantity]);
  useEffect(() => {
    setQuantity(0);
    setSelectedProducts([]);
  }, [reset]);
  useEffect(() => {
    if (id) {
      setProductLoading(true);
      const url =
        `${process.env.API_BASE_URL}/ecommerce/product/${id}?storeIds=${2}` +
        `${stateId ? `&stateId=${stateId}` : ""}`;
      axios
        .get(url, { headers: token && { Authorization: `Bearer ${token}` } })
        .then((res) => {
          setProductLoading(false);
          setData(res.data.result);
        });
    }
  }, [id]);
  if (!product) return skeletonLoader();

  return (
    <>
      <InvoiceDialog
        onClose={() => setAttachmentModal({ open: false })}
        aria-labelledby="customized-dialog-title"
        open={attachmentModal?.open}
        maxWidth="lg"
      >
        <DialogContent dividers>
          <iframe src={attachmentModal.url} />
        </DialogContent>
      </InvoiceDialog>
      {/* {!userDetails && (
        <p
          style={{
            paddingBottom: "1rem",
            borderBottom: `1px solid ${theme.palette.colors.light}`,
            color: theme.palette.colors.secondary,
          }}
        >
          Hi there, Visitor! New to our platform?{" "}
          <Link href={"/account/register"}>
            <span style={{ color: theme.palette.colors.primary, fontWeight: 500, cursor: "pointer" }}>
              Create an Account
            </span>
          </Link>{" "}
          to unlock our exclusive B2B wholesale deals and services! Already a member?{" "}
          <Link href={"/account/login"}>
            <span style={{ color: theme.palette.colors.primary, fontWeight: 500, cursor: "pointer" }}>Sign In</span>
          </Link>{" "}
          to continue. If you have any difficulties, please use our STAR (online chat support) or call us at
          000-000-0000 or you can e-mail us at support@abc.com
        </p>
      )} */}
      <ProductView>
        <ProductImageContainer>
          {/* {
          <>
            {
            product?.masterProductDetails?.standardPriceWithoutDiscount >
              product?.masterProductDetails?.standardPrice ? (
              <Box
                sx={{
                  background: "green",
                  padding: "2px 6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                  color: "#fff",
                  fontWeight: 500,
                  position: "absolute",
                  top: 0,
                  left: 10,
                  zIndex: 99,
                }}
              >
                {(
                  ((product?.masterProductDetails?.standardPriceWithoutDiscount -
                    product?.masterProductDetails?.standardPrice) /
                    product?.masterProductDetails?.standardPrice) *
                  100
                )?.toFixed(1)}
                % OFF
              </Box>
            ) : (
              <></>
            )}
          </>
        } */}
          <ProductImgCarousel
            images={images}
            loading={loading ?? productLoading}
          />
        </ProductImageContainer>
        <ProductDetailsBox>
          {/* <p
            style={{
              // paddingTop: "2rem",
              fontSize: "1.4375rem",
              fontWeight: 500,
              color: "var(--accent)",
              // textTransform: "capitalize",
            }}
          >
            {product?.masterProductDetails?.productName?.split(" ")[0]}
          </p> */}
          {product?.masterProductDetails?.brandName && (
            <div
              style={{
                backgroundColor: "#E0F9F9",
                padding: "5px 13px",
                borderRadius: "10px",
              }}
            >
              <div style={{ color: "var(--accent)", fontSize: "13px" }}>
                {product?.masterProductDetails?.brandName}
              </div>
            </div>
          )}
          <ProductDetailedName>
            {product?.masterProductDetails?.productName}
          </ProductDetailedName>
          <>
            <Grid container spacing={2}>
              {productDetails?.masterProductDetails?.attachmentUrlList?.[0]
                ?.split(",")
                ?.map((data, i) => {
                  return (
                    <Grid item key={i}>
                      <Tooltip title="Click to Preview" placement="top">
                        <Chip
                          icon={<MdRemoveRedEye size={20} />}
                          label={
                            <AttachmentChip>{`Document ${
                              i + 1
                            }`}</AttachmentChip>
                          }
                          onClick={() => {
                            openAttachment(data);
                          }}
                        />
                      </Tooltip>
                    </Grid>
                  );
                })}
            </Grid>
          </>

          {product?.masterProductDetails?.shortDescription &&
            product?.masterProductDetails?.shortDescription !== "null" && (
              <ProductShortDescriptions iptions>
                <div dangerouslySetInnerHTML={shortDescription()} />
              </ProductShortDescriptions>
            )}
          {/* <ProductDetailsTitle>
            <Rating
              name="half-rating-read"
              defaultValue={3}
              precision={0.5}
              readOnly
            />
            <p className="green-text">(4.5) | 337 ratings</p>
          </ProductDetailsTitle> */}
          <hr
            style={{
              // maxWidth: "1400px",
              margin: "13px auto",
              // marginBottom: "2rem",
              background: "#BBD9DA",
              height: "1px", // Adjust thickness as needed
              border: "none", // Ensure no border is applied
            }}
          />
          {userDetails ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "24px",
              }}
            >
              <div style={{ color: "var(--text-2)", fontWeight: "300" }}>
                Availability :{" "}
                <span style={{ color: "var(--accent)", fontWeight: "500" }}>
                  {product?.masterProductDetails?.availableQuantity > 0 ||
                  product?.body?.content?.length > 0
                    ? " In stock"
                    : "Out of stock"}
                </span>
              </div>

              <IoMdCheckmarkCircleOutline size={18} color="var(--accent)" />
            </div>
          ) : (
            <></>
          )}
          {/* <Box
            sx={{
              display: "flex",
              flexWrap: "wrap", // Allow wrapping on smaller screens
              gap: { xs: "0.5rem", sm: "1rem" }, // Smaller gaps for small screens
              justifyContent: { xs: "center", sm: "flex-start" },
              alignItems: { xs: "center", sm: "flex-start" },
              padding: "0.5rem 0",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: { xs: "0.25rem", sm: "0.5rem" }, // Responsive gap
                alignItems: "center",
              }}
            >
              <MdOutlineVerifiedUser
                style={{ color: "#73D85F", fontSize: "1.25rem" }}
              />
              <p
                style={{
                  fontSize: "12px",
                  margin: 0, // Remove margin for better spacing control
                }}
              >
                <span
                  style={{
                    color: "#73D85F",
                    fontSize: "1rem",
                    fontWeight: 700,
                  }}
                >
                  Available
                </span>{" "}
                - Order Now, Ships Tomorrow!
              </p>
            </Box>
            <span style={{ color: "#9E9E9E" }}>|</span>
            <Typography
              variant="body1"
              fontFamily="Poppins"
              fontSize={{ sm: "0.9375rem" }} // Responsive font size
              fontWeight={300}
              sx={{
                color: "#212429",
              }}
            >
              <b>UPC:</b>{" "}
              {product?.masterProductDetails?.upc === "null"
                ? ""
                : product?.masterProductDetails?.upc || ""}
            </Typography>
            {/* <span>|</span>
            <Typography
              fontFamily="Poppins"
              fontSize={{ sm: "0.9375rem" }} // Responsive font size
              fontWeight={300}
              sx={{
                color: "#212429",
              }}
            >
              <b>SKU:</b> {product?.masterProductDetails?.sku === "null" ? "" : product?.masterProductDetails?.sku || ""} 
            </Typography> */}
          {/* <span style={{ color: "#9E9E9E" }}>|</span>
            <ProductDetailsTitle>
              <Rating
                name="half-rating-read"
                defaultValue={5}
                precision={0.5}
                readOnly
              />
              <p className="green-text" style={{ fontSize: "12px", margin: 0 }}>
                (1 customer review)
              </p>
            </ProductDetailsTitle>
          </Box>  */}

          {userDetails && (
            <>
              {product?.masterProductDetails?.standardPriceWithoutDiscount >
              product?.masterProductDetails?.standardPrice ? (
                <>
                  {/* <hr style={{ margin: "1rem 0" }} /> */}
                  <PriceBox>
                    <span>
                      $
                      {product?.masterProductDetails?.standardPriceWithoutDiscount?.toFixed(
                        2
                      )}
                    </span>
                    <h6>
                      $
                      {product?.masterProductDetails?.standardPrice?.toFixed(2)}
                    </h6>
                  </PriceBox>
                </>
              ) : product?.masterProductDetails?.standardPrice > 0 ? (
                <PriceBox>
                  <h6>
                    ${product?.masterProductDetails?.standardPrice?.toFixed(2)}
                  </h6>
                </PriceBox>
              ) : null}
              {/* <p style={{ color: "gray", fontSize: "3rem", opacity: 0.4, marginTop: "-4rem" }}>
                {userDetails?.customerDto?.id}
              </p> */}
            </>
          )}
          {product?.body?.content?.length > 0 ? (
            <VariantsTable
              reset={reset}
              productsList={selectedProducts}
              content={product?.body?.content}
              setProductsList={setSelectedProducts}
              headers={product?.header}
            />
          ) : (
            <>
              {userDetails &&
              product?.masterProductDetails?.availableQuantity > 0 ? (
                <>
                  <Typography
                    variant="body1"
                    fontFamily="Poppins"
                    fontWeight={500}
                    fontSize="17px"
                    sx={{
                      color: theme.palette.colors.primary,
                      padding: "1rem 0",
                      span: {
                        color: theme.palette.colors.black,
                        fontWeight: 400,
                      },
                    }}
                  >
                    <span>Availability: </span>
                    {`${product?.masterProductDetails?.availableQuantity} in stock`}
                  </Typography>
                  <QuantityBox small maxWidth="100px" className="no-variant">
                    <div className="circle">
                      <span
                        onClick={() => handleIncremenDecrement("decrement")}
                      >
                        <MdOutlineRemove style={{ fontSize: "inherit" }} />
                      </span>
                    </div>
                    <input
                      className="input-qty"
                      type="number"
                      value={quantity}
                      onBlur={(e) => {
                        if (!e.target.value) setQuantity(parseInt(0));
                      }}
                      onChange={handleInputChange}
                    />
                    <div className="circle">
                      <span
                        onClick={() => handleIncremenDecrement("increment")}
                      >
                        <GrFormAdd style={{ fontSize: "inherit" }} />
                      </span>
                    </div>
                  </QuantityBox>
                </>
              ) : (
                <p style={{ color: "red" }} className="red">
                  {userDetails ? "Out of Stock" : ""}
                </p>
              )}
            </>
          )}
          <BtnsSection>
            {userDetails ? (
              <button
                disabled={
                  !(
                    product?.masterProductDetails?.availableQuantity > 0 ||
                    product?.body?.content?.length > 0
                  )
                }
                style={{
                  background:
                    !(
                      product?.masterProductDetails?.availableQuantity > 0 ||
                      product?.body?.content?.length > 0
                    ) && "#08080890",
                  cursor:
                    !(
                      product?.masterProductDetails?.availableQuantity > 0 ||
                      product?.body?.content?.length > 0
                    ) && "default",
                }}
                onClick={() => addToCart()}
              >
                {isLoading ? (
                  <CircularProgress color="inherit" size={"24px"} />
                ) : (
                  <>
                    <BsCart3 className="icon" />
                    Add to cart
                  </>
                )}
              </button>
            ) : (
              <button onClick={() => router.push("/account/login")}>
                Login
                {/* <BiBasket className="icon" /> */}
              </button>
            )}
          </BtnsSection>

          {/* <FrequentlyBought product={product} /> */}
          {/* <OutOfStock apiEndPoint={process.env.API_BASE_URL} product={product} colors={{ primaryColor: "#000000" }} /> */}
        </ProductDetailsBox>
      </ProductView>
    </>
  );
};

export default ProductViewContainer;

const InvoiceDialog = styled(Dialog)`
  iframe {
    width: 60vw;
    border: none;
    height: 70vh;
  }
`;

const skeletonLoader = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        padding: "1rem",
        overflow: "hidden",
      }}
    >
      <Grid container spacing={4}>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Skeleton
            animation="wave"
            variant="rectangular"
            style={{
              width: "100%",
              height: "60vh",
              borderRadius: "4px",
            }}
          />
          <Skeleton
            animation="wave"
            variant="rectangular"
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "4px",
              marginTop: "1rem",
            }}
          />
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Skeleton
            animation="wave"
            variant="rectangular"
            style={{
              width: "100%",
              height: "30px",
              borderRadius: "4px",
            }}
          />
          <Skeleton
            animation="wave"
            variant="rectangular"
            style={{
              width: "20%",
              marginTop: "1rem",
              height: "30px",
              borderRadius: "4px",
            }}
          />
          <Skeleton
            animation="wave"
            variant="rectangular"
            style={{
              width: "100%",
              marginTop: "1rem",
              height: "30px",
              borderRadius: "4px",
            }}
          />
          <Skeleton
            animation="wave"
            variant="rectangular"
            style={{
              width: "100%",
              marginTop: "1rem",
              height: "100%",
              borderRadius: "4px",
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
};
