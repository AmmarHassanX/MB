import axios from "axios";
import { parse } from "cookie";
import { useRouter } from "next/router";
import React, { useState } from "react";
//////////
import Head from "next/head";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import {
  FullDescriptionBox,
  ProductDetailsContainer,
  ProductDetailsSection,
  TabsContainer,
} from "../../src/components/product-details/ProductDetails.styles";
import ProductViewContainer from "../../src/components/product-details/ProductView";
import FilterBar from "../../src/components/product-list/filterBar/FilterBar";
import theme from "../../src/utilities/theme/theme";
import {
  addBreadcrumbListProductJsonLd,
  addProductJsonLd,
} from "../../src/utilities/utils";
import { PiHandbag } from "react-icons/pi";
import { Divider, useMediaQuery } from "@mui/material";
import ProductSlider from "../../src/components/home/productsSlider/ProductSlider";

const ProductsDetailsPage = ({ businessId, product }) => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState(1);
  const fullUrl = `${process.env.DOMAIN_BASE_URL}${router?.asPath}`;
  const isMobile = useMediaQuery("(max-width:800px)");

  //////descriptions
  const fullDescription = () => {
    if (product?.masterProductDetails?.fullDescription?.length > 1) {
      return {
        __html:
          product?.masterProductDetails?.fullDescription !== "null"
            ? product?.masterProductDetails?.fullDescription
            : "",
      };
    } else {
      return { __html: "<p> No Product Related description found! </p>" };
    }
  };
  return (
    <div>
      <Head>
        <title>{product?.masterProductDetails?.metaTitle || ""}</title>
        <meta
          name="keywords"
          content={product?.masterProductDetails?.metaKeyword}
        />
        <meta
          name="description"
          content={product?.masterProductDetails?.metaDescription}
        />
        <link rel="canonical" href={fullUrl} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              addProductJsonLd({ ...product, pageUrl: router.asPath })
            ),
          }}
          key="product-jsonld"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              addBreadcrumbListProductJsonLd({
                ...product,
                pageUrl: router.asPath,
                alias: router.query.id,
              })
            ),
          }}
          key="breadcrumb-jsonld"
        />
      </Head>
      <ProductDetailsSection>
        {/* <RouteBar name={product?.masterProductDetails?.productName} /> */}
        <FilterBar
          onDetails={true}
          name={product?.masterProductDetails?.productName}
        />
        <ProductDetailsContainer>
          <ProductViewContainer productDetails={product} loading={true} />
          <TabsContainer>
            <div className="tab" onClick={() => setSelectedTab(1)}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  gap: "2rem",
                  paddingBottom: "20px",
                  borderBottom: "1px solid #BBD9DA",
                  position: "relative",
                }}
              >
                <p
                  style={{
                    fontWeight: selectedTab === 1 ? 500 : "normal",
                    fontSize: "23px",
                    // padding: "1rem 0",
                    color: "var(--text)",
                    whiteSpace: "nowrap",
                  }}
                >
                  Product Details
                </p>
                <div
                  style={{
                    position: "absolute",
                    left: "0",
                    bottom: "-4px",
                    height: "8px",
                    width: "232px",
                    backgroundColor: "var(--accent)",
                  }}
                ></div>
              </div>
            </div>
            {/* <div
              className="tab"
              onClick={() => setSelectedTab(2)}
              style={selectedTab === 2 ? { borderBottom: "2px solid #33A0E5" } : {}}
            >
              <h6 style={selectedTab === 2 ? { fontWeight: "bold" } : {}}>Reviews&nbsp;(0)</h6>
            </div> */}
          </TabsContainer>
          <FullDescriptionBox>
            {selectedTab === 1 && (
              <div dangerouslySetInnerHTML={fullDescription()} />
            )}
          </FullDescriptionBox>
        </ProductDetailsContainer>
        {/* <p
          style={{
            textAlign: "start",
            color: "#353535",
            fontSize: "2.125rem",
            fontWeight: 700,
            width: "100%",
            maxWidth: "1400px",
            margin: "auto",
            padding: "0rem 1rem 1rem 1rem",
          }}
        >
          Related products
        </p>
        <hr
          style={{
            backgroundColor: "#CCCCCC",
            height: "1px",
            border: "none",
            width: "100%",
            maxWidth: "1586px",
            margin: "auto",
            marginBottom: "2rem",
          }}
        />
        <ProductSlider businessId={businessId} productId={product?.masterProductDetails?.productId} /> */}
        {/* <Newsteller /> */}
      </ProductDetailsSection>
      <div style={{ marginBottom: "1rem" }}>
        <div
          style={{
            padding: "0 1rem",
            fontSize: isMobile ? "30px" : "47px",
            margin: "1.5rem auto 1rem auto ",
            maxWidth: "1400px",
            color: "var(--accent)",
          }}
        >
          Related Products
        </div>
        <ProductSlider
          businessId={businessId}
          productId={product?.masterProductDetails?.productId}
          isHeader
        />
      </div>
    </div>
  );
};

export default ProductsDetailsPage;

export async function getServerSideProps(context) {
  const { id } = context.query;
  let product = null;
  const cookies = context?.req?.headers?.cookie
    ? parse(context?.req?.headers?.cookie)
    : null;
  const token = cookies?.token ? cookies?.token : null;
  const stateId = cookies?.stateId ? cookies?.stateId : null;

  const modifiedUrl = stateId
    ? `${process.env.PROXY_API_BASE_URL}/ecommerce/product/${id}?storeIds=2&stateId=${stateId}`
    : `${process.env.PROXY_API_BASE_URL}/ecommerce/product/${id}?storeIds=2`;
  try {
    const res = await axios.get(modifiedUrl, {
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          }
        : {},
    });
    product = res.data.result;
  } catch (error) {
    console.error("Error fetching product data:", error);
  }
  return { props: { product } };
}
