import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { Badge, Drawer } from "@mui/material";
import { FiMenu, FiPhoneCall } from "react-icons/fi";
import { MdOutlineMail } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { RiShoppingBag4Line } from "react-icons/ri";
import { FaChevronDown } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";

import SearchHeader from "../Search/Search";
import AccountDropDown from "../Header/DropDown/AccountDropDown";
import NavDrawer from "../Navigation/NavDrawer/NavDrawer";
import { useDatafetcher } from "../../utilities/hooks/useDatafetcher";
import { setOpenDrawer } from "../../store/home";
import { toggleOpenDrawer } from "../../store/cart";
import { setAlert } from "../../AsyncFunctions/alert";
import navStyles from "../Navigation/NavDrawer/mobile.module.scss";

/* ------------------------------------------------------------------ */
/*  Top bar                                                            */
/* ------------------------------------------------------------------ */
export const TopBar = () => {
  return (
    <div className="rd-topbar">
      <div className="rd-wrap">
        <div className="rd-topbar-left">
          <a href="tel:+13178039060">
            <FiPhoneCall size={13} /> +1 (317) 803-9060
          </a>
          <a href="mailto:sales@mbwholesalellc.com">
            <MdOutlineMail size={14} /> sales@mbwholesalellc.com
          </a>
        </div>
        <div className="rd-topbar-right">
          <Link href="/promo">Promo</Link>
          <Link href="/track-order">Track Order</Link>
          <Link href="/contact-us">Contact Us</Link>
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Wordmark fallback logo                                             */
/* ------------------------------------------------------------------ */
export const Wordmark = ({ light }) => (
  <div className="rd-wordmark">
    MB<span>Wholesale</span>
    <small>CASH & CARRY</small>
  </div>
);

/* ------------------------------------------------------------------ */
/*  Header                                                             */
/* ------------------------------------------------------------------ */
export const SiteHeader = ({ businessId }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [showDropDown, setShowDropDown] = useState(false);
  const { data: stores } = useDatafetcher("/store", true);
  const localCart = useSelector((state) => state.cart.localCartData);
  const cartData = useSelector((state) => state.cart.cartData);
  const openDrawer = useSelector((state) => state.Home.openDrawer);
  const userDetails = useSelector((state) => state.auth.userDetails);

  const store = stores?.find((s) => s.masterStore) || stores?.[0];
  const logoUrl = store?.logoUrl;

  const cartCount = userDetails
    ? cartData?.totalCartQuantity || 0
    : localCart?.totalCartQuantity || 0;

  const handleCart = () => {
    if (userDetails) {
      dispatch(toggleOpenDrawer(true));
    } else {
      setAlert("warn", "login to view cart")(dispatch);
    }
  };

  return (
    <header className="rd-header">
      <div className="rd-wrap rd-header-row">
        <button
          className="rd-burger"
          aria-label="Open menu"
          onClick={() => dispatch(setOpenDrawer(true))}
        >
          <FiMenu size={22} />
        </button>
        <Drawer
          open={openDrawer}
          onClose={() => dispatch(setOpenDrawer(false))}
        >
          <div className={navStyles.drawerContainer}>
            <NavDrawer businessId={businessId} />
          </div>
        </Drawer>

        <Link href="/">
          <a className="rd-logo" aria-label="MB Wholesale home">
            {logoUrl ? <img src={logoUrl} alt="MB Wholesale" /> : <Wordmark />}
          </a>
        </Link>

        <div className="rd-search desktop">
          <SearchHeader businessId={businessId} />
        </div>

        <div className="rd-actions">
          {userDetails ? (
            <div
              className="rd-action"
              onMouseEnter={() => setShowDropDown(true)}
              onMouseLeave={() => setShowDropDown(false)}
            >
              <span className="rd-action-icon">
                <AiOutlineUser size={21} />
              </span>
              <span className="rd-action-text">
                <small>Hello,</small>
                <b>{userDetails?.customerDto?.firstName}</b>
              </span>
              {showDropDown && <AccountDropDown />}
            </div>
          ) : (
            <Link href="/account/login">
              <a className="rd-action">
                <span className="rd-action-icon">
                  <AiOutlineUser size={21} />
                </span>
                <span className="rd-action-text">
                  <small>Account</small>
                  <b>Login / Register</b>
                </span>
              </a>
            </Link>
          )}

          <button className="rd-action" onClick={handleCart} aria-label="Cart">
            <span className="rd-action-icon">
              <Badge
                badgeContent={cartCount}
                showZero
                sx={{
                  "& .MuiBadge-badge": {
                    backgroundColor: "#f59e0b",
                    color: "#241303",
                    fontWeight: 600,
                  },
                }}
              >
                <RiShoppingBag4Line size={21} />
              </Badge>
            </span>
            <span className="rd-action-text">
              <small>Your</small>
              <b>Cart</b>
            </span>
          </button>
        </div>
      </div>

      <div className="rd-mobile-search">
        <SearchHeader businessId={businessId} />
      </div>
    </header>
  );
};

/* ------------------------------------------------------------------ */
/*  Navigation                                                         */
/* ------------------------------------------------------------------ */
export const SiteNav = ({ businessId }) => {
  const { data: navData } = useDatafetcher(
    `/menu?businessTypeId=${businessId}`,
    true
  );
  const { query } = useRouter();
  const [, setTick] = useState(0);

  useEffect(() => {
    setTick((t) => t + 1);
  }, [query]);

  const cats = (navData || []).filter((c) => !c.deleted);
  const MAX_VISIBLE = 6;
  const visible = cats.slice(0, MAX_VISIBLE);
  const overflow = cats.slice(MAX_VISIBLE);

  const renderItem = (nav) => {
    const subs = nav.subCategories || [];
    const hasSubs = subs.length > 0;
    return (
      <div className="rd-nav-item" key={nav.id}>
        {hasSubs ? (
          <button type="button">
            {nav.name?.toLowerCase()} <FaChevronDown size={10} />
          </button>
        ) : (
          <Link href={`/products/${nav.alias}/${nav.id}`}>
            <a>{nav.name?.toLowerCase()}</a>
          </Link>
        )}

        {hasSubs && (
          <div className="rd-drop">
            <div className="rd-drop-col">
              <h5>
                <Link href={`/products/${nav.alias}/${nav.id}`}>
                  <a>{`Shop all ${nav.name}`}</a>
                </Link>
              </h5>
            </div>
            {subs.map((sub) => (
              <div className="rd-drop-col" key={sub.id}>
                <h5>
                  <Link href={`/products/${sub.alias}/${sub.id}`}>
                    <a>{sub.name}</a>
                  </Link>
                </h5>
                {(sub.subCategories || []).map((leaf) => (
                  <Link key={leaf.id} href={`/products/${leaf.alias}/${leaf.id}`}>
                    <a>{leaf.name}</a>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <nav className="rd-nav">
      <div className="rd-wrap rd-nav-row">
        <div className="rd-nav-item">
          <Link href="/">Home</Link>
        </div>

        {visible.map(renderItem)}

        {overflow.length > 0 && (
          <div className="rd-nav-item">
            <button type="button">
              more departments <FaChevronDown size={10} />
            </button>
            <div className="rd-drop rd-drop-mega">
              {overflow.map((nav) => (
                <div className="rd-drop-col" key={nav.id}>
                  <h5>
                    <Link href={`/products/${nav.alias}/${nav.id}`}>
                      <a>{nav.name}</a>
                    </Link>
                  </h5>
                  {(nav.subCategories || []).map((sub) => (
                    <Link key={sub.id} href={`/products/${sub.alias}/${sub.id}`}>
                      <a>{sub.name}</a>
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="rd-nav-item highlight">
          <Link href="/new-arrival">New Arrivals</Link>
        </div>
      </div>
    </nav>
  );
};
