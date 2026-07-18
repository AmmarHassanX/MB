import { NewArrivalPage } from "@salesgenterp/ui-components";
import React from "react";
import CommonProductCard from "../src/components/productCard/productCard";
import getConfig from "next/config";
import { useSelector } from "react-redux";
import theme from "../src/utilities/theme/theme";

const NewArrival = () => {
  const { publicRuntimeConfig } = getConfig();
  const { API_BASE_URL } = publicRuntimeConfig;
  const tokens = useSelector((state) => state.auth.tokens);
  return (
    <div
      style={{
        maxWidth: "1600px",
        margin: "0 auto",
        width: "100%",
        padding: "1rem",
      }}
    >
      <NewArrivalPage
        apiEndPoint={API_BASE_URL}
        token={tokens?.token}
        primaryColor={theme.palette.colors.primary}
        prodctCard={(product) => <CommonProductCard product={product} />}
      />
    </div>
  );
};

export default NewArrival;
