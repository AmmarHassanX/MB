import React, { useState, useRef, useLayoutEffect } from "react";
import Link from "next/link";
////////////////////////////////////////////////////////////////
import styles from "./style.module.scss";
import styled from "styled-components";
import { FaChevronDown } from "react-icons/fa6";
import { Box, Popper } from "@mui/material";

const Overlay = styled.div``;

const NavBody = ({ data, id, setshow }) => {
  let list = data.subCategories;
  const [horMenu, setHorMenu] = useState(true);
  const menuBody = useRef(null);
  const [anchorEl, setAnchorEl] = useState();
  const [showNavData, setShowNavData] = useState(-1);

  const open = Boolean(anchorEl);
  const popOverId = open ? "simple-popper " + Math.random() : undefined;

  useLayoutEffect(() => {
    const filter = list?.find((v) => v?.subCategories.length > 0);
    if (Boolean(filter)) {
      // setHorMenu(true);
      setHorMenu(false);
    } else {
      setHorMenu(false);
    }
  }, []);
  if (horMenu) {
    return (
      // <Overlay
      //   className={styles.menuBody + " " + `class-overlay-${id}`}
      //   ref={menuBody}
      //   lengthSubCat={list.length}
      //   pId={`overlay-${id}`}
      //   id={`id-overlay-${id}`}
      //   style={{ width: "100%" }}
      // >
      <div className={styles.horzMenu} onClick={(e) => e.stopPropagation()}>
        {list?.map((cat, i) => (
          <div key={i} className={styles.col}>
            <Link
              href={{
                pathname: `/products/${cat.alias}/${cat.id}`,
              }}
            >
              <a
                className={styles.headerLink}
                onClick={() => {
                  // dispatch(setActiveProductId(cat?.id));

                  setshow(-1);
                }}
              >
                {cat.name}{" "}
              </a>
            </Link>
            <div className={styles.subCat}>
              {cat?.subCategories?.map((sub, i) => (
                <Link
                  href={{
                    pathname: `/products/${sub.alias}/${sub.id}`,
                  }}
                  key={i}
                >
                  <a
                    onClick={() => {
                      // dispatch(setActiveProductId(sub?.id));
                      setshow(-1);
                    }}
                  >
                    {sub.name}
                  </a>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      // </Overlay>
    );
  } else {
    return (
      // <Overlay className={styles.menuBody}>
      <div className={styles.verticalMenuContainer}>
        <div className={styles.verticalMenu}>
          {list?.map((li, i) => (
            <Link
              href={{
                pathname: `/products/${li.alias}/${li.id}`,
              }}
              key={i}
            >
              <a
                aria-describedby={popOverId}
                onClick={() => {
                  // dispatch(setActiveProductId(li?.id));
                  setshow(-1);
                }}
                onMouseEnter={(event) => {
                  if (li?.subCategories?.length) {
                    setAnchorEl(event.currentTarget);
                    setShowNavData(li?.id);
                  }
                }}
                onMouseLeave={() => {
                  setAnchorEl(null);
                  setShowNavData(-1);
                }}
                style={{ display: "flex", alignItems: "center" }}
              >
                <span>{li.name}</span>
                {li?.subCategories?.length > 0 && (
                  <FaChevronDown
                    style={{
                      transition: ".5s",
                      margin: "0 0 0 .4rem",
                      transform: "rotate(270deg)",
                    }}
                  />
                )}
                <Popper
                  id={popOverId}
                  open={anchorEl && showNavData === li?.id}
                  anchorEl={anchorEl}
                  placement="right-start"
                  style={{ zIndex: 99999 }}
                >
                  <Box
                    sx={{
                      // p: 1,
                      bgcolor: "background.paper",
                      overflow: "auto",
                    }}
                    className={styles.navBoxContainer}
                    style={{ margin: 0 }}
                  >
                    <div className={styles.subCat}>
                      {li?.subCategories?.map((sub, i) => (
                        <Link
                          href={{
                            pathname: `/products/${sub.alias}/${sub.id}`,
                          }}
                          key={i}
                        >
                          <a
                            onClick={() => {
                              // dispatch(setActiveProductId(sub?.id));
                              setshow(-1);
                            }}
                          >
                            {sub.name}
                          </a>
                        </Link>
                      ))}
                    </div>
                  </Box>
                </Popper>
              </a>
            </Link>
          ))}
        </div>
      </div>
      // </Overlay>
    );
  }
};

export default NavBody;
