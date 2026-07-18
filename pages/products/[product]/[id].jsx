import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
////////////////////////////////////////////////////////////////
const RouteBar = dynamic(
  () => import("../../../src/components/product-list/RouteBar"),
  { ssr: false }
);

// ;
import { Stack } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import FilterBar from "../../../src/components/product-list/filterBar/FilterBar";
import FilterSec from "../../../src/components/product-list/filterBar/FilterSec";
import {
  ProductsContainer,
  ProductsGrid,
  ProductsNotFound,
  ProductsSection,
} from "../../../src/components/product-list/style";
import CommonProductCard from "../../../src/components/productCard/productCard";
import ProductCardSkeleton from "../../../src/components/productCard/productCardSkeleton/ProductCardSkeleton";
import useWindowSize from "../../../src/utilities/hooks/useWindowSize";
// import { setPage } from "../../../src/store/products";
import { HomeBanner } from "@salesgenterp/ui-components";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import LeftSection from "../../../src/components/product-list/leftSection/LeftSection";
import { setLoadedData } from "../../../src/store/products";
import {
  addBreadcrumbListJsonLd,
  addCategoriesJsonLd,
} from "../../../src/utilities/utils";

const ProductsPage = ({ categoryId, businessId, categoryData }) => {
  // const page = useSelector((state) => state.products.page);
  const { loadedProducts, loadedPage, loadedCategoryId, loadedTotalProducts } =
    useSelector((state) => state.products.loadedData);
  const [page, setPage] = useState(loadedPage || 0);
  const router = useRouter();
  // const { data: leftSectionData } = useDatafetcher("/brand/list", true);
  const token = useSelector((state) => state.auth.tokens?.token);
  const dispatch = useDispatch();
  const [selectedId, setSelectedId] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [initial, setInitial] = useState(true);
  const [totalProducts, setTotalProducts] = useState(loadedTotalProducts || 0);
  const [pageable, setPageable] = useState(true);
  const [products, setProducts] = useState(loadedProducts || []);
  const [productsLoading, setProductsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { width } = useWindowSize();
  const prevRoute = useRef(router.asPath);
  const [routeChanged, setRouteChanged] = useState(false);
  const fullUrl = `${process.env.DOMAIN_BASE_URL}${router?.asPath}`;

  const stateId = useSelector(
    (state) => state.auth.userDetails
  )?.customerDto?.customerStoreAddressList?.find(
    (address, index) => address?.active === true || index === 0
  )?.stateId;

  const handleProducts = () => {
    dispatch(
      setLoadedData({
        products,
        page,
        id: router?.query?.id,
        path: router?.pathname,
        totalProducts,
      })
    );
  };

  useEffect(() => {
    if (routeChanged) {
      dispatch(
        setLoadedData({
          products: [],
          page: 0,
          id: router?.query?.id,
          path: router?.pathname,
          totalProducts: 0,
        })
      );
    }
  }, [routeChanged]);

  useEffect(() => {
    const handleRouteChangeComplete = (url) => {
      if (prevRoute.current !== url) {
        setRouteChanged(true);
        window.scrollTo(0, 0); // Reset scroll position
      } else {
        setRouteChanged(false);
        const scrollPosition = JSON.parse(
          sessionStorage.getItem(`scrollPosition:${url}`)
        );
        if (scrollPosition) {
          window.scrollTo(scrollPosition.x, scrollPosition.y);
        }
      }
      prevRoute.current = url;
    };
    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, [router]);

  useEffect(() => {
    if (
      (loadedProducts?.length <= 0 || page > loadedPage) &&
      loadedCategoryId === router?.query?.id &&
      totalProducts > products?.length
    ) {
      let id = categoryId || router?.query?.id;
      let sort = router?.query?.sort || "date";
      let order = router?.query?.order || "DESC";
      if (id) {
        setProductsLoading(true);
        const url =
          `${
            process.env.API_BASE_URL
          }/ecommerce/product/category?categoryIdList=${id}&page=${page}&size=20&sort=${
            sort || "date"
          }&sortDirection=${order || "DESC"}&storeIds=2` +
          `${stateId ? `&stateId=${stateId}` : ""}`;
        axios
          .get(url, { headers: token && { Authorization: `Bearer ${token}` } })
          .then((res) => {
            setProductsLoading(false);
            setError(false);
            if (
              (categoryId || page > 0) &&
              res.data.result?.content?.length > 0
            ) {
              dispatch(
                setLoadedData({
                  products: [...products, ...res.data.result?.content],
                  page: page,
                  id: router?.query?.id,
                  path: router?.pathname,
                  totalProducts: res.data.result?.totalElements,
                })
              );
              setProducts((products) => [
                ...products,
                ...res.data.result?.content,
              ]);
              setTotalProducts(res.data.result?.totalElements);
              if (res.data.result?.totalPages <= page + 1) {
                setPageable(false);
              } else {
                setPageable(true);
              }
            } else if (!initial && res.data.result?.content?.length > 0) {
              setProductsLoading(false);
              setProducts(res.data.result?.content);
              setTotalProducts(res.data.result?.totalElements);
              if (res.data.result?.totalPages <= page + 1) {
                setPageable(false);
              } else {
                setPageable(true);
              }
              setInitial(true);
            }
          })
          .catch(() => {
            setError(true);
            setProductsLoading(false);
          });
      }
    } else {
      if (loadedCategoryId !== router?.query?.id) {
        sessionStorage.removeItem(`scrollPosition:${router.asPath}`);
      }
      dispatch(
        setLoadedData({
          products: [],
          page: 0,
          id: router?.query?.id,
          path: router?.pathname,
          totalProducts,
        })
      );
    }
  }, [page, loadedCategoryId, router?.query?.id]);

  useEffect(() => {
    if (loadedProducts.length <= 0 || routeChanged) {
      let id = categoryId || router?.query?.id;
      let sort = router?.query?.sort || "date";
      let order = router?.query?.order || "DESC";
      if (router.query.id) {
        setLoading(true);
        setPageable(true);
        const url =
          `${process.env.API_BASE_URL}/ecommerce/product/category?categoryIdList=${id}&page=0&size=20&sort=${sort}&sortDirection=${order}&storeIds=2` +
          `${stateId ? `&stateId=${stateId}` : ""}`;
        axios
          .get(url, { headers: token && { Authorization: `Bearer ${token}` } })
          .then((res) => {
            dispatch(
              setLoadedData({
                products: [...res.data.result?.content],
                page: 0,
                id: router?.query?.id,
                path: router?.pathname,
                totalProducts: res.data.result?.totalElements,
              })
            );
            setProducts(res.data.result?.content);
            setTotalProducts(res.data.result?.totalElements);
            setPage(0);
            setLoading(false);
            if (res.data.result?.totalPages > 1) {
              setPageable(true);
            } else {
              setPageable(false);
            }
          });
      }
    }
  }, [router, loadedCategoryId, routeChanged]);

  return (
    <>
      <Head>
        <title>{categoryData?.metaTitle || ""}</title>
        <meta name="keywords" content={categoryData?.metaData} />
        <meta name="description" content={categoryData?.metaDescription} />
        <link rel="canonical" href={fullUrl} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              addCategoriesJsonLd({
                ...categoryData,
                pageUrl: router.asPath,
                alias: router.query.id,
              })
            ),
          }}
          key="category-jsonld"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              addBreadcrumbListJsonLd({
                ...categoryData,
                pageUrl: router.asPath,
                alias: router.query.id,
              })
            ),
          }}
          key="breadcrumb-jsonld"
        />
      </Head>
      {router?.query?.id && (
        <HomeBanner
          apiEndPoint={process.env.API_BASE_URL}
          token={token}
          categoryId={router?.query?.id}
        />
      )}
      <ProductsSection>
        {/* <RouteBar /> */}
        {!categoryId && (
          <FilterBar
            length={products?.length}
            setInitial={setInitial}
            setPageable={setPageable}
            total={totalProducts}
            query={router?.query}
          />
        )}
        <ProductsContainer>
          {!categoryId && width > 1280 && (
            <LeftSection data={[]} businessId={businessId} />
          )}
          <div style={{ width: "100%" }}>
            <Stack
              flexDirection="column"
              sx={{
                // background: "var(--surface)",
                padding: {
                  xs: "0 0rem",
                  sm: "0rem 0rem 0 0rem",
                  xl: "0rem 0rem 0 0",
                },
                // marginTop: "0.5rem",
              }}
            >
              <FilterSec
                length={products?.length}
                setInitial={setInitial}
                setPageable={setPageable}
                total={totalProducts}
                query={router?.query}
                page={page}
                businessId={businessId}
              />

              <div
                style={{
                  overflow: "auto",
                  // height: width > 1280 && "100vh",
                }}
              >
                {loading && <ProductCardSkeleton />}
                {!loading && products && products.length > 0 ? (
                  <InfiniteScroll
                    dataLength={products?.length}
                    hasMore={!categoryId && pageable}
                    // hasMore={totalProducts > products?.length}
                    // loader={<ProductCardSkeleton />}
                    next={() => {
                      setPage((page) => page + 1);
                      // setPage(page + 1);
                    }}
                    scrollThreshold="70%"
                  >
                    <ProductsGrid>
                      {products.map((product, i) => (
                        <CommonProductCard
                          key={i}
                          product={product}
                          setSelectedId={setSelectedId}
                          selectedId={selectedId}
                          onListPage={true}
                          handleProducts={handleProducts}
                        />
                      ))}
                    </ProductsGrid>
                  </InfiniteScroll>
                ) : (
                  !productsLoading &&
                  !loading && (
                    <ProductsNotFound>products not found!</ProductsNotFound>
                  )
                )}
                {!loading && productsLoading && <ProductCardSkeleton />}
              </div>
              {/* )} */}
              {/* {error && <ProductsNotFound>Something went wrong!</ProductsNotFound>} */}
            </Stack>
          </div>
        </ProductsContainer>
        {/* <Newsteller /> */}
      </ProductsSection>
    </>
  );
};

export default ProductsPage;

export async function getServerSideProps(context) {
  const { id } = context.query;
  let categoryData = null;

  try {
    const res = await axios.get(
      `${process.env.PROXY_API_BASE_URL}/ecommerce/category/${id}`
    );
    categoryData = res.data.result;
  } catch (error) {
    console.error("Error fetching category data:", error);
  }

  return {
    props: { categoryData },
  };
}
