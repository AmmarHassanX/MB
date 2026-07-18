import React from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { useDatafetcher } from "../../utilities/hooks/useDatafetcher";
// import { useDatafetcher } from "../../../utilities/hooks/useDatafetcher";

const CardImage = styled.img`
  width: 100%; /* Use relative width */
  height: auto; /* Adjust height dynamically */
  /* border-radius: 10px; */
  object-fit: cover;

  // @media screen and (max-width: 768px) {
  //   height: 200px; /* Reduce height for smaller screens */
  // }
`;

const FooterBanner = ({ businessId }) => {
  const { data: categoryImages } = useDatafetcher(
    // `/home/sliderImages?sliderType=primary&businessTypeId=${businessId}`,
    `/home/sliderImages?sliderType=footer-banner&businessTypeId=${businessId}`,
    true
  );

  if (categoryImages?.sliderImageList?.length > 0) {
    return (
      <div
        style={{
          width: "100%",
          // background: "#3C3D37",
          // padding: "3rem 0",
          // marginTop: "4.25rem",
          // backgroundImage: "url(/images/home/shopByCategoryBg.png)",
        }}
      >
        <div style={{ maxWidth: "1400px", margin: "auto" }}>
          {/* <p style={{ fontSize: "45px", fontWeight: 700, color: "#ffffff", marginBottom: "2rem", textAlign: "center" }}>
            Shop by Category
          </p> */}
          <SwiperContainer
            spaceBetween={20}
            navigation
            loop
            style={{ padding: "10px 0.5rem" }}
            breakpoints={{
              320: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              480: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              640: {
                slidesPerView: 3,
                spaceBetween: 15,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
            }}
          >
            {categoryImages?.sliderImageList?.map((item, index) => (
              <SwiperSlide key={index}>
                <CardImage src={item?.imageUrl} alt="image" />
              </SwiperSlide>
            ))}
          </SwiperContainer>
        </div>
      </div>
    );
  }
};

export default FooterBanner;

const FlashSaleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  /* border-radius: 10px; */
  width: 100%;
  max-width: 1562px;
  margin: auto;
  color: white;
  @media screen and (max-width: 1200px) {
    text-align: center;
    justify-content: center;
  }
`;

const Heading = styled.h2`
  font-size: 5.2294rem;
  font-weight: 700;
  line-height: 101.49px;
`;

const SubHeading = styled.p`
  font-size: 2.3125rem;
  font-weight: 400;
  line-height: 44.88px;
`;

const Slider = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const ArrowButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  margin: 0 10px;

  &:hover {
    color: #f8d948;
  }
`;

const ProductCard = styled.div`
  position: relative; /* Important for absolute positioning of TiltedCard */
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--surface);
  padding: 15px;
  border-radius: 10px;
  width: 400px;
  height: auto;
  aspect-ratio: 1 / 1;
  overflow: visible; /* Allow TiltedCard to be visible */
  box-shadow: 0px 6px 16px 0px #0000000d;
  @media screen and (max-width: 780px) {
    width: 330px;
  }
`;

const TiltedCard = styled.div`
  width: 100%;
  height: 100%;
  background-color: #6b6baf;
  position: absolute; /* Positioned relative to the container */
  z-index: -1; /* Lower value puts it behind */
  top: 50%; /* Center vertically */
  left: 50%; /* Center horizontally */
  transform: translate(-50%, -50%) rotate(3.6deg);
  // opacity: 0; /* Initially hidden */
  transition: opacity 0.4s ease, transform 0.4s ease;
  border-radius: 22px;
  box-shadow: 0px 6px 16px 0px #0000000d;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain; /* Ensure the image scales properly */
  border-radius: 10px;
`;
const ProductTitle = styled.h3`
  font-size: 2.9375rem;
  font-weight: 700;
  line-height: 65px;
`;

// const Rating = styled.div`
//   display: flex;
//   gap: 5px;

//   span {
//     color: #f8d948;
//     font-size: 16px;
//   }
// `;

const SwiperContainer = styled(Swiper)`
  .swiper-button-prev,
  .swiper-button-next {
    position: absolute; /* Position the arrows absolutely within the container */
    top: 50%; /* Center vertically */
    // transform: translateY(-50%);
    z-index: 10;
    color: #33363f;
    font-size: 0.5rem !important; /* Customize arrow size */
    cursor: pointer;
    transition: color 0.3s;
    background: var(--surface);
    border-radius: 50%;
    border: 1px solid #000000;
    padding: 2rem 2rem;
    &:after {
      font-size: 1.5rem !important; /* Override the default font-size */
      color: #33363f;
    }
    &:hover {
      color: #f8d948; /* Change color on hover */
    }
  }

  .swiper-button-prev {
    left: 0; /* Move left arrow outside the slider */
  }

  .swiper-button-next {
    right: 0; /* Move right arrow outside the slider */
  }

  // @media screen and (max-width: 768px) {
  //   .swiper-button-prev,
  //   .swiper-button-next {
  //     padding: 0.3rem; /* Further reduce button size */
  //   }
  // }
`;
