import getConfig from "next/config";
import React from "react";
import styled from "styled-components";

const BrandStockComponent = (props) => {
  const { publicRuntimeConfig } = getConfig();
  const { API_BASE_URL } = publicRuntimeConfig;

  return (
    <Container>
      <iframe
        src="https://clerk.chat/misc/sms-opt-in/?widgetId=df66416c-d9a8-452a-bb0c-c21e44ba36f5"
        style={{ display: "flex", height: "100%", width: "100%", minWidth: "320px", minHeight: "600px" }}
        id="clerk-opt-in-form"
        title="Clerk Chat Opt in form"
      />
    </Container>
  );
};

export default BrandStockComponent;

const Container = styled.div``;
