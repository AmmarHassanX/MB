import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import {
  Box,
  Button,
  Divider,
  Popover,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { FaChevronDown } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { setPage } from "../../../store/products";
import CategoriesNav from "../../Navigation/NavDrawer/CategoriesNav";
import { SelectBox, SelectBoxMain } from "./FilterBar.style";
import theme from "../../../utilities/theme/theme";

const sortData = [
  {
    value: "1",
    sort: "default",
    order: "ASC",
  },
  {
    value: "2",
    sort: "date",
    order: "ASC",
  },
  {
    value: "3",
    sort: "date",
    order: "DESC",
  },
  {
    value: "4",
    sort: "name",
    order: "ASC",
  },
  {
    value: "5",
    sort: "name",
    order: "DESC",
  },
  {
    value: "6",
    sort: "price",
    order: "ASC",
  },
  {
    value: "7",
    sort: "price",
    order: "DESC",
  },
];
const FilterBar = ({
  setPageable,
  query,
  search,
  onDetails,
  page,
  total,
  businessId,
  length,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const [state, setState] = React.useState("1");
  ////////filter products
  const filterProducts = (value) => {
    // setInitial(false);
    dispatch(setPage(0));
    setPageable(true);
    let url = search
      ? `/all/search/${query?.id}`
      : `/products/${query?.product}/${query?.id}`;

    if (value === "1") {
      router.push({
        pathname: url,
      });
      return;
    } else if (value === "2") {
      router.push({
        pathname: url,
        query: { sort: "date", order: "ASC" },
      });
    } else if (value === "3") {
      router.push({
        pathname: url,
        query: { sort: "date", order: "DESC" },
      });
    } else if (value === "4") {
      router.push({
        pathname: url,
        query: { sort: "name", order: "ASC" },
      });
    } else if (value === "5") {
      router.push({
        pathname: url,
        query: { sort: "name", order: "DESC" },
      });
    } else if (value === "6") {
      router.push({
        pathname: url,
        query: { sort: "price", order: "ASC" },
      });
    } else if (value === "7") {
      router.push({
        pathname: url,
        query: { sort: "price", order: "DESC" },
      });
    }
  };
  React.useEffect(() => {
    const filtered = sortData.find(
      (v) => router?.query?.sort === v.sort && router?.query?.order === v.order
    );
    if (filtered) {
      setState(filtered.value);
    } else {
      setState("1");
    }
  }, [router.query]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: { xs: "column", sm: "row" },
        // mt: "13px",
        // margin: "0 1rem",
        padding: "0",
        // border: "1px solid rgba(0, 0, 0, 0.2)",
        // borderRadius: "15px",
        // background: "#F6F9F7",
      }}
    >
      <Typography
        fontFamily="Poppins"
        fontWeight={400}
        sx={{ fontSize: "22px", color: theme.palette.colors.primary }}
      >
        Showing {length} of {total} results
      </Typography>
      <Stack
        spacing={2}
        direction="row"
        alignItems="center"
        divider={<Divider orientation="vertical" flexItem />}
        sx={{
          hr: {
            display: { xs: "none", md: "none", xl: "block" },
          },
        }}
      >
        {!(onDetails || true) && (
          <SelectBoxMain>
            {/* <span>Sort:</span> */}
            {/* <ExpandMoreRoundedIcon
              className="icon"
              onClick={(e) => e.preventDefault()}
            /> */}
            <Box
              sx={{
                button: {
                  borderColor: "rgba(0, 0, 0, 0.2)",
                  borderRadius: "11px",
                  fontSize: "19px",
                  fontWeight: 400,
                  color: "#787878",
                  textTransform: "capitalize",
                  p: "4px 8px",
                  ml: 1,
                  maxWidth: "170px",
                  minWidth: "170px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  svg: {
                    color: "#515151",
                  },
                  ":hover": {
                    borderColor: "rgba(0, 0, 0, 0.2)",
                    bgcolor: "transparent",
                  },
                },
              }}
            >
              <Button
                aria-describedby={id}
                variant="outlined"
                onClick={handleClick}
                endIcon={<ExpandMoreRoundedIcon />}
              >
                categories
              </Button>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <Box p={1}>
                  <CategoriesNav businessId={businessId} />
                </Box>
              </Popover>
            </Box>
          </SelectBoxMain>
        )}
        {!onDetails && (
          <SelectBox>
            {/* <Divider
              orientation="vertical"
              flexItem
              sx={{ borderColor: "#374957", margin: "auto 1rem", height: "30px" }}
            /> */}
            {/* <span>Sort By:</span> */}
            {/* <span style={{ marginLeft: "1rem" }}>{" | "}</span> */}

            <select
              onChange={(e) => {
                setState(e.target.value);
                filterProducts(e.target.value);
              }}
              value={state}
            >
              <option tabIndex={0} value={"1"}>
                Default sorting
              </option>
              <option tabIndex={0} value={"3"}>
                Date(Oldest - Latest){" "}
              </option>
              <option tabIndex={0} value={"2"}>
                Date(Latest - Oldest){" "}
              </option>
              <option tabIndex={0} value={"4"}>
                Name(A - Z)
              </option>
              <option tabIndex={0} value={"5"}>
                Name(Z - A)
              </option>
              <option tabIndex={0} value={"6"}>
                price(low - high)
              </option>
              <option tabIndex={0} value={"7"}>
                price(high - low )
              </option>
            </select>
            <FaChevronDown
              className="icon"
              style={{ marginRight: "10px" }}
              onClick={(e) => e.preventDefault()}
            />
          </SelectBox>
        )}
      </Stack>
      {/* <Typography variant="h6" fontFamily="Poppins" fontWeight={400} sx={{ fontSize: "16px", color: "#787878" }}>
        Showing 1–{page * 12} of {total} item(S)
      </Typography> */}
    </Box>
  );
};

export default FilterBar;
