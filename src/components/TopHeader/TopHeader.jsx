import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
// import { AiOutlineLock } from "react-icons/ai";
////
import { FiTruck } from "react-icons/fi";
import { useDatafetcher } from "../../utilities/hooks/useDatafetcher";
import useWindowScroll from "../../utilities/hooks/useWindowScroll";
import theme from "../../utilities/theme/theme";
import LandingCarousel from "../home/ladingCarousel/landingCarousel";
import MainPopup from "../popup/MainPopup";
import { AiOutlineUserAdd } from "react-icons/ai";
import { BsTelephoneForward } from "react-icons/bs";
import { MdOutlineMailLock } from "react-icons/md";
import { LuMapPin } from "react-icons/lu";
import { FiPhone } from "react-icons/fi";
import { MdOutlineMail } from "react-icons/md";

////
const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 11px;

  // border-bottom: 1px solid var(--text)1a;
  // border-bottom: ${(props) =>
    props.combineHeader && "1px solid rgba(119, 119, 119, 0.4)"};
  background-color: var(--bg-elevated);
`;
const Header = styled.div`
  flex-direction: row;
  justify-content: ${(props) =>
    props.combineHeader ? "space-between" : "center"};
  align-items: center;
  width: 100%;
  max-width: 1400px;
  color: ${(props) => props.theme.palette.bg.main};
  display: flex;
  margin: 0 auto;
  // @media only screen and (min-width: 2200px) {
  //   max-width: 1616px;
  // }
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  width: 100%;
  color: var(--text-2);
  font-size: 1rem;
  // font-weight: 500;
  // &:hover {
  //   color: ${(props) =>
    props.combineHeader && props.theme.palette.colors.primary};
  // }
  a {
    display: flex;
    font-size: 13px;
    font-weight: 400;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    transition: all 0.3s;
    padding-left: 4px;
    padding-right: 4px;
    &:hover {
      opacity: 0.8;
    }
  }
  p {
    // font-size: 14px;
    // font-weight: 400;
    // margin: 0 0.4em;
  }
  b {
    font-weight: 700;
    font-size: 1.125rem;
  }
  svg {
    font-size: 1.6rem;
  }
  .icon {
    font-size: 1.2rem;
    cursor: pointer;
    transition: all 0.2s;
  }
