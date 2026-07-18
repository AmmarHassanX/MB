import { SwiperSlide } from "swiper/react";
import React from "react";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";

SwiperCore.use([Autoplay, Navigation, Pagination]);
/////////
import { ProductsContainer, ProductSwiperContainer, ProductSliderHeader } from "./product.style";

import { productsData } from "./productSilderData";
import CommonProductCard from "../../../../productCard/productCard";

const ProductSlider = () => {
  return (
    <ProductsContainer direction="row" alignItems="center" className=" homeCarousel">
      <ProductSliderHeader variant="h4">tag</ProductSliderHeader>
      <ProductSwiperContainer
        autoplay={{
          delay: 6500,
          disableOnInteraction: true,
        }}
        spaceBetween={10}
        breakpoints={{
          9: {
            slidesPerView: 1,
          },

          854: {
            slidesPerView: 2,
          },
          1560: {
            slidesPerView: 3,
          },
        }}
        navigation={true}
        loop={true}
      >
        {productsData.map((product, i) => (
          <SwiperSlide key={i} style={{ display: "grid", placeItems: "center" }}>
            <CommonProductCard product={product} />
          </SwiperSlide>
        ))}
      </ProductSwiperContainer>
    </ProductsContainer>
  );
};

export default ProductSlider;
