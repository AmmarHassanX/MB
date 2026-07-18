import { Box, Tab, Tabs } from "@mui/material";
import cx from "classnames";
import Router, { useRouter } from "next/router";
import React, { useState, useRef, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

////////////////////////////////////////////////////////////////
import Link from "next/link";
import styled from "styled-components";
import { setOpenDrawer } from "../../../store/home";
import { useDatafetcher } from "../../../utilities/hooks/useDatafetcher";
import { ErrorMessage } from "../../../utilities/theme/components";
import {
  unAuthorizedItems,
  userAccountItems,
} from "../../Header/DropDown/AccountDropDown";
import Level1 from "./Level1";
import styles from "./mobile.module.scss";
import theme from "../../../utilities/theme/theme";

const NavDrawer = ({ onListPage, businessId }) => {
  const userDetails = useSelector((state) => state.auth.userDetails);
  const { data: navData, error } = useDatafetcher(
    `/menu?businessTypeId=${businessId}`,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
    },
    { stateId: true }
  );

  const dispatch = useDispatch();
  const router = useRouter();
  const scrollContainerRef = useRef(null);
  const savedScrollPosition = useRef({ container: 0, window: 0 });

  const [dropId, setDropId] = useState([-1]);
  const [value, setValue] = useState(0);

  // Restore scroll position after dropId changes
  useEffect(() => {
    // Restore container scroll
    if (scrollContainerRef.current) {
      requestAnimationFrame(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTop =
            savedScrollPosition.current.container;
        }
        // Restore window scroll if it changed
        if (window.scrollY !== savedScrollPosition.current.window) {
          window.scrollTo(0, savedScrollPosition.current.window);
        }
      });
    }
  }, [dropId]);

  const handleClick = (product) => {
    Router.push({
      pathname: `/products/${product.alias}/${product.id}`,
    });
    if (setOpenDrawer) dispatch(setOpenDrawer(false));
  };

  // Wrapper function that preserves scroll before updating dropId
  const updateDropId = (newDropId) => {
    // Save current scroll positions before state update
    if (scrollContainerRef.current) {
      savedScrollPosition.current.container =
        scrollContainerRef.current.scrollTop;
    }
    savedScrollPosition.current.window = window.scrollY;
    setDropId(newDropId);
  };

  const OpenNav = (link) => {
    if (dropId.includes(link)) {
      let newList = dropId.filter((nav) => nav !== link);
      updateDropId(newList);
    } else {
      updateDropId([...dropId, link]);
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box
            style={{
              padding: "10px 0",
            }}
          >
            <>{children}</>
          </Box>
        )}
      </div>
    );
  }

  const DrawerNav = ({ onListPage }) => {
    return (
      <div
        ref={scrollContainerRef}
        style={{ height: "450px", overflowY: "auto" }}
      >
        {navData
          ?.filter((item) =>
            onListPage ? item?.id == router?.query?.id : true
          )
          ?.map((nav, i) => (
            <div
              key={i}
              // style={{ borderBottom: " 1px solid #CECECE" }}
            >
              {onListPage ? (
                <Level1
                  data={nav.subCategories}
                  h2={true}
                  onListPage={onListPage}
                  dropId={dropId}
                  setDropId={updateDropId}
                />
              ) : (
                <div className="">
                  <div
                    className={cx(styles.mainLink, styles.navMenu)}
                    key={i}
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleClick(nav);
                    }}
                  >
                    <p
                      style={{
                        display: "flex",
                        alignItems: "center",
                        color:
                          router?.query?.id == nav?.id ? "#13233D" : "var(--text-2)",
                        fontWeight: router?.query?.id == nav?.id ? 600 : 400,
                        fontSize: "15px",
                      }}
                    >
                      {/* <input
                  type="checkbox"
                  name="nav_checkbox"
                  checked={router?.query?.id == nav?.id}
                  id=""
                  style={{ marginRight: "0.5rem" }}
                /> */}
                      {/* {categoryIcons[i]?.src && <img src={categoryIcons[i]?.src} alt="" style={{ marginRight: "0.8rem" }} />} */}
                      {nav.name}
                    </p>
                    {nav?.subCategories?.length > 0 && (
                      <div
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          OpenNav(nav.id);
                        }}
                      >
                        {dropId.includes(nav.id) ? (
                          <IoIosArrowForward
                            className={styles.icondown}
                            color={"var(--text-2)"}
                            style={{ transform: "rotate(-90deg)" }}
                          />
                        ) : (
                          <IoIosArrowForward
                            className={styles.icondown}
                            color={"var(--text-2)"}
                          />
                        )}
                      </div>
                    )}
                  </div>
                  {dropId?.includes(nav.id) && (
                    <Level1
                      data={nav.subCategories}
                      h2={true}
                      onListPage={onListPage}
                      dropId={dropId}
                      setDropId={updateDropId}
                    />
                  )}
                </div>
              )}
            </div>
          ))}
      </div>
    );
  };

  const AccountNav = () => {
    const items = userDetails ? userAccountItems : unAuthorizedItems;
    return (
      <AccountContainer>
        {userDetails && (
          <p className="userName">
            Hi&nbsp;{userDetails.customerDto.firstName}{" "}
          </p>
        )}
        {items?.map((item, i) => {
          return (
            <AccountItem
              key={i}
              last={items?.length - 1 === i}
              onClick={() => {
                if (setOpenDrawer) dispatch(setOpenDrawer(false));
              }}
            >
              <Link href={item?.link}>
                <a
                  onClick={item?.onClick}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  {item?.icon}
                  {item?.name}
                </a>
              </Link>
            </AccountItem>
          );
        })}
      </AccountContainer>
    );
  };

  return (
    <>
      {error && <ErrorMessage>something went wrong</ErrorMessage>}
      {!onListPage && (
        <div className={styles.closeBar}>
          <p
            onClick={() => {
              dispatch(setOpenDrawer(false));
            }}
          >
            close <AiOutlineClose className={styles.icon} />
          </p>
        </div>
      )}
      {!onListPage ? (
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            TabIndicatorProps={{
              style: {
                backgroundColor: "#000000",
              },
            }}
          >
            <Tab
              label="Menu"
              style={{
                color: "var(--text)",
                fontSize: "1rem",
              }}
            />
            <Tab
              label="Account"
              style={{
                color: "var(--text)",
                fontSize: "1rem",
              }}
            />
          </Tabs>
          <CustomTabPanel value={value} index={0}>
            <div style={{}}>
              <h3
                style={{
                  margin: "1rem 0.5rem",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                Categories
              </h3>
              <DrawerNav onListPage={onListPage} />
            </div>
            <h3
              style={{
                margin: "1rem 0.5rem",
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              Brands
            </h3>
            <BrandNav businessId={businessId} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <AccountNav />
          </CustomTabPanel>
        </Box>
      ) : (
        <>
          <DrawerNav onListPage={onListPage} />
        </>
      )}
    </>
  );
};

export default NavDrawer;

const AccountContainer = styled.div`
  .userName {
    padding: 1rem;
    font-size: 1.4rem;
    font-weight: 600;
    color: ${(props) => props.theme.palette.colors.black};
  }
`;

const AccountItem = styled.div`
  padding: 1rem;
  font-size: 1.1rem;
  font-weight: 500;
  color: ${(props) => props.theme.palette.colors.primary};
  border-bottom: ${(props) =>
    !props.last && `1px solid ${props.theme.palette.bg.secondary}`};
  svg {
    margin-right: 0.8rem;
    font-size: 1.2rem;
  }
`;

export const BrandNav = ({ businessId }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: brandData } = useDatafetcher(
    `/ecommerce/brand/list?businessTypeId=${businessId}&size=999`,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
    }
  );
  return (
    <div
      style={{
        overflow: "auto",
        maxHeight: "500px",
        height: "500px",
      }}
    >
      {brandData?.content?.map((nav, i) => (
        <div
          key={i}
          // style={{ borderBottom: " 1px solid #CECECE" }}
        >
          <div
            className={cx(styles.mainLink, styles.navMenu)}
            key={i}
            onClick={() => {
              Router.push({
                pathname: `/brand/${nav.urlAlias}/${nav.id}`,
              });
              if (setOpenDrawer) dispatch(setOpenDrawer(false));
            }}
          >
            <p
              style={{
                display: "flex",
                alignItems: "center",
                color: "#3D3D3D",
                fontSize: "16px",
                fontWeight: router?.query?.id == nav?.id ? 400 : 300,
              }}
            >
              {/* <input
                type="checkbox"
                name="nav_checkbox"
                checked={router?.query?.id == nav?.id}
                id=""
                style={{ marginRight: "0.5rem" }}
              /> */}
              {/* {categoryIcons[i]?.src && <img src={categoryIcons[i]?.src} alt="" style={{ marginRight: "0.8rem" }} />} */}
              {nav.name}
              {/* {onListPage && nav?.subCategories?.length > 0 && (
                  <span>&nbsp;({nav?.subCategories?.length || 0})</span>
                )} */}
            </p>
            {/* <p
              style={{
                display: "flex",
                alignItems: "center",
                fontWeight: 400,
                // color: theme.palette.colors.primary,
                color: router?.query?.id == nav?.id ? "var(--accent)" : "var(--accent)",
                fontWeight: router?.query?.id == nav?.id ? 600 : 400,
              }}
            >
              {nav?.brandAttachmentMap?.["Brand Logo"]?.[0]?.url && (
                <img
                  src={nav?.brandAttachmentMap?.["Brand Logo"]?.[0]?.url}
                  alt=""
                  style={{ marginRight: "0.8rem", maxWidth: 20, maxHeight: 20 }}
                />
              )}
              {nav.name}
            </p> */}
          </div>
        </div>
      ))}
    </div>
  );
};
