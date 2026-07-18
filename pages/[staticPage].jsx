import { APIStaticPage } from "@salesgenterp/ui-components";
import getConfig from "next/config";
import { useRouter } from "next/router";
import React from "react";
import ProductSlider from "../src/components/home/productsSlider/ProductSlider";
import ProductsPage from "./products/[product]/[id]";
import theme from "../src/utilities/theme/theme";

const Component = () => {
  const { publicRuntimeConfig } = getConfig();
  const { GOOGLE_RECAPTCHA_KEY, API_BASE_URL } = publicRuntimeConfig;
  const router = useRouter();
  const alias = router.query.staticPage;
  const id = router.query.id;

  return (
    <>
      <APIStaticPage
        colors={{ primaryColor: theme.palette.colors.primary }}
        apiEndPoint={API_BASE_URL}
        googleReCaptchaKey={GOOGLE_RECAPTCHA_KEY || "asd"}
        alias={alias}
        id={id}
        mapSrc=""
        extra={(data) => {
          const config = data?.config;
          return (
            <div>
              {config?.categoryIds?.map((item, i) => {
                return <ProductsPage categoryId={item?.id} key={i} isFromStaticPage />;
              })}
              {config?.productTagIds?.map((item, i) => {
                return <ProductSlider data={item?.id ? item : { id: item }} businessId={1} key={i} />;
              })}
            </div>
          );
        }}
      />
    </>
  );
};

export default Component;
