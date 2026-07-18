import React, { useState } from "react";
import { useSelector } from "react-redux";
import { AccountDetails } from "@salesgenterp/ui-components";
import getConfig from "next/config";
import { useRouter } from "next/router";
import "react-credit-cards/es/styles-compiled.css";
import styled from "styled-components";
import theme from "../src/utilities/theme/theme";

const Account = () => {
  const router = useRouter();
  const path = router?.query?.path;
  const { publicRuntimeConfig } = getConfig();
  const { API_BASE_URL, SERVICE_API_BASE_URL } = publicRuntimeConfig;
  const token = useSelector((state) => state.auth.tokens?.token);

  const [colors, setColors] = useState({
    primaryColor: theme.palette.colors.primary,
    secondaryColor: "#FFFFFF",
    backgroundColor: "var(--surface-2)",
    fontColor: "#391111",
    backgroundImage: "/images/backgroundLight.png",
  });

  const onChangeColors = (data) => {
    data?.isNightMode
      ? setColors({
          primaryColor: theme.palette.colors.primary,
          secondaryColor: "#35353A",
          backgroundColor: "#1E1E23",
          fontColor: "#fff",
          backgroundImage: "/images/backgroundDark.png",
        })
      : setColors({
          primaryColor: theme.palette.colors.primary,
          secondaryColor: "#FFFFFF",
          backgroundColor: "var(--surface-2)",
          fontColor: "#391111",
          backgroundImage: "/images/backgroundLight.png",
        });
  };

  const onChangePath = (path) => {
    router.push(`/account?path=${path}`);
  };

  return (
    <Container>
      {token && (
        <AccountDetails
          apiEndPoint={API_BASE_URL}
          serviceApiEndPoint={SERVICE_API_BASE_URL}
          token={token}
          payInvoiceFromDashboard={false}
          primaryColor={colors.primaryColor}
          secondaryColor={colors.secondaryColor}
          backgroundColor={colors.backgroundColor}
          fontColor={colors.fontColor}
          backgroundImage={colors.backgroundImage}
          onChangeColors={onChangeColors}
          darkMode={false}
          path={path}
          onChangePath={onChangePath}
          hideDiscountImage={true}
          imgNotFoundUrl="/images/products/imgnotfound.png"
          hideInvoiceAction={false}
        />
      )}
    </Container>
  );
};

export default Account;

const Container = styled.div`
  .MuiDrawer-paper {
    img {
      mix-blend-mode: color-burn;
    }
  }
`;
