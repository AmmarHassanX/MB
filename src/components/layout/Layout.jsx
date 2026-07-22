import { Box, Drawer, Stack } from "@mui/material";
import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../../AsyncFunctions/Auth";
import { fetchCartData } from "../../AsyncFunctions/cart";
import { toggleOpenDrawer } from "../../store/cart";
//////////
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { setStores, setToken } from "../../store/Auth";
import { useDatafetcher } from "../../utilities/hooks/useDatafetcher";
import useWindowSize from "../../utilities/hooks/useWindowSize";
import Navigation from "../Navigation/Navigation";
import CartDrawerStack from "../cartDrawer/CartDrawer";
import SiteFooter from "../redesign/SiteFooter";
import ScrollProgress from "../motion/ScrollProgress";

const Header = dynamic(() => import("../Header/Header"), { ssr: false });

const Layout = ({ children, businessId }) => {
  const { width } = useWindowSize();
  const dispatch = useDispatch();
  const { query } = useRouter();
  const userDetails = useSelector((state) => state.auth.userDetails);
  const tokens = useSelector((state) => state.auth.tokens);
  const openDrawer = useSelector((state) => state.cart.openDrawer);
  const { data: stores } = useDatafetcher("/store", true);

  useEffect(() => {
    dispatch(setStores(stores));
  }, [stores]);

  useEffect(() => {
    if (query?.accessToken) {
      dispatch(
        setToken({
          token: query?.accessToken,
          retoken: "",
        })
      );
    }
  }, [query]);

  useEffect(() => {
    if (tokens?.token) {
      getUserDetails(tokens?.token)(dispatch);
    }
  }, [tokens]);

  useEffect(() => {
    if (userDetails) {
      const activeAddress =
        userDetails?.customerDto?.customerStoreAddressList?.find(
          (address, index) => address.active === true || index === 0
        );
      const stateId = activeAddress?.stateId ? activeAddress?.stateId : null;
      Cookies.set("token", tokens?.token, {
        path: "/",
      });
      Cookies.set("stateId", stateId, {
        path: "/",
      });
      fetchCartData(tokens?.token)(dispatch);
    } else {
      Cookies.remove("token", { path: "/" });
      Cookies.remove("stateId", { path: "/" });
    }
  }, [userDetails]);

  return (
    <Stack
      sx={{ width: "100%", overflow: "hidden", background: "var(--surface)" }}
      flexDirection="column"
    >
      <ScrollProgress />
      <Header businessId={businessId} />
      {width > 1200 && <Navigation businessId={businessId} />}
      <Box sx={{ width: "100%" }}>
        <Drawer
          open={openDrawer}
          onClose={() => dispatch(toggleOpenDrawer(false))}
          anchor="right"
        >
          <CartDrawerStack />
        </Drawer>
        {children}
        {/* <Features /> */}
        {/* <hr
          style={{
            maxWidth: "1400px",
            margin: "auto",
            marginBottom: "2rem",
            background: "var(--accent)",
            height: "2px", // Adjust thickness as needed
            border: "none", // Ensure no border is applied
          }}
        /> */}
      </Box>
      {/* <Newsteller /> */}
      {/* <Divider
        orientation="horizontal"
        flexItem
        sx={{ borderColor: "#231F20", margin: "auto auto 2px auto", width: "100%", maxWidth: "1400px" }}
      /> */}
      <SiteFooter businessId={businessId} />
    </Stack>
  );
};

export default Layout;
