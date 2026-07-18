import { Box, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { BsCheck2Circle } from "react-icons/bs";
import {
  FaFacebook,
  FaFacebookMessenger,
  FaInstagram,
  FaLinkedin,
  FaLinkedinIn,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import styled from "styled-components";
import theme from "../../utilities/theme/theme";
import { CiBoxes } from "react-icons/ci";
import { CiTimer } from "react-icons/ci";

const useStyles = makeStyles({
  root: {
    // borderTop: "1px solid #CBCBCB",
    width: "100%",
    fontFamily: "Poppins",
    display: "flex",
    gap: "4rem",
    "@media (max-width: 600px)": {
      flexDirection: "column",
      gap: "1rem",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  plus: {
    marginLeft: "0px !important",
    fontSize: "26px",
  },
  price: {
    fontSize: "14px",
  },
  span: {
    fontWeight: 800,
    fontSize: "16px",
  },
  del: {
    fontWeight: 500,
  },
});
const items = [
  {
    name: "facebook",
    icon: <FaFacebook style={{ fontSize: "1.3125rem", marginTop: "0.2rem" }} />,
  },
  {
    name: "instagram",
    icon: (
      <FaInstagram style={{ fontSize: "1.3125rem", marginTop: "0.2rem" }} />
    ),
  },
  {
    name: "linkedin",
    icon: <FaLinkedin style={{ fontSize: "1.3125rem" }} />,
  },
  {
    name: "whatsapp",
    icon: <FaWhatsapp style={{ fontSize: "1.3125rem" }} />,
  },
  // {
  //   name: "twitter",
  //   icon: <FaXTwitter style={{ fontSize: "1.3125rem", marginTop: "0.2rem" }} />,
  // },
  {
    name: "messenger",
    icon: <FaFacebookMessenger style={{ fontSize: "1.3125rem" }} />,
  },
];

const IconContainer = styled.div`
  cursor: pointer;
  svg {
    font-size: 1.1456rem;
    color: #dead51;
  }
  transition: all 0.5s;
  &:hover {
    transform: scale(1.2);
  }
`;

const StyledButton = styled.button`
  border: 1px solid ${theme.palette.colors.light};
  color: ${theme.palette.colors.secondary}80;
  background: transparent;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 0.875rem;
  svg {
    font-size: 18px;
  }
`;

export default function FrequentlyBought({ product }) {
  const classes = useStyles();
  const userDetails = useSelector((state) => state.auth.userDetails);

  return (
    <Box className={classes.root}>
      <Stack
        direction="column"
        alignItems="flex-start"
        justifyContent="center"
        spacing={0}
        sx={{ padding: "1rem 0 0rem 0" }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ fontWeight: "500", color: "var(--accent)" }}>Category:</div>
          <div style={{ color: "var(--accent)" }}>
            {product?.masterProductDetails?.masterCategoryName}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ fontWeight: "500", color: "var(--accent)" }}>
            Share this product:
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "1rem",
              gap: "22.59px",
              alignItems: "center",
              marginTop: "8px",
            }}
          >
            <a href={"/#"} target="_blank" rel="noreferrer">
              <FaFacebook
                style={{ cursor: "pointer" }}
                size={16}
                color="var(--accent)"
              />
            </a>
            <a href={"/#"} target="_blank" rel="noreferrer">
              <FaTwitter
                style={{ cursor: "pointer" }}
                size={16}
                color="var(--accent)"
              />
            </a>
            <a href={"/#"} target="_blank" rel="noreferrer">
              <FaLinkedinIn
                style={{ cursor: "pointer" }}
                size={16}
                color="var(--accent)"
              />
            </a>
          </div>{" "}
        </div>
      </Stack>
    </Box>
  );
}
