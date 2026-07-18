import React, { useRef } from "react";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
import { SwiperSlide } from "swiper/react";

SwiperCore.use([Autoplay, Navigation, Pagination]);
/////////
import { Grid, Stack, useMediaQuery } from "@mui/material";
import Link from "next/link";
import { FiInstagram } from "react-icons/fi";
import { useDatafetcher } from "../../../utilities/hooks/useDatafetcher";
import { Container, ImageCard, SwiperContainer } from "./discover.styles";

const DiscoverySectionSlider = ({ businessId }) => {
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const isMobile = useMediaQuery("(max-width:640px)");

  const { data: products } = useDatafetcher(
    `/home/sliderImages?sliderType=discover-section&businessTypeId=${
      businessId || 1
    }`,
    true
  );
  return (
    <div
      style={{
        backgroundColor: "#E7F3FD",
        padding: isMobile ? "1rem" : "59px 74px",
        maxWidth: "1400px",
        maxHeight: "537px",
        margin: "0 auto 1rem auto",
      }}
    >
      <Grid container spacing={2}>
        <Grid item lg={8} md={12} sm={12} xs={12}>
          {products?.sliderImageList?.length > 0 ? (
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
                  padding: "0 0",
                }}
              >
                <SwiperContainer
                  autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
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
                          <img
                            src={
                              product?.imageUrl ||
                              "/images/products/noImageAvailable.png"
                            }
                            alt="img"
                          />
                        </ImageCard>
                      </Link>
                    </SwiperSlide>
                  ))}
                </SwiperContainer>
              </Stack>
            </Container>
          ) : (
            <></>
          )}
        </Grid>
        <Grid item lg={4} md={12} sm={12} xs={12} padding={"1rem"}>
          <div style={{ padding: "0 1rem" }}>
            {" "}
            <FiInstagram size={79} />
            <div
              style={{ fontSize: isMobile ? "2rem" : "44px", fontWeight: 400 }}
            >
              Discover Your Favorite Instagram Post
            </div>
            <div
              style={{
                fontWeight: 700,
                fontSize: isMobile ? "1.5erm" : "38px",
                marginTop: "11px",
              }}
            >
              @LegacyBrands
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default DiscoverySectionSlider;
