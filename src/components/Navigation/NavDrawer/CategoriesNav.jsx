import cx from "classnames";
import Router from "next/router";
import React, { useState } from "react";
import { AiOutlineRight } from "react-icons/ai";
import { useDispatch } from "react-redux";

////////////////////////////////////////////////////////////////
import { setOpenDrawer } from "../../../store/home";
import { useDatafetcher } from "../../../utilities/hooks/useDatafetcher";
import { ErrorMessage } from "../../../utilities/theme/components";
import { categoryIcons } from "../Navigation";
import Level1 from "./Level1";
import styles from "./mobile.module.scss";

const CatergoiesNav = ({ onListPage, businessId }) => {
  const { data: navData, error } = useDatafetcher(
    `/menu?businessTypeId=${businessId}`,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
    },
    { stateId: true }
  );
  const dispatch = useDispatch();

  const [dropId, setDropId] = useState([-1]);

  const handleClick = (product) => {
    Router.push({
      pathname: `/products/${product.alias}/${product.id}`,
    });
    if (setOpenDrawer) dispatch(setOpenDrawer(false));
  };

  const OpenNav = (link) => {
    if (dropId.includes(link)) {
      let newList = dropId.filter((nav) => nav !== link);
      setDropId(newList);
    } else {
      setDropId([...dropId, link]);
    }
  };
  return (
    <>
      {error && <ErrorMessage>something went wrong</ErrorMessage>}
      {/* {!onListPage && (
        <div className={styles.closeBar}>
          <p
            onClick={() => {
              dispatch(setOpenDrawer(false));
            }}
          >
            close <AiOutlineClose className={styles.icon} />
          </p>
        </div>
      )} */}
      {navData?.map((nav, i) => (
        <div key={i} style={{ borderBottom: " 1px solid #CECECE" }}>
          <div
            className={cx(styles.mainLink, styles.navMenu)}
            key={i}
            onClick={() => {
              if (nav?.subCategories?.length > 0) {
                OpenNav(nav.id);
              } else {
                handleClick(nav);
              }
            }}
          >
            <p style={{ display: "flex", alignItems: "center" }}>
              {categoryIcons[i]?.src && (
                <img
                  src={categoryIcons[i]?.src}
                  alt=""
                  style={{ marginRight: "0.8rem" }}
                />
              )}
              {nav.name}
              {onListPage && (
                <span>&nbsp;({nav?.subCategories?.length || 0})</span>
              )}
            </p>
            {nav?.subCategories?.length > 0 && !onListPage && (
              <>
                {dropId.includes(nav.id) ? (
                  <AiOutlineRight
                    className={styles.icondown}
                    style={{ transform: "rotate(-90deg)" }}
                  />
                ) : (
                  <AiOutlineRight className={styles.icondown} />
                )}
              </>
            )}
          </div>
          {dropId.includes(nav.id) && (
            <Level1
              data={nav.subCategories}
              h2={true}
              onListPage={onListPage}
              dropId={dropId}
              setDropId={setDropId}
            />
          )}
        </div>
      ))}
    </>
  );
};

export default CatergoiesNav;
