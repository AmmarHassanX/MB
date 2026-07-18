import React, { useRef } from "react";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
import { SwiperSlide } from "swiper/react";

SwiperCore.use([Autoplay, Navigation, Pagination]);
/////////
import { Container, ImageCard, SwiperContainer } from "./topProducts.styles";

import { Stack } from "@mui/material";
import Link from "next/link";
import { useDatafetcher } from "../../../utilities/hooks/useDatafetcher";

const TopProductsSlider = ({ businessId }) => {
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const { data: products } = useDatafetcher(
    `/home/sliderImages?sliderType=icon-banner&businessTypeId=${
      businessId || 1
    }`,
    true
  );

  if (products?.sliderImageList?.length > 0) {
    return (
      <Container
        direction="row"
        alignItems="center"
        justifyContent="center"
        className={`homeCarousel`}
      >
        <Stack
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          sx={{
            width: "100%",
            // backgroundImage: "url(/images/home/newsteller/bg.png)" /* Wavy pattern */,
            // backgroundSize: "cover",
            // backgroundPosition: "top center",
            // backgroundRepeat: "no-repeat",
            // padding: "14rem 2rem 4rem 2rem",
            padding: "2rem 0",
            // maxWidth: "1920px",
          }}
        >
          <SwiperContainer
            autoplay={{
              delay: 5000,
              disableOnInteraction: true,
            }}
            spaceBetween={0}
            breakpoints={{
              1: {
                slidesPerView: 3,
              },
              380: {
                slidesPerView: 4,
              },
              754: {
                slidesPerView: 6,
              },
              1080: {
                slidesPerView: 6,
              },
              1280: {
                slidesPerView: 6,
              },
              1480: {
                slidesPerView: 6,
              },
            }}
            loop={true}
            navigation={false}
            style={{ maxWidth: "100%" }}
          >
            {products?.sliderImageList?.map((product, i) => (
              <SwiperSlide
                key={i}
                style={{ display: "grid", placeItems: "center" }}
              >
                <Link href={product?.redirectPath || ""}>
                  <ImageCard index={i}>
                    <div
                      style={{
                        // background: "var(--surface)",
                        // borderRadius: "50%",
                        // height: "267px",
                        // width: "286px",
                        padding: "0rem 1.5rem",
                        margin: "auto",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                      }}
                    >
                      {/* <h1>{i + 1}</h1> */}
                      <img
                        src={
                          product?.imageUrl ||
                          "/images/products/noImageAvailable.png"
                        }
                        alt="img"
                      />
                    </div>
                    {/* <div>
                      <p style={{ fontSize: "1.6875rem", fontWeight: 700, color: "var(--text)" }}>
                        {product?.productName.substring(0, 15)}
                      </p>
                    </div> */}
                    {/* <p className="productName">{product?.name}</p> */}
                  </ImageCard>
                </Link>
              </SwiperSlide>
            ))}
          </SwiperContainer>
        </Stack>
      </Container>
    );
  } else <></>;
};

export default TopProductsSlider;
