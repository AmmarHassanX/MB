import React from "react";
import { VendorAccount } from "@salesgenterp/ui-components";
import getConfig from "next/config";
import theme from "../src/utilities/theme/theme";

const VendorAccountDetail = () => {
  const { publicRuntimeConfig } = getConfig();
  const { API_BASE_URL } = publicRuntimeConfig;

  return (
    <div>
      <VendorAccount API_BASE_URL={API_BASE_URL} primaryColor={theme.palette.colors.primary} />
    </div>
  );
};

export default VendorAccountDetail;
