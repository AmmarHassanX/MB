import { Divider } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { BsChevronDown } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Badge, Box, Popper } from "@mui/material";
import Link from "next/link";
import { setAlert } from "../../AsyncFunctions/alert";
import { toggleOpenDrawer } from "../../store/cart";
import { useDatafetcher } from "../../utilities/hooks/useDatafetcher";
import useWindowScroll from "../../utilities/hooks/useWindowScroll";
import { ErrorMessage } from "../../utilities/theme/components";
import NavBody from "./NavBody";
import styles from "./style.module.scss";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { FaChevronDown } from "react-icons/fa6";
import { useRouter } from "next/router";
import { IoMdClose } from "react-icons/io";

const NavgationBar = ({ businessId }) => {
  const containerRef = useRef(null); // ref for main container
  const [showNavData, setShowNavData] = useState(-1);
  const { scrollY } = useWindowScroll();
  const dispatch = useDispatch();
  const { data: navData, error } = useDatafetcher(
    `/menu?businessTypeId=${businessId}`,
    true
  );
  const localCart = useSelector((state) => state.cart.localCartData);
  const cartData = useSelector((state) => state.cart.cartData);
  const userDetails = useSelector((state) => state.auth.userDetails);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showAllCategories, setShowAllCategories] = useState(false);

  const { query } = useRouter();
  useEffect(() => {
    setShowAllCategories(false);
  }, [query]);

  // Outside click handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target) &&
        !event.target.closest(".MuiPopper-root")
      ) {
        setShowAllCategories(false);
        setShowNavData(-1);
        setAnchorEl(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClick = (prop) => (event) => {
    setShowNavData(prop);
    setAnchorEl(event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper " + Math.random() : undefined;

  return (
    <div ref={containerRef} style={{ zIndex: 2, position: "relative" }}>
      <div
        style={{
          backgroundColor: "var(--bg-elevated)",
          borderBottom: "1px solid var(--border)",
          position: "relative",
          textTransform: "uppercase",
        }}
      >
        <div className={styles.container}>
          {error && (
            <ErrorMessage>unable to fetch navigation data!</ErrorMessage>
          )}
          {/* <div style={{ position: "absolute", left: 0 }}>
            <div
              onClick={() => setShowAllCategories(!showAllCategories)}
              // onMouseEnter={() => setShowAllCategories(true)}
              style={{
                display: "flex",
                alignItems: "center",
                userSelect: "none",
                borderRight: "1px solid var(--border)",
                paddingRight: "2rem",
              }}
              className={styles.navLink}
            >
              <HiOutlineMenuAlt1 size={18} />
              <div style={{ marginLeft: "10px", marginRight: "2rem" }}>
                All Categories
              </div>
              {showAllCategories ? (
                <IoMdClose
                  size={20}
                  onClick={() => setShowAllCategories(!showAllCategories)}
                />
              ) : (
                <FaChevronDown
                  size={15}
                  onClick={() => setShowAllCategories(!showAllCategories)}
                />
              )}
            </div>
          </div> */}
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Link href={"/"}>
              <div className={styles.navLink}>Home</div>
            </Link>

            {navData
              ?.filter(
                (nav) =>
                  nav?.id == "6" ||
                  nav?.id == "7" ||
                  nav?.id == "13" ||
                  nav?.id == "10" ||
                  nav?.id == "1"
              )
              ?.map((nav, i) => (
                <>
                  <div
                    className={styles.navLink}
                    key={i}
                    onMouseEnter={handleClick(nav.id)}
                    aria-describedby={id}
                    onMouseLeave={() => {
                      setAnchorEl(null);
                      setShowNavData(-1);
                    }}
                    id={`overlay-${nav.id}`}
                    style={
                      nav?.subCategories &&
                      nav.subCategories?.length > 0 &&
                      nav?.subCategories?.[0]?.subCategories?.length > 0
                        ? {}
                        : { position: "relative" }
                    }
                  >
                    {nav?.subCategories && nav.subCategories.length < 1 ? (
                      <Link
                        href={{
                          pathname:
                            nav.link || `/products/${nav.alias}/${nav.id}`,
                        }}
                      >
                        <a className={styles.hover}>
                          {categoryIcons[i]?.src && (
                            <img
                              src={categoryIcons[i]?.src}
                              alt=""
                              style={{
                                marginRight: "0.8rem",
                                maxWidth: "26px",
                                maxHeight: "26px",
                              }}
                            />
                          )}

                          <span>{nav.name?.toLowerCase()}</span>
                        </a>
                      </Link>
                    ) : (
                      <Link
                        href={{ pathname: `/products/${nav.alias}/${nav.id}` }}
                      >
                        <a>
                          {/* {categoryIcons[i]?.src && (
                            <img
                              src={categoryIcons[i]?.src}
                              alt=""
                              style={{
                                marginRight: "0.8rem",
                                maxWidth: "26px",
                                maxHeight: "26px",
                              }}
                            />
                          )} */}
                          <span>{nav.name?.toLocaleLowerCase()}</span>
                          <FaChevronDown
                            style={
                              showNavData === nav.id
                                ? {
                                    transition: ".5s",
                                    margin: "0 0 0 .4rem",
                                    transform: "rotate(180deg)",
                                  }
                                : {
                                    transition: ".5s",
                                    margin: "0 0 0 .4rem",
                                    transform: "rotate(0deg)",
                                  }
                            }
                          />
                        </a>
                      </Link>
                    )}
                    {nav?.subCategories && nav.subCategories.length > 0 && (
                      <div style={{ position: "relative" }}>
                        <Popper
                          id={id}
                          open={anchorEl && showNavData === nav.id}
                          anchorEl={anchorEl}
                          placement="bottom"
                          popperOptions="bottom"
                          style={{
                            zIndex: 99999,
                            backgroundColor: "var(--surface)",
                            borderRadius: "10px",
                          }}
                        >
                          <Box
                            sx={{
                              // p: 1,
                              bgcolor: "#ffffff",
                              overflow: "auto",
                            }}
                            className={styles.navBoxContainer}
                          >
                            {showNavData === nav.id && (
                              <NavBody
                                data={nav}
                                id={nav.id}
                                length={navData.length}
                                setshow={setShowNavData}
                              />
                            )}
                          </Box>
                        </Popper>
                      </div>
                    )}
                  </div>
                </>
              ))}
            {/* <Link href={"/products/vape-products/6"}>
              <div className={styles.navLink}>Vape</div>
            </Link>
            <Link href={"/products/beverages/7"}>
              <div className={styles.navLink}>Beverages</div>
            </Link>
            <Link href={"/products/restaurant-food-service-supply/13"}>
              <div className={styles.navLink}>Restaurant Supply</div>
            </Link>
            <Link href={"/products/snacks-candy-novelty-items/10"}>
              <div className={styles.navLink}>Snacks & Candy</div>
            </Link>
            <Link href={"/products/automotive/1"}>
              <div className={styles.navLink}>Automotive </div>
            </Link> */}
            <Link href={"/new-arrival"}>
              <div className={styles.navLink}>New Arrival</div>
            </Link>
          </div>
        </div>
      </div>

      {showAllCategories && (
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            width: "100%",
            position: "absolute",
          }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <div
            className={styles.mainContainer}
            onMouseEnter={() => setShowAllCategories(true)}
          >
            {navData &&
              navData.map((nav, i) => (
                <div
                  className={styles.navLink}
                  key={i}
                  onMouseEnter={handleClick(nav.id)}
                  aria-describedby={id}
                  onMouseLeave={() => {
                    setAnchorEl(null);
                    setShowNavData(-1);
                  }}
                  id={`overlay-${nav.id}`}
                  style={
                    nav?.subCategories &&
                    nav.subCategories.length > 0 &&
                    nav.subCategories[0]?.subCategories?.length > 0
                      ? {}
                      : { position: "relative" }
                  }
                >
                  <Link
                    href={{
                      pathname: `/products/${nav.alias}/${nav.id}`,
                    }}
                  >
                    <a>
                      <span>{nav.name?.toLocaleLowerCase()}</span>
                      {nav?.subCategories && nav.subCategories.length > 0 && (
                        <FaChevronDown
                          style={
                            showNavData === nav.id
                              ? {
                                  transition: ".5s",
                                  margin: "0 0 0 .4rem",
                                  transform: "rotate(270deg)",
                                }
                              : {
                                  transition: ".5s",
                                  margin: "0 0 0 .4rem",
                                  transform: "rotate(0deg)",
                                }
                          }
                        />
                      )}
                    </a>
                  </Link>

                  {nav?.subCategories && nav.subCategories.length > 0 && (
                    <Popper
                      id={id}
                      open={anchorEl && showNavData === nav.id}
                      anchorEl={anchorEl}
                      placement="right-start"
                      style={{ zIndex: 99999, margin: "0" }}
                      modifiers={[
                        {
                          name: "offset",
                          options: {
                            offset: [0, -10], // [skidding, distance] -> remove extra space
                          },
                        },
                      ]}
                    >
                      <Box
                        sx={{ bgcolor: "background.paper", overflow: "auto" }}
                        className={styles.navBoxContainer}
                        onMouseEnter={() => setShowNavData(nav.id)}
                        onMouseLeave={() => {
                          setAnchorEl(null);
                          setShowNavData(-1);
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                        }}
                      >
                        <NavBody
                          data={nav}
                          id={nav.id}
                          length={navData.length}
                          setshow={setShowNavData}
                        />
                      </Box>
                    </Popper>
                  )}
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NavgationBar;
