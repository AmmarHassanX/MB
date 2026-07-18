////////////////////////////////////////////////////////

import { useMediaQuery } from "@mui/material";
import { HomeBanner } from "@salesgenterp/ui-components";
import { useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";
import BrandCarousel from "../src/components/home/Brands/Brands";
import Newsteller from "../src/components/home/Newsteller/Newsteller";
import Tags from "../src/components/home/TagsProducts/productsSlider/Tags";
import Testimoninals from "../src/components/home/Testimoninals/Testimoninals";
import DiscoverySectionSlider from "../src/components/home/topProducts/DiscoverySectionSlider";
import TopProductsSlider from "../src/components/home/topProducts/TopProductsSlider";
import TopCategories from "../src/components/home/topProducts/TopCategories";

const textContent = [
  "NICK'S DAILY DEAL",
  "WEEKLY SPECIAL",
  "MONTHLY HOT DEAL",
  "LOYALTY MULTIPLIER",
  "NICK'S DAILY DEAL",
  "WEEKLY SPECIAL",
  "MONTHLY HOT DEAL",
  "LOYALTY MULTIPLIER",
];

export default function Home({ businessId }) {
  const isMobile = useMediaQuery("(max-width:640px)");
  const token = useSelector((state) => state.auth.tokens?.token);

  return (
    <div>
      <main>
        <div
        //style={{ maxWidth: 1920, margin: "1rem auto" }}
        >
          <HomeBanner
            apiEndPoint={process.env.API_BASE_URL}
            token={token}
            businessTypeId={businessId}
            extra={
              [
                // {
                //   key: 1,
                //   component: (
                //     <>
                //       <BrandCarousel />
                //     </>
                //   ),
                // },
              ]
            }
          />
        </div>
        {/* <Features />
        <RegisterBanner /> */}
        {/* <TopProductsSlider businessId={businessId} /> */}
        {/* <InfoSection
          data={{
            title: <h2>Shop by Top MB Wholesale </h2>,
            subTitle: (
              <h3>
                RICH IN WHOLESOME INGREDIENTS: Happy Caps Mushroom Gummies boast
                a blend of sustainably sourced, premium ingredients including
                Lions Mane, Turkey Tail, Reishi, Cordyceps, and Chaga Mushrooms.
              </h3>
            ),
            leftImage: "",
            rightImage: "",
            points: [
              "Quality Products",
              "24/7 Support",
              "Free Shipping",
              "30 Day Return",
            ],
            // text: (
            //   <p>
            //     <b>At Elite Distributors</b>, we make<b> wholesale ordering easy</b> with{" "}
            //     <b>fast shipping, top-quality brands, and bulk pricing</b> you can rely on.{" "}
            //     <b>Don’t wait—place your order today and boost your sales!</b>
            //   </p>
            // ),
            button: {
              text: "SHOP NOW",
              link: "/",
            },
          }}
        /> */}
        {/* <Tags businessId={businessId} /> */}
        {/* <VapeCategory businessId={businessId} /> */}

        {/* <Testimoninals /> */}
        {/* <ScrollContainer
          style={{
            width: "100%",
          }}
        >
          <div className="scroll-text">
            {textContent?.map((item, i) => (
              <span key={i}>
                <span style={{ padding: "0 1.75rem" }}>
                  <PiStarThin />
                </span>
                <span>{item}</span>
              </span>
            ))}
          </div>
        </ScrollContainer> */}
        {/* <FeatureCarousel secondarySlider={secondarySlider} /> */}
        {/* <LandingGallery secondarySlider={secondarySlider} /> */}
        {/* <Blogs /> */}
        <Tags businessId={businessId} />

        <TopCategories businessId={businessId} />
        {/* <Newsteller /> */}
        <Testimoninals />
        {/* <Faqs /> */}
      </main>
    </div>
  );
}

const slideAnimation = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
`;

const ScrollContainer = styled.div`
  background: #f7f7f7;
  padding: 1rem 0;
  overflow: hidden;
  white-space: nowrap;

  .scroll-text {
    display: inline-block;
    width: auto;
    span {
      font-size: 1.5rem;
      font-weight: 400;
      color: #0c0d32;
    }
    animation: ${slideAnimation} 20s linear infinite;
  }
  @media screen and (max-width: 768px) {
    .scroll-text {
      span {
        font-size: 1.5rem;
      }
    }
    padding: 0.5rem 0;
  }
`;
