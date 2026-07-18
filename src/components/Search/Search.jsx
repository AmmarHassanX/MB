import React, { useState } from "react";

////////////////////////////////////////////////////////////////
import { Button, Drawer } from "@mui/material";
import { useRouter } from "next/router";
import { FiSearch } from "react-icons/fi";
import { useDebounce } from "../../utilities/hooks/useDebounce";
import { SearchBox, SearchContainer } from "./SearchBox.style";
import SearchDropDown from "./SearchDropDown/SearchDropDown";
import { BiSearchAlt } from "react-icons/bi";
import { IoSearchOutline } from "react-icons/io5";
import { RiSearch2Line } from "react-icons/ri";
import { VscSettings } from "react-icons/vsc";
import { CiMenuFries } from "react-icons/ci";
import NavDrawer from "../Navigation/NavDrawer/NavDrawer";
import { useDispatch, useSelector } from "react-redux";
import { setOpenDrawer } from "../../store/home";

const SearchHeader = ({ businessId }) => {
  const [inputData, setInputData] = useState("");
  const [focus, setFocus] = useState(false);
  const Debounce = useDebounce(inputData, 500);
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <SearchContainer tabIndex="2">
      <SearchBox
        style={{
          // border: focus && `1px solid #1269C2`,
          paddingLeft: "23px",
        }}
      >
        <RiSearch2Line size={19} style={{ color: "var(--text)91" }} />
        <input
          style={
            {
              // borderRight: `1px solid #D9D9D9`,
            }
          }
          type="search"
          placeholder="Search Products...."
          id="searchInput"
          onChange={(e) => {
            setFocus(true);
            setInputData(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e?.keyCode === 13) {
              router.push(`/all/search/${e.target.value}`);
              setFocus(false);
              setInputData("");
            }
          }}
          value={inputData}
          onFocus={(e) => {
            setFocus(true);
          }}
          onBlur={(e) => {
            setTimeout(() => {
              setFocus(false);
              setInputData("");
            }, 600);
          }}
        />
        {/* <div
          style={{
            height: "23px",
            width: "1px",
            color: "#65B9F6",
            borderWidth: "1px",
            borderColor: "#65B9F6",
          }}
        ></div> */}
        {/* <Button
          sx={{
            backgroundColor: "transparent",
            padding: "2px",
            minWidth: 50,
          }}
          onClick={() => dispatch(setOpenDrawer(true))}
          variant="text"
        >
          <CiMenuFries size={19} style={{ color: "var(--text)91" }} />
        </Button> */}
      </SearchBox>
      {focus && inputData.length > 2 ? (
        <SearchDropDown searchData={Debounce} />
      ) : null}
    </SearchContainer>
  );
};

export default SearchHeader;
