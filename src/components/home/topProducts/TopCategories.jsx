import React, { useRef } from "react";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
import { SwiperSlide } from "swiper/react";

SwiperCore.use([Autoplay, Navigation, Pagination]);
/////////
import { Grid, Stack, useMediaQuery } from "@mui/material";
import Link from "next/link";
import { FiInstagram } from "react-icons/fi";
import { useDatafetcher } from "../../../utilities/hooks/useDatafetcher";
import { Container, ImageCard, SwiperContainer } from "./categories.styles";
import theme from "../../../utilities/theme/theme";

const TopCategories = ({ businessId }) => {
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const isMobile = useMediaQuery("(max-width:640px)");

  const { data: products } = useDatafetcher(
    `/home/sliderImages?sliderType=top-products&businessTypeId=${businessId || 1}`,
    true
  );
  return (
    <div style={{ backgroundColor: "var(--bg-elevated)" }}>
      <div
        style={{
          maxWidth: "1450px",
          margin: "0 auto",
          paddingBottom: "3rem",
          maxHeight: "537px",
          overflow: "visible",
        }}
      >
        <Grid container spacing={2}>
          <Grid item lg={12} md={12} sm={12} xs={12} padding={"1rem"}>
            <div style={{ padding: "0 1rem" }}>
              <div
                style={{
                  fontSize: isMobile ? "2rem" : "50px",
                  fontWeight: 500,
                  color: theme.palette.colors.primary,
                  textAlign: "center",
                  textTransform: "capitalize",
                  lineHeight: 1,
                  marginTop: "2rem",
                }}
              >
                Recommended for you
              </div>
              <div
                style={{
                  fontWeight: 300,
                  fontSize: isMobile ? "1rem" : "17px",
                  marginTop: "10px",
                  color: "var(--text)",
                  textAlign: "center",
                }}
              >
                We know you might like these products
              </div>
            </div>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            {products?.sliderImageList?.length > 0 ? (
              <Container
                direction="row"
                alignItems="center"
                justifyContent="center"
                className={`homeCarousel`}
                style={{
                  background:
                    "url(/images/home/discoverSection/background.png)",
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                }}
              >
                <Stack
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="center"
                  sx={{
                    width: "100%",
                    padding: "0 0",
                    marginTop: isMobile ? "0" : "60px",
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
                        slidesPerView: 1,
                      },
                      380: {
                        slidesPerView: 1,
                      },
                      754: {
                        slidesPerView: 2,
                      },
                      1080: {
                        slidesPerView: 3,
                      },
                      1280: {
                        slidesPerView: 3,
                      },
                      1480: {
                        slidesPerView: 3,
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
        </Grid>
      </div>
    </div>
  );
};

export default TopCategories;
