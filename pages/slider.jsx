import { HomeBanner } from "@salesgenterp/ui-components";
import getConfig from "next/config";
import React from "react";
import styled from "styled-components";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Component = () => {
  const { publicRuntimeConfig } = getConfig();
  const { API_BASE_URL } = publicRuntimeConfig;

  return (
    <Container>
      <HomeBanner apiEndPoint={API_BASE_URL} />
    </Container>
  );
};

export default Component;

const Container = styled.div``;
