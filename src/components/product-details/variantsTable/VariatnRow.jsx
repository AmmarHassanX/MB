import { TableCell, TableRow } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { GrFormAdd } from "react-icons/gr";
import { MdOutlineRemove } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

import { Box, Dialog } from "@mui/material";
import { debounce } from "lodash";
import { setAlert } from "../../../AsyncFunctions/alert";
import { QuantityBox } from "../ProductDetails.styles";
import styled from "styled-components";

export const checkMainQtyMinMax = ({
  min,
  max,
  quantity,
  cartQuantity = 0,
  availableQuantity = 0,
  dispatch,
  isShowAlertMsg = true,
  flavor = "",
}) => {
  let quantityReturn = Number(quantity || 0);
  if (min && min > 1 && quantityReturn + cartQuantity < min) {
    isShowAlertMsg &&
      setAlert(
        "warn",
        <>
          Quantity of <strong style={{ color: "green" }}>{flavor}</strong>{" "}
          should be minimum <strong style={{ color: "red" }}>{min}</strong>.
        </>
      )(dispatch);
    quantityReturn = min > quantity && !isShowAlertMsg ? 0 : min - cartQuantity;
  }
  if (max && max >= 1 && quantityReturn + cartQuantity > max) {
    isShowAlertMsg &&
      setAlert(
        "warn",
        <>
          Quantity of <strong style={{ color: "green" }}>{flavor}</strong>{" "}
          should not be more than{" "}
          <strong style={{ color: "red" }}>{max}</strong>.
        </>
      )(dispatch);
    quantityReturn = max - cartQuantity;
  }
  if (quantityReturn + cartQuantity > availableQuantity) {
    isShowAlertMsg &&
      setAlert(
        "warn",
        <>
          Only{" "}
          <strong style={{ color: "red" }}>
            {availableQuantity - cartQuantity}
          </strong>{" "}
          <strong style={{ color: "green" }}>{flavor}</strong> is available.
        </>
      )(dispatch);
    quantityReturn = availableQuantity - cartQuantity;
  }
  if (min > availableQuantity) {
    setAlert(
      "warn",
      <>
        Minimum quantity of <strong style={{ color: "red" }}>{min}</strong>{" "}
        exceeds the available stock of{" "}
        <strong style={{ color: "red" }}>{availableQuantity}</strong> for{" "}
        <strong style={{ color: "green" }}>{flavor}</strong>.
      </>
    )(dispatch);
    quantityReturn = 0;
  }
  return quantityReturn;
};

const findFlavor = (variantLabelValues) => {
  if (!variantLabelValues || typeof variantLabelValues !== "object") {
    return "this variant";
  }

  const firstKey = Object.keys(variantLabelValues)[0];
  const flavorValue = variantLabelValues[firstKey] ?? "this variant";
  return flavorValue;
};

const StyledTableRow = styled(TableRow)`
  border: 1px solid var(--border);
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 10px;
  background: var(--surface);

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .MuiTableCell-root {
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    padding: 12px;

    &:first-child {
      border-left: 1px solid var(--border);
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }

    &:last-child {
      border-right: 1px solid var(--border);
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }
  }
`;

