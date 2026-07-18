import React from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setPage } from "../../../store/products";
import { BsChevronDown } from "react-icons/bs";
import { useRouter } from "next/router";
import { FilterBarContainer, SelectBox } from "./FilterBar.style";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const FilterBar = ({ setPageable, query, search, onDetails, name }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  ////////filter products
  const filterProducts = (value) => {
    // setInitial(false);
    dispatch(setPage(0));
    setPageable(true);
    let url = search
      ? `/all/search/${query?.id}`
      : `/products/${query?.product}/${query?.id}`;

    if (value === "1") {
      return;
    } else if (value === "2") {
      router.push({
        pathname: url,
        query: { sort: "date", order: "ASC" },
      });
    } else if (value === "3") {
      router.push({
        pathname: url,
        query: { sort: "date", order: "DESC" },
      });
    } else if (value === "4") {
      router.push({
        pathname: url,
        query: { sort: "name", order: "ASC" },
      });
    } else if (value === "5") {
      router.push({
        pathname: url,
        query: { sort: "name", order: "DESC" },
      });
    } else if (value === "6") {
      router.push({
        pathname: url,
        query: { sort: "price", order: "ASC" },
      });
    } else if (value === "7") {
      router.push({
        pathname: url,
        query: { sort: "price", order: "DESC" },
      });
    }
  };

  let routeString = !search ? router?.query?.product : router?.query?.id;

  return (
    <FilterBarContainer>
      <div className="routeName">
        {/* Showing {length || 0} out of {total || 0} results */}
        <Link href="/">
          <a>Home</a>
        </Link>
        {onDetails && (
          <>
            <p>{"/"}</p>
            <p onClick={() => router.back()}>Products</p>
          </>
        )}
        {search && (
          <>
            <p>{"/"}</p>
            <p>Search</p>
          </>
        )}
        <p>{"/"}</p>
        <h1
          style={{
            textTransform: "capitalize",
            fontSize: "16px",
            marginLeft: "0.5rem",
          }}
        >
          {name || routeString?.split("-").join(" ")}
        </h1>
      </div>
      {/* {!onDetails && (
        <SelectBox>
          Sort By :
          <BsChevronDown className="icon" onClick={(e) => e.preventDefault()} />
          <select
            onChange={(e) => {
              filterProducts(e.target.value);
            }}
          >
            <option tabIndex={0} value={"2"}>
              Default
            </option>

            <option tabIndex={0} value={"3"}>
              Date(Oldest - Latest){" "}
            </option>
            <option tabIndex={0} value={"2"}>
              Date(Latest - Oldest){" "}
            </option>
            <option tabIndex={0} value={"4"}>
              Name(A - Z)
            </option>
            <option tabIndex={0} value={"5"}>
              Name(Z - A)
            </option>
            <option tabIndex={0} value={"6"}>
              price(low - high)
            </option>
            <option tabIndex={0} value={"7"}>
              price(high - low )
            </option>
          </select>
        </SelectBox> )}*/}
    </FilterBarContainer>
  );
};

export default FilterBar;
