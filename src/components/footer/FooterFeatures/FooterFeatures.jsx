import React from "react";
import { BsListCheck } from "react-icons/bs";
import { SlStar } from "react-icons/sl";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { FeaturesBox, FeaturesContainer, FeaturesSection } from "./FeaturesRow.styles";

const FooterFeatures = () => {
  return (
    <FeaturesSection>
      <FeaturesContainer>
        <FeaturesBox>
          <div className="imgBox">
            <BsListCheck />
          </div>
          <div className="col">
            <p>999+ Vape Products</p>
            <span>We Have More Then 999+ Vape Products</span>
          </div>
        </FeaturesBox>
        <FeaturesBox>
          <div className="imgBox">
            <TfiHeadphoneAlt />
          </div>
          <div className="col">
            <p>24x7 Online Support</p>
            <span>Get in touch with any Queries, Feedback, or Complaints.</span>
          </div>
        </FeaturesBox>
        <FeaturesBox>
          <div className="imgBox">
            <SlStar />
          </div>
          <div className="col">
            <p>OVER 8,500 5 STAR REVIEWS</p>
            <span>Find helpful customer reviews and review ratings</span>
          </div>
        </FeaturesBox>
      </FeaturesContainer>
    </FeaturesSection>
  );
};

export default FooterFeatures;
