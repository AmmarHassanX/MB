import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { orderBy } from "lodash";
import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import VariantsCardRow from "./VariatnRow";

const variantsContainer = styled.div`
  width: 100%;
  color: var(--text);
  margin: 0em 0;

  ::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 5px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 14px;
    background-color: var(--accent);
    box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
  }

  h6 {
    font-size: 20px;
    font-weight: 700;
    line-height: 95.9%;
    letter-spacing: 1px;
    color: #2e3192;
    text-transform: capitalize;
    @media only screen and (max-width: 768px) {
      font-size: 14px;
    }
  }
  p {
    font-size: 0.94rem;
    font-weight: 400;
  }
  .red {
    color: red;
    text-transform: capitalize;
  }
`;

const TableBox = styled(Table)`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 10px;

  @media only screen and (max-width: 695px) {
    min-width: 95%;
  }

  .MuiTableCell-root {
    padding: 10px;
    border: none;
    @media only screen and (max-width: 768px) {
      padding: 8px;
    }

    &:first-child {
      border-left: 1px solid var(--border);
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }

    &:last-child {
      border-right: 1px solid var(--border);
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }
  }
`;

const StyledTableHeadCell = styled(TableCell)`
  background: #f8f8f8 !important;
  font-weight: 500 !important;
  border: none !important;
  color: var(--accent) !important;
  font-size: 1rem !important;
`;

const StyledTableBody = styled(TableBody)`
  tr {
    background: var(--surface);
    border-radius: 6px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    transition: all 0.2s ease;

    &:hover {
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    }
  }
`;

const VariantsTable = ({
  content,
  productsList,
  setProductsList,
  reset,
  headers,
}) => {
  const userDetails = useSelector((state) => state.auth.userDetails);

  return (
    <TableContainer component={variantsContainer}>
      <TableBox aria-label="a dense table" stickyHeader>
        <TableHead>
          <TableRow
            sx={{
              "& .MuiTableCell-root": {
                height: 54,
              },
            }}
          >
            <StyledTableHeadCell align="left">Image</StyledTableHeadCell>
            {headers
              ?.sort()
              ?.reverse()
              ?.map((name, i) => (
                <StyledTableHeadCell key={i} align="left">
                  {name?.toLowerCase()}
                </StyledTableHeadCell>
              ))}
            <StyledTableHeadCell align="left">Stock</StyledTableHeadCell>
            <StyledTableHeadCell align="left">Quantity</StyledTableHeadCell>
            <StyledTableHeadCell align="left">Price</StyledTableHeadCell>
          </TableRow>
        </TableHead>
        <StyledTableBody>
          {orderBy(content)?.map((item, i) => (
            <VariantsCardRow
              reset={reset}
              productsList={productsList}
              item={item}
              key={i}
              index={i}
              setProductsList={setProductsList}
              headers={headers}
            />
          ))}
        </StyledTableBody>
      </TableBox>
    </TableContainer>
  );
};

export default VariantsTable;
