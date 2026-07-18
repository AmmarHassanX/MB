import { Grid, Paper } from "@mui/material";
import { BrandList } from "@salesgenterp/ui-components";
import React from "react";
import styled from "styled-components";
import { Swiper } from "swiper/react";
import useWindowSize from "../../../../src/utilities/hooks/useWindowSize";

// const Container = styled(Stack)`
//   width: 100%;
//   margin-bottom: 5em;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   @media only screen and (max-width: 768px) {
//     height: 10.8rem;
//   }
// `;
const SwiperContainer = styled(Swiper)`
  width: 100%;
  display: flex;
  flex-direction: row;
  min-width: 380px;
`;
const BrandImg = styled.img`
  width: 100%;
  min-height: 114px;
  margin: auto;
  object-fit: contain;
  padding: 0 20px;
  @media only screen and (max-width: 768px) {
    min-height: 80px;
    max-width: 380px;
  }
  @media only screen and (max-width: 450px) {
    min-height: 60px;
    max-width: 360px;
  }
`;
const BrandCarousel = () => {
  const { width } = useWindowSize();
  const brands = [
    {
      image: "/images/home/brands/1.png",
      link: "",
    },
    {
      image: "/images/home/brands/2.png",
      link: "",
    },
  ];

  let delay = 4000;

  return (
    <RootContainer alignItems="start" className="homeCarousel">
      <Grid container spacing={0} justifyContent="center" alignItems="center">
        {/* <Grid item lg={12} md={12} sm={12} xs={12}>
          <Stack
            flexDirection="column"
            alignItems="center"
            alignSelf="center"
            sx={{
              width: "100%",
              // background: "#edf1f0",
              // borderBottom: "1px solid #1B211C10",
              // mb: "1rem",
              mt: "1rem",
              pb: "1rem",
              maxWidth: "1400px",
              margin: "auto",
            }}
          >
            <Divider
              sx={{
                "&::before": {
                  borderColor: "#DA1F26",
                  width: 16,
                },
                "&::after": {
                  display: "none",
                },
                width: "100%",
                // justifyContent: "center",
              }}
            >
              <Typography
                variant="h3"
                textAlign="center"
                fontFamily="Plus Jakarta Sans"
                fontWeight={600}
                sx={{
                  color: "#1B211C",
                  // textTransform: "capitalize",
                  // mb: { lg: 2.5, md: 1, sm: 1, xs: 1 },
                  // mt: "1rem",
                  // mb: "1rem",
                  fontSize: "1.8rem",
                }}
              >
                Brands We Carry
              </Typography>
            </Divider> */}
        {/* <Typography
              variant="body1"
              textAlign="center"
              fontFamily="Plus Jakarta Sans"
              // fontWeight={400}
              sx={{
                color: "#1B211C",
                // textTransform: "capitalize",
                fontSize: "1.1rem",
                // mb: { lg: 0, md: 0, sm: 2, xs: 2 },
              }}
            >
              Shop Your Category
            </Typography> */}
        {/* </Stack>
        </Grid> */}
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <div
            style={{
              // background: "var(--accent)",
              borderRadius: "1.5rem",
              overflow: "hidden",
              maxWidth: "1400px",
              margin: "auto",
            }}
          >
            <BrandList maxShowItem={9} apiEndPoint={process.env.API_BASE_URL} />
          </div>
          {/* <BrandContainer>
            <Swiper
              autoplay={{
                delay,
                disableOnInteraction: true,
              }}
              // spaceBetween={10}
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
                1060: {
                  slidesPerView: 2,
                },
                1280: {
                  slidesPerView: 2,
                },
                1480: {
                  slidesPerView: 2,
                },
              }}
              loop={true}
              navigation={true}
            >
              {brands?.map((data, i) => (
                <SwiperSlide key={i}>
                  <Link href={data.link || ""}>
                    <div className="makeItemCenter">
                      <>
                        <img
                          alt={"image"}
                          src={data.image}
                          style={{ maxWidth: "100%", maxHeight: "100%" }}
                          // style={{ filter: "brightness(0)" }}
                        />
                      </>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </BrandContainer> */}
        </Grid>
      </Grid>
      {/* {width < 1280 && <div>dgdg</div>} */}
    </RootContainer>
  );
};

export default BrandCarousel;

const RootContainer = styled.div`
  // background: #f4f4f4;
  padding: 1rem;
  border-radius: 20px;
  position: relative;
  .brandHeader {
    // position: absolute;
    // top: -2rem;
    .brandHeaderText {
      // background: var(--surface);
      // padding: 0 1rem;
    }
  }
`;

const BrandContainer = styled(Paper)`
  // padding: 2rem;
  max-width: 1920px;
  margin: 2rem auto;
  // box-shadow: 3px 2px 25px rgba(0, 0, 0, 0.1);
  box-shadow: none;
  border-radius: 8px;
  // border: 4px dashed #C6CBC7;
`;
