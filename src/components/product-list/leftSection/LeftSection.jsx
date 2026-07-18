import React, { useState } from "react";
/////
import NavDrawer, { BrandNav } from "../../Navigation/NavDrawer/NavDrawer";
import styles from "./leftsection.module.scss";
// import Features from "../../home/Features/Features";
import { Box, Stack } from "@mui/material";
import { FaAngleDown } from "react-icons/fa6";
import theme from "../../../utilities/theme/theme";

const LeftSection = ({ data, businessId = 1 }) => {
  const [isCategoryDropDownOpen, setIsCategoryDropdownOpen] = useState(true);
  const [isBrandsDropDownOpen, setIsBrandsDropdownOpen] = useState(true);

  return (
    <div className={styles.LeftNavContainer}>
      <div className={styles.DropDownHeading}>
        <Box
          onClick={() => setIsCategoryDropdownOpen(!isCategoryDropDownOpen)}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <span>Categories</span>
          <FaAngleDown
            style={{
              fontSize: "1.5rem",
              cursor: "pointer",
              transform: isCategoryDropDownOpen && "rotate(180deg)",
              marginTop: "0.3rem",
              userSelect: "none",
            }}
          />
        </Box>
      </div>

      {isCategoryDropDownOpen && (
        <Stack className={styles.DropContent}>
          <NavDrawer onListPage={true} businessId={businessId} />
        </Stack>
      )}
      <Box mT={2} sx={{ width: "100%", display: "none" }}>
        <div className={styles.DropDownHeading}>
          <Box
            onClick={() => setIsBrandsDropdownOpen(!isBrandsDropDownOpen)}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <span>Brands</span>
            <FaAngleDown
              style={{
                fontSize: "1.5rem",
                cursor: "pointer",
                color: theme.palette.colors.primary,
                transform: isBrandsDropDownOpen && "rotate(180deg)",
                marginTop: "0.3rem",
                userSelect: "none",
              }}
            />
          </Box>
        </div>
        {/* <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            paddingLeft: "0.7rem",
          }}
        >
          <div
            style={{
              height: "4px",
              backgroundColor: "var(--accent)",
              maxWidth: "50px",
              width: "100%",
              borderRadius: "6px",
            }}
          ></div>
        </div> */}
        {isBrandsDropDownOpen && (
          <Stack className={styles.DropContent}>
            <BrandNav businessId={businessId} />
          </Stack>
        )}
      </Box>
      {/* <Features onListPage={true} /> */}
      {/* <Box
        my={2}
        sx={{
          span: {
            height: "450px !important",
            width: "100% !important",
            img: {
              objectFit: "contain",
            },
          },
        }}
      >
        <Image
          src="/images/home/banner/left-banner.png"
          layout=""
          height={450}
          width={287}
        />
      </Box> */}
    </div>
  );
};

export default LeftSection;
