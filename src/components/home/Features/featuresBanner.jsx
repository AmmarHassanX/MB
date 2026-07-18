import { Stack } from "@mui/material";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";

const Container = styled(Stack)`
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .iSaRWp {
    max-width: 100vw;
    padding-top: 0px !important;
  }
  .swiper-button-prev,
  .swiper-button-next {
    color: var(--text) !important;
    height: 49px;
    width: 49px;
    background: var(--surface)ad;
    font-weight: 900;
    &::after {
      font-size: 25px !important;
    }
  }
  .swiper-button-prev {
    left: 35px !important;
  }
  .swiper-button-next {
    right: 35px !important;
  }
  @media only screen and (max-width: 768px) {
    .swiper-button-prev,
    .swiper-button-next {
      height: 29px;
      width: 29px;
      color: var(--text) !important;
      &::after {
        font-size: 15px !important;
      }
    }
    .swiper-button-prev {
      left: 15px !important;
    }
    .swiper-button-next {
      right: 15px !important;
    }
  }
  @media only screen and (max-width: 450px) {
    .swiper-button-prev,
    .swiper-button-next {
      height: 22px;
      width: 22px;
      top: 68%;
      color: var(--text) !important;
      &::after {
        font-size: 12px !important;
      }
    }
  }
`;
const SwiperContainer = styled(Swiper)`
  width: 100%;
`;
const BrandImg = styled.div`
  width: 100%;
  // height: 248px;
  position: relative;
  img {
    object-fit: contain;
  }
  // @media only screen and (min-width: 1400px) {
  //   height: 380px;
  //   img {
  //     object-fit: contain;
  //   }
  // }
  // @media only screen and (max-width: 768px) {
  //   height: 98px;
  // }
  // @media only screen and (max-width: 450px) {
  //   height: 58px;
  // }
`;
const FeatureCarousel = ({ secondarySlider }) => {
  return (
    <Container direction="row" alignItems="center">
      {/* <ProductSliderHeader variant="h4">Top E-cigs</ProductSliderHeader> */}
      <SwiperContainer
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        breakpoints={{
          9: {
            slidesPerView: 1,
          },
          654: {
            slidesPerView: 1,
          },
          950: {
            slidesPerView: 1,
          },
        }}
        navigation={true}
      >
        {secondarySlider?.sliderImageList?.map((brand, i) => (
          <SwiperSlide
            key={i}
            style={{ display: "grid", placeItems: "center" }}
          >
            <BrandImg>
              {/* <BrandImg src={brand.img} /> */}
              {/* <Image src={brand.img} alt="logo" layout="fill" /> */}
              <Link href={brand.redirectPath || ""} passHref>
                <img
                  src={brand.imageUrl}
                  alt="image"
                  style={{ width: "100%", height: "auto" }}
                />
              </Link>
            </BrandImg>
          </SwiperSlide>
        ))}
      </SwiperContainer>
    </Container>
  );
};

export default FeatureCarousel;