`;

const leftLinks = [
  {
    href: "/#",
    icon: <LuMapPin size={18} />,
    label: "Find Store",
  },
  {
    href: "tel:+13178039060",
    icon: <FiPhone size={16} />,
    label: "+1 (317) 803-9060",
  },
  {
    href: "mailto:sales@mbwholesalellc",
    icon: <MdOutlineMail size={18} />,
    label: "sales@mbwholesalellc",
  },
];

const rightLinks = [
  { href: "/promo", label: "Promo" },
  { href: "/track-order", label: "Track Order" },
  { href: "/contact-us", label: "Contact Us" },
];

const separator = (
  <div
    style={{
      width: "1px",
      height: "18px",
      backgroundColor: "var(--surface-2)",
    }}
  />
);
const TopHeader = ({ businessId }) => {
  const userDetails = useSelector((state) => state.auth.userDetails);
  const [showDropDown, setShowDropDown] = React.useState(false);
  const [showAgeRes, setShowAgeRes] = React.useState(false);
  const { data: topHeaderBanner } = useDatafetcher(
    `/home/sliderImages?sliderType=top-banner&businessTypeId=${businessId}`,
    true
  );
  const { scrollY } = useWindowScroll();
  const dispatch = useDispatch();
  const linkStyle = {
    color: "var(--accent)",
    fontSize: "14px",
    fontWeight: "300",
    display: "flex",
    alignItems: "center",
    gap: "4px",
    cursor: "pointer",
  };

  const groupStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "10px",
  };

  useEffect(() => {
    let body = document.getElementsByTagName("body")[0];
    if (showAgeRes) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "auto";
    }
    const DontShowPopups = sessionStorage.getItem("DontShowPopups");
    ////console.log(DontShowPopups);
    if (DontShowPopups) {
      setShowAgeRes(false);
    } else {
      setShowAgeRes(true);
    }
  }, [showAgeRes]);

  const TopHeader2 = () => {
    return (
      <>
        <MainPopup show={showAgeRes} setShow={setShowAgeRes} />
        {/* <div style={{ width: "100%", padding: "0" }}>
          <p
            style={{
              textAlign: "center",
              fontSize: "16px",
              fontWeight: 700,
              color: theme.palette.colors.primary,
              lineHeight: "18px",
              padding: "9px",
            }}
          >
            WARNING: This product contains nicotine. Nicotine is an addictive
            chemical.
          </p>
        </div> */}
        <Container
          combineHeader
          className="noBelowMd"
          // style={{ borderBottom: "4px solid black" }}
        >
          <Header combineHeader>
            <Row combineHeader>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  maxWidth: "1400px",
                  width: "100%",
                  margin: "0 auto",
                }}
              >
                {/* Left group */}
                <div style={groupStyle}>
                  {leftLinks.map((item, idx) => (
                    <React.Fragment key={idx}>
                      <Link href={item.href}>
                        <div style={linkStyle}>
                          {item.icon}
                          <div>{item.label}</div>
                        </div>
                      </Link>
                      {idx < leftLinks.length - 1 && separator}
                    </React.Fragment>
                  ))}
                </div>

                {/* Right group */}
                <div style={groupStyle}>
                  {rightLinks.map((item, idx) => (
                    <React.Fragment key={idx}>
                      <Link href={item.href}>
                        <div style={linkStyle}>
                          <div>{item.label}</div>
                        </div>
                      </Link>
                      {idx < rightLinks.length - 1 && separator}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </Row>
            {/* <Row className="noBelowMd" combineHeader>
              <span style={{ color: "var(--accent)" }}>
                <>- Free shipping for orders over $30 -</>
              </span>
            </Row> */}
            {/* <Row className="noBelowMd" combineHeader> */}
            {/* <span style={{ paddingRight: "1rem", display: "flex", alignItems: "center" }}>
                Free Shipping on all orders <b>$500+</b>
              </span> */}
            {/* <span>Checkout | Cart | Faq | About Us</span> */}
            {/* <span style={{ display: "flex", alignItems: "center" }}>
                <BsTruck style={{ marginRight: "0.5rem" }} />
                <span>Follow Us:</span>
              </span>
              <Link href="https://www.instagram.com/" passHref>
                <AiOutlineInstagram style={{ marginLeft: "1rem" }} />
              </Link>
              <Link href="https://twitter.com/">
                <AiOutlineTwitter style={{ marginLeft: "1rem" }} />
              </Link>
              <Link href="https://www.facebook.com/">
                <AiFillFacebook style={{ marginLeft: "1rem" }} />
              </Link> */}
            {/* <>
                <Row combineHeader>
                  <Link href="#">
                    <a style={{ display: "flex", fontSize: "0.875rem" }}>
                      <CiHeart style={{ marginRight: "0.5rem", fontSize: "1rem" }} />
                      Wish Lists
                    </a>
                  </Link>
                </Row>
              </> */}
            {/* {userDetails && (
                <Row combineHeader>
                  <Link href="/account">
                    <a style={{ display: "flex", fontSize: "0.875rem" }}>
                      <FaUser style={{ marginRight: "0.5rem", fontSize: "1rem" }} />
                      My Account?
                    </a>
                  </Link>
                </Row>
              )} */}
            {/* <Divider
                orientation="vertical"
                flexItem
                sx={{ borderColor: "var(--text-2)", margin: "auto", height: "13px" }}
              /> */}
            {/* <>
                <Row combineHeader>
                  <Link href="/contact-us">
                    <a style={{ display: "flex", fontSize: "0.875rem" }}>
                      <MdError style={{ marginRight: "0.5rem", fontSize: "1rem" }} />
                      Help Center
                    </a>
                  </Link>
                </Row>
              </> */}
            {/* <Divider
                orientation="vertical"
                flexItem
                sx={{ borderColor: "var(--text-2)", margin: "auto", height: "13px" }}
              /> */}
            {/* <>
                <Row combineHeader>
                  <Link href="/contact-us">
                    <a style={{ display: "flex", fontSize: "0.875rem" }}>
                      <FiPhoneCall style={{ marginRight: "0.5rem", fontSize: "1rem" }} />
                      Contact Us
                    </a>
                  </Link>
                </Row>
              </> */}

            {/* <>
                <Row combineHeader>
                  <Link href="#">
                    <a style={{ display: "flex", fontSize: "0.875rem" }}>
                      <RiSendPlaneLine style={{ marginRight: "0.5rem", fontSize: "1rem" }} />
                      Sell Here
                    </a>
                  </Link>
                </Row>
              </> */}

            {/* {!userDetails && (
                <Row combineHeader>
                  <Link href="/account/login">
                    <a style={{ display: "flex", fontSize: "0.875rem" }}>
                      <AiOutlineUnlock style={{ marginRight: "0.5rem", fontSize: "1rem" }} />
                      Sign In or Create an Account
                    </a>
                  </Link>
                </Row>
              )} */}

            {/* <> */}
            {/* <Row combineHeader>
                  <Link href="/dashboard">
                    <a style={{ display: "flex", fontSize: "14px" }}>
                      <BsListUl style={{ marginRight: "0.5rem", fontSize: "1rem" }} />
                      Order History
                    </a>
                  </Link>
                </Row> */}
            {/* </> */}
            <>
              {/* <Row combineHeader>
                  <Link href="/cart">
                    <a style={{ display: "flex", fontSize: "14px" }}>
                      <BsCart2 style={{ marginRight: "0.5rem", fontSize: "1rem" }} />
                      Shopping Cart
                    </a>
                  </Link>
                </Row> */}
            </>
            {/* <Box
                
                sx={{
                  cursor: "pointer",
                  "& .user-name": {
                    fontSize: 12,
                  },
                }}
              >
                <Row combineHeader>
                  <Link href="/account/login">
                    <span style={{ display: "flex" }}>
                      <BiLockOpen />
                      <>Login</>
                    </span>
                  </Link>
                </Row>
              </Box>
              <Divider orientation="vertical" flexItem sx={{ borderColor: "var(--border)" }} /> */}
            {/* <Box
                
                sx={{
                  cursor: "pointer",
                  "& .user-name": {
                    fontSize: 12,
                  },
                }}
              >
                <Row combineHeader>
                  <span
                    href="#"
                    onClick={() => {
                      if (userDetails) {
                        dispatch(toggleOpenDrawer(true));
                      } else {
                        dispatch(setAlert("warn", "login to view cart"));
                      }
                    }}
                  >
                    <span style={{ display: "flex" }}>
                      <AiOutlineShoppingCart /> 
                      Cart
                    </span>
                  </span>
                </Row>
              </Box> */}
            {/* </Row> */}
            {/* {userDetails ? (
              <Row className="noAboveMd">
                <Icon bg="var(--text)">
                  <Image src="/images/header/United-States-Flag.png" alt="login" width={9} height={9} />
                </Icon>
                <p style={{ textTransform: "capitalize" }}>Hi! {userDetails?.customerDto?.firstName}</p>
              </Row>
            ) : (
              <Link href="/account/login">
                <Row className="noAboveMd">
                  <Icon bg="var(--text)">
                    <Image src="/images/header/login-icon.png" alt="login" width={9} height={9} />
                  </Icon>
                  <p style={{ textTransform: "capitalize" }}>login&nbsp;/&nbsp;register</p>
                </Row>
              </Link>
            )} */}
          </Header>
        </Container>
      </>
    );
  };
  return (
    <div>
      <div
        style={{
          maxHeight: "4rem",
        }}
      >
        {/* <LandingCarousel data={topHeaderBanner} /> */}
      </div>
      <TopHeader2 />
    </div>
  );
};

export default TopHeader;
