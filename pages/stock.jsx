import { BrandStock } from "@salesgenterp/ui-components";
import getConfig from "next/config";
import React, { useEffect } from "react";
import styled from "styled-components";

const BrandStockComponent = (props) => {
  const { publicRuntimeConfig } = getConfig();
  const { API_BASE_URL } = publicRuntimeConfig;

  return (
    <Container>
      <BrandStock
        colors={{ primaryColor: "#000000" }}
        apiEndPoint={API_BASE_URL}
        storeData={{
          logoUrl: "/images/header/logo.png",
          text1: "",
          bankInfo: {},
          text2: "",
          contactPerson: {},
          returnPolicy: (
            <div>
              <p>
                You may ONLY return new, sealed, unopened items within 30 days of delivery for a full account credit. No
                return will be accepted without prior authorization.
              </p>
              <p>
                WE DO NOT ACCEPT RETURNS FOR THE FOLLOWING ITEMS: e-liquids/e-juice, disposables, consumable items and
                clearance items, no exceptions. Damaged/missing item exchanges must be reported within 48 hours of
                delivery to qualify for the return authorization process.
              </p>
              <p>
                We&apos;ll also pay the return shipping costs if the return is a result of our error (you received an
                incorrect or defective item, etc). You should expect to receive your refund within two weeks of giving
                your package to the return shipper, however, in many cases you will receive a refund more quickly. This
                time period includes the transit time for us to receive your return from the shipper (5 to 10 business
                days), and the time it takes us to process your return once we receive it (3 to 5 business days). If you
                need to return an item, please contact us with your order number and details about the product you would
                like to return. We will respond quickly with instructions for how to return items from your order.
              </p>
            </div>
          ),
        }}
      />
    </Container>
  );
};

export default BrandStockComponent;

const Container = styled.div``;
