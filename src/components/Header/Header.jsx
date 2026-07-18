import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { FiMenu } from "react-icons/fi";
import { BsChevronDown, BsShop } from "react-icons/bs";
import Image from "next/image";
import { BiHeart } from "react-icons/bi";
import { Icon, IconWrapper } from "./header.style";
import { FiPhoneCall } from "react-icons/fi";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { MdOutlineShoppingCart } from "react-icons/md";
////////////////////////////////////////////////////////////////////////////
import { BsTelephoneForward } from "react-icons/bs";
import { MdOutlineMail } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";

import {
  HeaderContainer,
  HeaderNav,
  HeaderMobNav,
  HeaderSection,
  IconBox,
  IconBoxes,
  LogoContainer,
  IconsContainer,
  SmIcons,
} from "./header.style";
import SearchHeader from "../Search/Search";
import useWindowScroll from "../../utilities/hooks/useWindowScroll";
import { Badge, Drawer, Stack, Typography, Divider, Box } from "@mui/material";
import NavDrawer from "../Navigation/NavDrawer/NavDrawer";
import useWindowSize from "../../utilities/hooks/useWindowSize";
import styles from "../Navigation/NavDrawer/mobile.module.scss";
import { setOpenDrawer } from "../../store/home";
import { toggleOpenDrawer } from "../../store/cart";
import AccountDropDown from "./DropDown/AccountDropDown";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { setAlert } from "../../AsyncFunctions/alert";
import { useDatafetcher } from "../../utilities/hooks/useDatafetcher";
import { useRouter } from "next/router";
import { AiOutlineUserAdd } from "react-icons/ai";
import { IoPersonOutline } from "react-icons/io5";
import theme from "../../utilities/theme/theme";
import { RiShoppingBag4Line } from "react-icons/ri";

const Header = ({ businessId }) => {
  const router = useRouter();
  const { data, error } = useDatafetcher("/store/businessType", true);
  const { width } = useWindowSize();
  const dispatch = useDispatch();
  const [showDropDown, setShowDropDown] = useState(false);
  const localCart = useSelector((state) => state.cart.localCartData);
  const cartData = useSelector((state) => state.cart.cartData);
  const openDrawer = useSelector((state) => state.Home.openDrawer);
  const userDetails = useSelector((state) => state.auth.userDetails);
  const selectedBusiness = data?.find((v) => v.id !== Number(businessId));
  const notSelectedBusiness = data?.find((v) => v.id !== Number(businessId));
  return (
    <HeaderSection className="header">
      <HeaderContainer>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            "@media (max-width:1400px)": {
              width: "100%",
            },
          }}
        >
          <SmIcons>
            <FiMenu
              onClick={() => dispatch(setOpenDrawer(true))}
              style={{ color: "var(--text)" }}
            />
            {/* ///////////mobile drawer//// */}
            <Drawer
              className="header"
              open={openDrawer}
              onClose={() => dispatch(setOpenDrawer(false))}
            >
              <div className={styles.drawerContainer}>
                <NavDrawer businessId={businessId} />
              </div>
            </Drawer>
          </SmIcons>
          <LogoContainer>
            <Link href="/">
              <Image
                layout="fill"
                src="/images/header/logo.png"
                alt="logo"
                objectFit="contain"
              />
            </Link>
          </LogoContainer>
        </Box>

        {width > 1400 && (
          <HeaderNav className="noBelowLg">
            <SearchHeader businessId={businessId} />
          </HeaderNav>
        )}
        <IconsContainer>
          <ThemeToggle />
          {userDetails ? (
            <IconWrapper
              capitalize
              // className="noBelowMd"
              noHover
              onMouseEnter={() => setShowDropDown(true)}
              onMouseLeave={() => setShowDropDown(false)}
            >
              <div className="rightSection noBelowMd">
                <p
                  style={{
                    color: "var(--text-2)",
                    fontWeight: "300",
                    fontSize: "14px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Hi, {userDetails?.customerDto?.firstName}
                </p>
              </div>
              <IconBox bg="true" onClick={() => console.log("hello")}>
                <AiOutlineUser
                  size={30}
                  
                  onClick={() => {
                    router.push("/account");
                  }}
                />
              </IconBox>{" "}
              {showDropDown && <AccountDropDown />}
            </IconWrapper>
          ) : (
            <Link href="/account/login">
              <IconWrapper>
                <div className="rightSection noBelowMd">
                  <p
                    style={{
                      color: "var(--text-2)",
                      fontWeight: "300",
                      fontSize: "14px",
                    }}
                  >
                    Login/Register
                  </p>
                </div>
                <IconBox bg="true" onClick={() => console.log("hello")}>
                  <AiOutlineUser size={30}  />
                </IconBox>
              </IconWrapper>
            </Link>
          )}
          {/* <Divider
            className="noBelowMd"
            style={{
              color: "#65B9F6",
              borderColor: "#65B9F6",
              maxHeight: "23px",
              margin: "0 1rem",
            }}
            orientation="vertical"
          /> */}
          <IconWrapper
            onClick={() => {
              if (userDetails) {
                dispatch(toggleOpenDrawer(true));
              } else {
                setAlert("warn", "login to view cart");
              }
            }}
          >
            <IconBox bg="true">
              <Badge
                badgeContent={
                  userDetails
                    ? cartData?.totalCartQuantity || 0
                    : localCart?.totalCartQuantity || 0
                }
                sx={{
                  "& .MuiBadge-badge": {
                    backgroundColor: "var(--accent)",
                    color: "var(--accent-contrast)",
                    marginTop: "5px",
                  },
                }}
                showZero={true}
                color="error"
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
              >
                <RiShoppingBag4Line size={30}  />
                {/* <Image src={"/images/header/cart.svg"} alt="cart" width={41} height={41} layout="fill" /> */}
              </Badge>
            </IconBox>
            {/* <div className="rightSection noBelowMd">
              <p>
                $
                {cartData?.totalCartPrice?.toFixed(2) ||
                  localCart?.totalCartPrice?.toFixed(2) ||
                  "0.00"}
              </p>
            </div> */}
          </IconWrapper>
        </IconsContainer>
      </HeaderContainer>
      {width < 1400 && (
        <HeaderMobNav>
          <SearchHeader />
        </HeaderMobNav>
      )}
    </HeaderSection>
  );
};

export default Header;
