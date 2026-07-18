import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import dynamic from "next/dynamic";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
////////////////////////////////////////////////////////////////
const RouteBar = dynamic(
  () => import("../../../src/components/product-list/RouteBar"),
  { ssr: false }
);

// ;
import {
  ProductsSection,
  ProductsContainer,
  ProductsGrid,
  ProductsNotFound,
  CategoryBar,
} from "../../../src/components/product-list/style";
import { useDatafetcher } from "../../../src/utilities/hooks/useDatafetcher";
import InfiniteScroll from "react-infinite-scroll-component";
import CommonProductCard from "../../../src/components/productCard/productCard";

import LeftSection from "../../../src/components/product-list/leftSection/LeftSection";
import ProductCardSkeleton from "../../../src/components/productCard/productCardSkeleton/ProductCardSkeleton";
import { Stack } from "@mui/material";
import FilterBar from "../../../src/components/product-list/filterBar/FilterBar";
import useWindowSize from "../../../src/utilities/hooks/useWindowSize";
import { setPage } from "../../../src/store/products";
import { setOpenDrawer } from "../../../src/store/home";
import { useRouter } from "next/router";
import { RxDashboard } from "react-icons/rx";

const ProductsPage = ({ businessId }) => {
  const router = useRouter();
  const { data: productsData, loading } = useDatafetcher(
    `/ecommerce/product/listAllSearchedProduct?searchInput=${router?.query?.id}&page=0&size=20&sort=${router?.query?.sort}&sortDirection=${router?.query?.order}&storeIds=2`,
    true,
    { stateId: true }
  );
  // const page = useSelector((state) => state.products.page);

  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
  const [selectedId, setSelectedId] = useState(-1);
  const [initial, setInitial] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);
  const [pageable, setPageable] = useState(true);
  const [products, setProducts] = useState(productsData?.content);
  const { width } = useWindowSize();

  const { data: fetchedData, loading: fetchLoading } = useDatafetcher(
    `/ecommerce/product/listAllSearchedProduct?searchInput=${
      router?.query?.id
    }&page=${page}&size=20&sort=${
      router?.query?.sort || "date"
    }&sortDirection=${router?.query?.order || "DESC"}&storeIds=2`,
    page > 0 || !initial,
    { stateId: true }
  );

  useEffect(() => {
    setProducts(productsData?.content);
    setTotalProducts(productsData?.totalElements);

    setPage(0);

    if (productsData?.totalPages <= page + 1) {
      setPageable(false);
    } else {
      setPageable(true);
    }
  }, [productsData]);

  useEffect(() => {
    if (page > 0 && fetchedData?.content?.length > 0) {
      setProducts((products) => [...products, ...fetchedData?.content]);
      setTotalProducts(fetchedData?.totalElements);
      if (fetchedData?.totalPages <= page + 1) {
        setPageable(false);
      } else {
        setPageable(true);
      }
    } else if (!initial && fetchedData?.content?.length > 0) {
      setProducts(fetchedData?.content);
      setTotalProducts(fetchedData?.totalElements);
      if (productsData?.totalPages <= page + 1) {
        setPageable(false);
      } else {
        setPageable(true);
      }
      setInitial(true);
    }
  }, [fetchedData]);

  return (
    <ProductsSection>
      {/* <RouteBar onSearchPage={true} /> */}
      <FilterBar
        length={products?.length}
        setInitial={setInitial}
        setPageable={setPageable}
        total={totalProducts}
        query={router?.query}
        search={true}
      />
      <ProductsContainer>
        {width > 1280 && <LeftSection />}
        <Stack
          flexDirection="column"
          style={{ background: "var(--surface)", padding: "0", width: "100%" }}
        >
          {width < 1280 && (
            <CategoryBar
              onClick={() => {
                dispatch(setOpenDrawer(true));
              }}
            >
              <RxDashboard style={{ color: "#ffffff", fontSize: "1.8rem" }} />
              {/* <Image src="/images/products/category.png" alt="cat" width={16} height={16} /> */}
              <p>categories</p>
            </CategoryBar>
          )}

          <div style={{ width: "100%" }}>
            {loading || fetchLoading || (products && products.length > 0) ? (
              <InfiniteScroll
                dataLength={products?.length || 0}
                hasMore={loading || fetchLoading || pageable}
                // loader={<ProductCardSkeleton />}
                next={() => {
                  // setPage((page) => page + 1);
                  setPage(page + 1);
                }}
                scrollThreshold="70%"
              >
                <ProductsGrid>
                  {products?.map((product, i) => (
                    <div key={i}>
                      <CommonProductCard
                        product={product}
                        setSelectedId={setSelectedId}
                        selectedId={selectedId}
                        onListPage={true}
                      />
                    </div>
                  ))}
                </ProductsGrid>
              </InfiniteScroll>
            ) : (
              <ProductsNotFound>products not found!</ProductsNotFound>
            )}
            {(loading || fetchLoading) && <ProductCardSkeleton />}
          </div>
          {/* {error && <ProductsNotFound>Something went wrong!</ProductsNotFound>} */}
        </Stack>
      </ProductsContainer>
    </ProductsSection>
  );
};

export default ProductsPage;

// export async function getServerSideProps(context) {
//   let id = context?.params?.id;
//   let sort = context?.query?.sort || "date";
//   let order = context?.query?.order || "DESC";

//   const url = `${process.env.API_BASE_URL}/ecommerce/product/listAllSearchedProduct?searchInput=${id}&page=0&size=20&sort=${sort}&sortDirection=${order}&storeIds=2`;
//   const { data } = await axios.get(url);

//   return {
//     props: {
//       productsData: data?.result,
//       query: context?.query,
//     },
//   };
// }
