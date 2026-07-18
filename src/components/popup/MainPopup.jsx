import Image from "next/image";
import Router from "next/router";
import React, { useEffect } from "react";
import { styled } from "@mui/system";
import { Box, Typography, Button } from "@mui/material";
import styles from "./popups.module.scss";
import AgeRestriction from "./AgeRestriction";
import Script from "next/script";
import OfferPopup from "./OfferPopup";

const OutlinedButton = styled(Button)({
  fontSize: "20px",
  textTransform: "capitalize",
  color: "#fff",
  height: "73px",
  border: "1px solid #fff",
  padding: "20px",
  width: "250px",
  borderRadius: 0,
  transition: "background 1s ease 0s",
  margin: "0 auto",
  ":hover": {
    background: "#000",
  },
});
const MainPopup = ({ show, setShow }) => {
  const [showAge, setShowAge] = React.useState(false);
  const [showOffer, setShowOffer] = React.useState(false);

  useEffect(() => {
    let body = document.getElementsByTagName("body")[0];
    if (showAge) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "auto";
    }
    const DontShowPopups = sessionStorage.getItem("DontShowPopups");
    ////console.log(DontShowPopups);
    if (DontShowPopups) {
      setShowAge(false);
    } else {
      // setShowAge(true);
      setShowAge(true);
    }
  }, [showAge]);

  useEffect(() => {
    if (!showOffer) {
      setShowOffer(true);
    }
  }, []);

  return (
    <>
      {showAge && (
        <>
          <div className={styles.container}>
            <AgeRestriction showAge={showAge} setShowAge={setShowAge} />
          </div>
        </>
      )}
      {showOffer && !showAge && <OfferPopup show={showOffer} setShow={setShowOffer} />}
    </>
  );
};

export default MainPopup;
