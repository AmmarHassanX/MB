import Link from "next/link";
import React from "react";
////////////////////////////////////////////////////////////////
import { Grid } from "@mui/material";
import { paramCase } from "param-case";
import { BiSearch } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useDatafetcher } from "../../../utilities/hooks/useDatafetcher";
import { useDebounce } from "../../../utilities/hooks/useDebounce";
import styles from "../search.module.scss";

const SearchDropDown = ({ searchData }) => {
  const userDetails = useSelector((state) => state.auth.userDetails);

  const { data: fetchData, error } = useDatafetcher(
    `/ecommerce/product/searchByProductOrCategory?searchInput=${searchData}`,
    searchData.length > 2,
    { stateId: true }
  );
  const Debounce = useDebounce(searchData, 5000);

  return (
    <div className={styles.searchDrContainer}>
      {fetchData?.productCoreDtoList?.length > 0 ||
      fetchData?.categoryDtoList?.length > 0 ? (
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <div>
              <h3 className={styles.searchTitle}>Categories</h3>
              <div className={styles.searchProductContainer}>
                {fetchData?.categoryDtoList?.map((li, i) => (
                  <div className={styles.cardContainer} key={i}>
                    <Link
                      href={{
                        pathname: `/products/${paramCase(li.name)}/${li.id}`,
                      }}
                    >
                      <div className={styles.card}>
                        <BiSearch />
                        <h2>
                          <>{li?.name}</>
                        </h2>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </Grid>
          <Grid item xs={8}>
            <div>
              <h3 className={styles.searchTitle}>Products</h3>
              <div className={styles.searchProductContainer}>
                <Grid container spacing={1}>
                  {fetchData?.productCoreDtoList?.map((li, i) => (
                    <Grid item xs={12} key={i}>
                      <div className={styles.searchProduct} key={i}>
                        <Link
                          href={{
                            pathname: `/product-details/${paramCase(
                              li.alias ?? li.productName
                            )}`,
                            query: { id: li.productId },
                          }}
                        >
                          <div className={styles.cardContainer}>
                            <div className={styles.card}>
                              <img
                                src={
                                  li?.imageUrl && li?.imageUrl !== "null"
                                    ? li?.imageUrl
                                    : "/images/products/imgnotfound.png"
                                }
                                style={{ objectFit: "contain" }}
                                alt="product"
                              />

                              <h2>
                                {li?.productName}
                                {userDetails && (
                                  <span>$ {li?.standardPrice}</span>
                                )}
                              </h2>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </Grid>
                  ))}
                </Grid>
              </div>
            </div>
          </Grid>
        </Grid>
      ) : (
        <>
          {!Debounce ? (
            <h3 className={styles.noResultFound}>Loading....</h3>
          ) : (
            <h3 className={styles.noResultFound}>
              No results found with &nbsp;
              <span>&ldquo;{searchData}&ldquo;</span>
            </h3>
          )}
        </>
      )}
      {fetchData?.productCoreDtoList &&
        fetchData?.productCoreDtoList?.length > 0 && (
          <Link
            href={{
              pathname: `/all/search/${searchData}`,
            }}
          >
            <p className={styles.viewAll}>
              {" "}
              View all {fetchData?.totalCount} results
            </p>
          </Link>
        )}
      {error && <h3 className={styles.noResultFound}>something went wrong!</h3>}
    </div>
  );
};

export default SearchDropDown;
