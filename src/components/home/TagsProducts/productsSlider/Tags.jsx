import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDatafetcher } from "../../../../utilities/hooks/useDatafetcher";
import Banner from "../../Banner/Banner";
import ProductSlider from "../../productsSlider/ProductSlider";
// import TopCateogries from "../../categories/topCategories";

const TagsContainer = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const Tags = ({ businessId }) => {
  const { data, error } = useDatafetcher(`/home/productTagList`, true);
  const [showBanners, setShowBanners] = useState(false);
  useEffect(() => {
    if (data && data?.length === 1) {
      setShowBanners(true);
    }
  }, []);
  return (
    <TagsContainer>
      {data &&
        data.map((products, i) => (
          <div
            key={i}
            // style={{
            //   background: i % 2 && "#f0f0f0",
            // }}
          >
            <ProductSlider data={products} key={i} businessId={businessId} />
            {showBanners || (
              <div
              // style={{ maxWidth: 1920, margin: "auto" }}
              >
                {/* <Banner
                  data={slider?.sliderImageList?.slice(i * 3, i * 3 + 3)}
                  lg={4}
                  itemStyle={{ borderRadius: "0rem" }}
                /> */}
              </div>
            )}
          </div>
        ))}
    </TagsContainer>
  );
};

export default Tags;
