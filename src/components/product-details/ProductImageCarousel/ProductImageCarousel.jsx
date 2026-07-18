import Image from "next/image";
import Slider from "react-slick";
import PropTypes from "prop-types";
import { useState, useRef, useEffect } from "react";
// material
import { alpha, styled } from "@mui/material/styles";
import { Box, useMediaQuery } from "@mui/material";
//
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import InnerImageZoom from "react-inner-image-zoom";
import styles from "./carousel.module.scss";
import { TiltedImageCard } from "../ProductDetails.styles";
// ----------------------------------------------------------------------

const THUMB_SIZE = 86;

const RootStyle = styled("div")(({ theme }) => ({
  display: "flex",
  maxWidth: "600px",
  width: "100%",
  "& .slick-slide": {
    float: theme.direction === "rtl" ? "right" : "left",
    "&:focus": { outline: "none" },
  },
}));

const ThumbWrapperStyle = styled("div")(({ theme }) => ({
  cursor: "pointer",
  // boxShadow: "0px 6px 16px 0px #E2E2E2",
  // border: "1px solid #65B9F6",
  width: THUMB_SIZE,
  overflow: "hidden",
  height: THUMB_SIZE,
  position: "relative",
  margin: theme.spacing(1, 1),
  background: "var(--surface)",
  borderRadius: "5px",
  // borderRadius: theme.shape.borderRadiusSm,
  "&:hover": {
    opacity: 0.72,
    transition: theme.transitions.create("opacity"),
  },
  "& .isActive": {
    top: 0,
    zIndex: 9,
    opacity: 0,
    width: "100%",
    height: "100%",
    position: "absolute",
    // borderRadius: "5px",
    // border: `solid 1px #65B9F6`,
    // backgroundColor: alpha(theme.palette.grey[900], 0.48),
  },
}));

const Thumbimagestyle = styled("img")({
  width: "90%",
  height: "90%",
  // margin: "auto",
  objectFit: "contain",
  zIndex: 999,
  // borderRadius: "5px",
  // padding: "0.5rem",
  // boxShadow: "1px 4px 4px 0px #0000001A",
});

// ----------------------------------------------------------------------

LargeItem.propTypes = {
  item: PropTypes.object,
  onOpenLightbox: PropTypes.func,
};

function LargeItem({ item }) {
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        // width: "100vw",
        // height: { md: 600, xs: 300 },
        width: { xs: "90vw", sm: "100%" },
        // height: { xs: "60vh", sm: "70vh", lg: "50vh" },
        padding: "2rem",
        margin: "auto",
        overflow: "hidden",
        aspectRatio: "669/604",
        margin: "1rem 0",
      }}
    >
      <InnerImageZoom
        src={
          item && item !== "null" ? item : "/images/products/imgnotfound.png"
        }
        alt="image not found"
        zoomType="hover"
        zoomPreload={true}
        className={styles.slide}
        style={{
          width: "100%",
          height: "auto", // Maintain aspect ratio
          maxWidth: "100%",
          maxHeight: "100%",
          objectFit: "contain", // Prevent overflow or distortion
        }}
      />
    </Box>
  );
}

ThumbnailItem.propTypes = {
  item: PropTypes.object,
};

function ThumbnailItem({ item }) {
  return (
    <ThumbWrapperStyle>
      <Box className="isActive" />
      <Thumbimagestyle
        alt={item}
        src={
          item && item !== "null" ? item : "/images/products/imgnotfound.png"
        }
      />
    </ThumbWrapperStyle>
  );
}

export default function ProductDetailsCarousel({ images, loading }) {
  const isMobile = useMediaQuery("(max-width: 1052px)"); // ✅ Detect mobile

  const [currentIndex, setCurrentIndex] = useState(0);
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const slider1 = useRef(null);
  const slider2 = useRef(null);

  const settings1 = {
    dots: false,
    arrows: false,
    slidesToShow: 1,
    draggable: false,
    slidesToScroll: 1,
    adaptiveHeight: true,
    beforeChange: (current, next) => setCurrentIndex(next),
  };

  const settings2 = {
    dots: false,
    arrows: false,
    vertical: !isMobile, // ✅ Vertical on desktop, horizontal on mobile
    verticalSwiping: !isMobile,
    swipeToSlide: true,
    focusOnSelect: true,
    slidesToShow: isMobile
      ? Math.min(images?.length, 4) // show up to 4 horizontally on mobile
      : Math.min(images?.length, 5), // show up to 5 vertically on desktop
  };

  useEffect(() => {
    setNav1(slider1.current);
    setNav2(slider2.current);
  }, [currentIndex]);

  return (
    <RootStyle sx={{ flexDirection: isMobile ? "column" : "row", gap: 2 }}>
      {/* Thumbnails */}
      <Box
        sx={{
          width: isMobile ? "100%" : THUMB_SIZE,
          order: isMobile ? 2 : 1, // ✅ Below image on mobile
        }}
      >
        <Slider {...settings2} asNavFor={nav1} ref={slider2}>
          {images?.map((item) => (
            <ThumbnailItem key={item} item={item} />
          ))}
        </Slider>
      </Box>

      {/* Large image */}
      <Box
        sx={{
          flex: 1,
          order: isMobile ? 1 : 2,
          maxHeight: "600px",
          height: "100%",
          width: isMobile ? "100%" : `calc(100% - ${THUMB_SIZE + 16}px)`, // ✅ fixed width
        }}
      >
        <Slider {...settings1} asNavFor={nav2} ref={slider1}>
          {images?.map((item) => (
            <LargeItem key={item} item={item} />
          ))}
        </Slider>
      </Box>
    </RootStyle>
  );
}
