// import cx from "classnames";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
import { useAnimation, motion } from "framer-motion";
////////////////////////////////////////////////////////////
import { useDatafetcher } from "../../../utilities/hooks/useDatafetcher";
import styles from "./style.module.scss";
import Link from "next/link";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import styled from "styled-components";

// install Swiper modules
SwiperCore.use([Autoplay, Navigation, Pagination]);

const LandingCarousel = ({ data, spaceBetween = 20, slidesPerView = 1, itemStyle }) => {
  const [trigger, setTrigger] = useState(false);

  const router = useRouter();
  // const { data } = useDatafetcher(
  //   "/home/sliderImages?sliderType=primary&businessTypeId=1",
  //   true
  // );
  const firstSlider = data?.sliderImageList;

  const controls = useAnimation();

  useEffect(() => {
    controls.set({
      width: 0,
    });
    controls.start({
      width: "100%",
      transition: { duration: 5.1 },
    });
  }, [trigger, controls]);
  return (
    <div className="homeCarousel">
      <Swiper
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        initialSlide={1}
        // centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        navigation={true}
        pagination={{ clickable: true }}
        modules={[Pagination]}
        onSlideChange={() => {
          setTrigger(!trigger);
        }}
        className={styles.slidesContainer}
      >
        {firstSlider?.map((slide, i) => (
          <SwiperSlide key={i}>
            <div className={styles.slide}>
              <Link href={slide.redirectPath || ""} passHref>
                <Image src={slide.imageUrl} alt="image" style={{ ...itemStyle }} />
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default LandingCarousel;

const Image = styled.img`
  width: 100%;
  height: auto;
  transition: all 0.5s;
  &:hover {
    transform: scale(1.05);
  }
`;
