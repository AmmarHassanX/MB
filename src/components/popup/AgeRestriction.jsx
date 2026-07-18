import { Button } from "@mui/material";
import { styled } from "@mui/system";
import Image from "next/image";
import Router from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import styles from "./popups.module.scss";

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
const AgeRestriction = ({ showAge, setShowAge }) => {
  const logoUrl = useSelector((state) => state.auth?.stores)?.[0]?.logoUrl;

  return (
    <>
      <div className={styles.container}>
        <div className={styles.modal}>
          <Image
            src={
              // logoUrl ||
              "/images/header/logo.png"
            }
            alt="img"
            width={300}
            height={104}
            layout="fixed"
            className={styles.img}
            objectFit="contain"
          />
          <h1>Age Verification</h1>
          <p>
            You must be 21 years of age or older to view this website.By
            entering this website, you agree that you are 21 years of age or
            older. Falsifying your age for the purpose of purchasing products
            from this web site is illegal and punishable by law.
          </p>
          <div className={styles.btnContainer}>
            <button
              className={styles.enterbtn}
              onClick={() => {
                // show(false);
                sessionStorage.setItem("DontShowPopups", "true");
                setShowAge(false);
              }}
            >
              ENTER
            </button>
            <button
              className={styles.Inbtn}
              onClick={() => {
                Router.push("https://www.google.com/");
              }}
            >
              UNDERAGE
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AgeRestriction;
// 826
// 356
