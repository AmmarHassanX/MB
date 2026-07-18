import dynamic from "next/dynamic";
import Image from "next/image";
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
  CategoryBar,
  ProductsContainer,
  ProductsGrid,
  ProductsNotFound,
  ProductsSection,
} from "../../../src/components/product-list/style";
import CommonProductCard from "../../../src/components/productCard/productCard";
import ProductCardSkeleton from "../../../src/components/productCard/productCardSkeleton/ProductCardSkeleton";
import { useDatafetcher } from "../../../src/utilities/hooks/useDatafetcher";
import useWindowSize from "../../../src/utilities/hooks/useWindowSize";
// import { setPage } from "../../../src/store/products";
import LeftSection from "../../../src/components/product-list/leftSection/LeftSection";
import axios from "axios";
import { useRouter } from "next/router";
import Newsteller from "../../../src/components/home/Newsteller/Newsteller";
import { setOpenDrawer } from "../../../src/store/home";
import { RxDashboard } from "react-icons/rx";
import { setLoadedData } from "../../../src/store/products";
import { HomeBanner } from "@salesgenterp/ui-components";

const ProductsPage = ({ brandId, businessId }) => {
  // const page = useSelector((state) => state.products.page);
  const { loadedProducts, loadedPage, loadedBrandId, loadedTotalProducts } =
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
    if (loadedBrandId !== router.query.id) {
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
  }, [router.query.id]);

  useEffect(() => {
    const handleRouteChangeComplete = (url) => {
      if (prevRoute.current !== url) {
        window.scrollTo(0, 0);
      } else {
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

  const stateId = useSelector(
    (state) => state.auth.userDetails
  )?.customerDto?.customerStoreAddressList?.find(
    (address, index) => address?.active === true || index === 0
  )?.stateId;

  useEffect(() => {
    if (
      (loadedProducts.length <= 0 || page > loadedPage) &&
      loadedBrandId === router?.query?.id &&
      totalProducts > products?.length
    ) {
      let id = brandId || router?.query?.id;
      let sort = router?.query?.sort;
      let order = router?.query?.order;
      if (id) {
        setProductsLoading(true);
        const url =
          `${process.env.API_BASE_URL}/ecommerce/product/brand?brandIdList=${id}&page=${page}&size=20&storeIds=2` +
          `${stateId ? `&stateId=${stateId}` : ""}`;
        axios
          .get(url, {
            params: {
              sort,
              sortDirection: order,
            },
            headers: token && { Authorization: `Bearer ${token}` },
          })
          .then((res) => {
            setProductsLoading(false);
            setError(false);
            if ((brandId || page > 0) && res.data.result?.content?.length > 0) {
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
      if (loadedBrandId !== router?.query?.id) {
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
  }, [page, loadedBrandId, router?.query?.id]);

  useEffect(() => {
    if (loadedProducts.length <= 0) {
      let id = brandId || router?.query?.id;
      let sort = router?.query?.sort;
      let order = router?.query?.order;
      if (router.query.id) {
        setLoading(true);
        setPageable(true);
        const url =
          `${
            process.env.API_BASE_URL
          }/ecommerce/product/brand?brandIdList=${id}&page=${0}&size=20&storeIds=2` +
          `${stateId ? `&stateId=${stateId}` : ""}`;
        axios
          .get(url, {
            params: {
              sort,
              sortDirection: order,
            },
            headers: token && { Authorization: `Bearer ${token}` },
          })
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
  }, [router, loadedBrandId]);

  return (
    <>
      {router?.query?.id && (
        <HomeBanner
          apiEndPoint={process.env.API_BASE_URL}
          token={token}
          brandId={router?.query?.id}
        />
      )}
      <ProductsSection>
        {/* <RouteBar /> */}
        {!brandId && (
          <FilterBar
            length={products?.length}
            setInitial={setInitial}
            setPageable={setPageable}
            total={totalProducts}
            query={router?.query}
          />
        )}
        <ProductsContainer>
          {!brandId && width > 1280 && (
            <LeftSection data={[]} businessId={businessId} />
          )}
          <div style={{ width: "100%" }}>
            <Stack flexDirection="column" sx={{ padding: "0", width: "100%" }}>
              <FilterSec
                length={products?.length}
                setInitial={setInitial}
                setPageable={setPageable}
                total={totalProducts}
                query={router?.query}
                page={page}
                businessId={businessId}
              />
              {/* {!brandId && width < 1280 && (
                <CategoryBar
                  onClick={() => {
                    dispatch(setOpenDrawer(true));
                  }}
                >
                  <RxDashboard style={{ color: "#ffffff", fontSize: "1.8rem" }} />
                  <Image src="/images/products/category.png" alt="cat" width={16} height={16} />
                  <p>Brands</p>
                </CategoryBar>
              )} */}

              {/* {firstLoading && loading && !productsNotFound ? (
            <ProductCardSkeleton padding />
          ) : ( */}
              <>
                {loading && <ProductCardSkeleton />}
                {!loading && products && products.length > 0 ? (
                  <InfiniteScroll
                    dataLength={products?.length}
                    hasMore={!brandId && pageable}
                    // hasMore={totalProducts > products?.length}
                    // loader={<ProductCardSkeleton />}
                    next={() => {
                      setPage((page) => page + 1);
                      // setPage(page + 1);
                    }}
                    scrollThreshold="70%"
                  >
                    {/* <FilterSec
                  length={products?.length}
                  setInitial={setInitial}
                  setPageable={setPageable}
                  total={totalProducts}
                  query={router?.query}
                  page={page}
                  businessId={businessId}
                /> */}
                    <ProductsGrid>
                      {products.map((product, i) => (
                        <div key={i}>
                          <CommonProductCard
                            product={product}
                            setSelectedId={setSelectedId}
                            selectedId={selectedId}
                            onListPage={true}
                            handleProducts={handleProducts}
                          />
                        </div>
                      ))}
                    </ProductsGrid>
                  </InfiniteScroll>
                ) : (
                  !productsLoading &&
                  !loading && (
                    <ProductsNotFound>products not found!</ProductsNotFound>
                  )
                )}
                {productsLoading && <ProductCardSkeleton />}
              </>
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
