import React from "react";
import { useRouter } from "next/router";
////
import { NavHeader, ProductButton } from "./style";

const RouteBar = ({ onSearchPage, onListPage, name }) => {
  const router = useRouter();

  let routeString = !onSearchPage ? router?.query?.product : router?.query?.id;

  return (
    <NavHeader>
      <h4>{name || routeString?.split("-").join(" ")}</h4>
      <ProductButton
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        small={onListPage}
      >
        Shop collection
      </ProductButton>
    </NavHeader>
  );
};

export default RouteBar;
