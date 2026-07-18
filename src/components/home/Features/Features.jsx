import { Grid } from "@mui/material";
import React from "react";
import {
  FeaturesBox,
  FeaturesContainer,
  FeaturesSection,
} from "./FeaturesRow.styles";

const textContent = [
  {
    title:
      "Top-Rated Vape Wholesale and Vape Distributor in the USA With Over +2500 Brands, Wholesale Vape Shop, Smoke Shop Wholesale, Headshop & Dispensary Supplies",
    description:
      "MB Wholesale is one of the largest vape wholesale distributors in the USA, offering some of the industry top-selling online vape wholesale products and top disposable vapes brands at incredible wholesale prices. At Wisemen Wholesale, We are committed to supplying vape shops with only authentic disposable vape juices and wholesale disposable vapes with an almost never-ending list of Disposable Vapes juice Flavors. Here at Wisemen Wholesale you can discover and buy vapes in bulk with top disposable vapes brands at wholesale prices, including EBDesign, Mr. Fog,Funky Republic, Packspod, Fume, ORION BAR, Geek Bar, Breeze, Raz Disposable Vape and many more! .",
  },
  {
    title:
      "Disposable Vape Wholesale USA . MB Wholesale is The Largest Vape Wholesale in the USA, Disposable Vapes and Smoke Shop Supplies and Smoking Accessories. Elf Bar, Geek Bar, RAZ , Snoopy Smoke , Space Mary and More. Best Wholesale Prices and Fast Delivery in the USA .",
    description:
      "Discover our diverse selection of Wholesale E-liquids, specialty e-juices, top-tier vape mods, innovative box mods, a wide variety of wholesale e-cigs, sleek vaporizers, cutting-edge pod systems, carefully-crafted atomizers, long-lasting disposable vapes batteries, diverse tanks, and an extensive range of other wholesale vape products.",
  },
];

const Features = ({ onListPage }) => {
  return (
    <div>
      {/* <Stack
        flexDirection="column"
        alignItems="center"
        alignSelf="start"
        sx={{
          width: "100%",
          // borderBottom: "1px solid #06060610",
          margin: "auto",
          mt: "1rem",
          pt: "1rem",
          pb: "1rem",
          maxWidth: "1616px",
        }}
      >
        <Typography
          variant="h3"
          fontFamily="Poppins"
          fontWeight={600}
          sx={{
            color: "#2E3192",
            // textTransform: "uppercase",
            fontSize: "2.2rem",
            "& span": {
              color: "#2E3192",
            },
          }}
        >
          Support
        </Typography>
      </Stack> */}
      <FeaturesSection onListPage={onListPage}>
        <FeaturesContainer onListPage={onListPage}>
          <Grid
            container
            justifyContent="center"
            spacing={2}
            gap={{ xs: 0, lg: "2rem", xl: "4rem" }}
            alignItems="center"
          >
            {[
              {
                img: "/images/home/features/van.png",
                title: "FREE",
                title1: "DELIVERY",
                description: "When order from $500.",
              },
              {
                img: "/images/home/features/call.png",
                title: "Returns",
                title1: "& Refunds",
                description: "Read The Refund & Returns Policy",
              },
              {
                img: "/images/home/features/clock.png",
                title: "Secure",
                title1: "Payment",
                description: "100% Secure Payment",
              },
              {
                img: "/images/home/features/card.png",
                title: "Online",
                title1: "Support",
                description: "Our Support Team 24/7",
              },
            ].map((feature, index, array) => (
              <React.Fragment key={index}>
                <Grid xs={5.5} sm={5.5} md={5.5} lg={2.6} item>
                  <FeaturesBox onListPage={onListPage}>
                    <div>
                      <img
                        src={feature.img}
                        alt={feature.title}
                        style={{ width: "65px", height: "65px" }}
                      />
                    </div>
                    <div className="col">
                      <p>
                        <b>{feature.title}</b>{" "}
                        <b className="white">{feature.title1}</b>
                      </p>
                      <span>{feature.description}</span>
                    </div>
                  </FeaturesBox>
                </Grid>
                {/* {index < array.length - 1 && ( // Add a vertical divider unless it's the last item
                  <Divider
                    className="noBelowLg"
                    orientation="vertical"
                    flexItem
                    sx={{ height: "61px", margin: "auto 1rem", background: "#9D997E" }} // Custom styles for spacing and height
                  />
                )} */}
              </React.Fragment>
            ))}
          </Grid>
        </FeaturesContainer>

        {/* <div
            style={{
              maxWidth: "1490px",
              margin: "auto",
              // background: "var(--surface)",
              padding: "3rem 0 3.8125rem 0",
            }}
          >
            {textContent?.map((item, i) => {
              return (
                <div key={i} style={{ textAlign: "center" }}>
                  <p
                    style={{
                      fontSize: "1.5625rem",
                      color: "var(--accent)",
                      fontWeight: 700,
                      paddingTop: i !== 0 && "1.8125rem",
                      maxWidth: "80%",
                      margin: "auto",
                    }}
                  >
                    {item?.title}
                  </p>
                  <p style={{ fontSize: "1.375rem", color: "#606060", fontWeight: 300, paddingTop: "0.5625rem" }}>
                    {item?.description}
                  </p>
                </div>
              );
            })}
          </div> */}
      </FeaturesSection>
    </div>
  );
};

export default Features;