const VariantsCardRow = ({
  item,
  productsList,
  setProductsList,
  reset,
  index,
  headers,
}) => {
  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.auth.userDetails);
  const { availableQuantity, minQuantityToSale, maxQuantityToSale } = item;
  const cartData = useSelector((state) => state.cart.cartData);
  const cartItem = cartData?.cartLineItemDtoList?.find(
    (cartItem) => cartItem?.productId === item?.productId
  );
  const flavor = findFlavor(item?.productVariantLabelValues);

  const debouncedAddQty = useCallback(
    debounce((e) => {
      if (e.target.value > 0) {
        setQuantity(
          parseInt(
            checkMainQtyMinMax({
              min: minQuantityToSale,
              max: maxQuantityToSale,
              quantity: e.target.value,
              cartQuantity: cartItem?.quantity || 0,
              availableQuantity: availableQuantity,
              flavor,
              dispatch,
            })
          )
        );
      } else {
        setQuantity("");
      }
    }, 1000),
    [
      minQuantityToSale,
      maxQuantityToSale,
      cartItem,
      availableQuantity,
      flavor,
      dispatch,
    ]
  );

  const handleInputChange = (e) => {
    setQuantity(e.target.value);
    debouncedAddQty(e);
  };

  useEffect(() => {
    let newList = productsList.filter(
      (variant) => variant.productId !== item.productId
    );
    if (quantity > 0) {
      newList.push({ ...item, quantity });
    }
    setProductsList(newList);
  }, [quantity]);

  useEffect(() => {
    setQuantity(0);
  }, [reset]);

  const handleIncremenDecrement = (type) => {
    const { availableQuantity, minQuantityToSale, maxQuantityToSale } = item;
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
            flavor,
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
              flavor,
              dispatch,
            })
          )
        );
      }
    }
  };
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <StyledTableRow>
        <TableCell component="th" scope="row" align="left">
          <Box
            onClick={handleClickOpen}
            sx={{
              position: "relative",
              height: "41px",
              width: "42px",
              border: "1px solid #d5d5d5",
              borderRadius: "4px",
              transition: "0.4s ease-in-out",
              cursor: "pointer",
              img: {
                borderRadius: "6px",
              },
              ":hover": {
                transform: "scale(1.2)",
              },
            }}
          >
            <Image
              layout="fill"
              objectFit="contain"
              src={
                item?.imageUrl && item?.imageUrl !== "null"
                  ? item?.imageUrl
                  : "/images/products/imgnotfound.png"
              }
              alt="Image"
              placeholder="blur"
              blurDataURL={
                item?.imageUrl && item?.imageUrl !== "null"
                  ? item?.imageUrl
                  : "/images/products/imgnotfound.png"
              }
            />
          </Box>
        </TableCell>
        {(
          (item?.productVariantLabelValues &&
            Object?.keys(item?.productVariantLabelValues)) ||
          headers
        )
          ?.sort()
          ?.reverse()
          ?.map((key, i) => {
            return (
              <TableCell component="th" scope="row" align="left" key={i}>
                <p
                  style={{
                    fontSize: "16px",
                    color: "#605F5F",
                    fontWeight: 300,
                  }}
                >
                  {item?.productVariantLabelValues?.[key] || ""}
                </p>
                <div style={{ color: "var(--text-2)", fontWeight: "300" }}>
                  SKU : {item?.sku}
                </div>
              </TableCell>
            );
          })}

        <TableCell component="th">
          <p style={{ fontSize: "15px", color: "var(--accent)", fontWeight: 400 }}>
            {item?.availableQuantity || ""}
          </p>
        </TableCell>
        <TableCell component="th">
          {item.availableQuantity > 0 || !userDetails ? (
            <>
              <QuantityBox small maxWidth="100px">
                <div
                  className="circle"
                  onClick={() => handleIncremenDecrement("decrement")}
                >
                  <MdOutlineRemove style={{ fontSize: "inherit" }} />
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
                <div
                  className="circle"
                  onClick={() => handleIncremenDecrement("increment")}
                >
                  <span>
                    <GrFormAdd style={{ fontSize: "inherit" }} />
                  </span>
                </div>
              </QuantityBox>
            </>
          ) : (
            <p className="red" style={{ fontSize: "1rem" }}>
              {item?.eta !== "Not Available" ? "Coming Soon" : "Out of stock"}
            </p>
          )}
        </TableCell>
        <TableCell component="th">
          {userDetails ? (
            <div>
              <p
                style={{
                  fontSize: "18px",
                  fontWeight: 500,
                  color: "var(--accent)",
                }}
              >
                ${item.standardPrice.toFixed(2)}
              </p>
            </div>
          ) : (
            <Box
              sx={{
                a: {
                  fontSize: "1.3769rem",
                  fontWeight: 600,
                  color: "var(--accent)",
                },
              }}
            >
              <Link href="/account/login">Login</Link>
            </Box>
          )}
        </TableCell>
      </StyledTableRow>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          ".MuiPaper-root": {
            width: "auto",
            height: "auto",
            overflow: "hidden",
            maxWidth: "none",
            img: {
              borderRadius: "4px",
            },
          },
        }}
      >
        <Box>
          <img
            src={
              item?.imageUrl && item?.imageUrl !== "null"
                ? item?.imageUrl
                : "/images/products/imgnotfound.png"
            }
            alt="Image"
            style={{ maxHeight: 650 }}
          />
        </Box>
      </Dialog>
    </>
  );
};

export default VariantsCardRow;
