import Link from "next/link";
import React, { useMemo } from "react";
import { paramCase } from "param-case";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useDatafetcher } from "../../../utilities/hooks/useDatafetcher";
import { useDebounce } from "../../../utilities/hooks/useDebounce";

/*
  SearchDropDown — products only (the separate "Categories" column has been
  removed per request). Results are re-ranked client-side so the closest
  matches to what was typed rise to the top:
    1. Product name starts with the query
    2. Product name contains the query as a whole word
    3. Everything else the API returned, in its original order
  This can't replace a real search engine's ranking model, but it fixes the
  most common annoyance — typing "red bull" and getting an unrelated
  product before the one that obviously matches.
*/

const rank = (name = "", query = "") => {
  const n = name.toLowerCase();
  const q = query.trim().toLowerCase();
  if (!q) return 2;
  if (n.startsWith(q)) return 0;
  if (new RegExp(`\\b${q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`).test(n)) return 1;
  return 2;
};

const highlight = (name = "", query = "") => {
  const q = query.trim();
  if (!q) return name;
  const i = name.toLowerCase().indexOf(q.toLowerCase());
  if (i === -1) return name;
  return (
    <>
      {name.slice(0, i)}
      <mark>{name.slice(i, i + q.length)}</mark>
      {name.slice(i + q.length)}
    </>
  );
};

const SearchDropDown = ({ searchData }) => {
  const userDetails = useSelector((state) => state.auth.userDetails);

  const { data: fetchData, error } = useDatafetcher(
    `/ecommerce/product/searchByProductOrCategory?searchInput=${searchData}`,
    searchData.length > 1,
    { stateId: true }
  );
  const Debounce = useDebounce(searchData, 600);

  const products = useMemo(() => {
    const list = fetchData?.productCoreDtoList ?? [];
    return [...list].sort(
      (a, b) => rank(a.productName, searchData) - rank(b.productName, searchData)
    );
  }, [fetchData, searchData]);

  return (
    <Panel>
      {products.length > 0 ? (
        <ul className="results">
          {products.slice(0, 8).map((li) => (
            <li key={li.productId}>
              <Link
                href={{
                  pathname: `/product-details/${paramCase(li.alias ?? li.productName)}`,
                  query: { id: li.productId },
                }}
              >
                <a className="row">
                  <img
                    src={li?.imageUrl && li?.imageUrl !== "null" ? li.imageUrl : "/images/products/imgnotfound.png"}
                    alt=""
                  />
                  <span className="name">{highlight(li.productName, searchData)}</span>
                  {userDetails && <span className="price">${li.standardPrice}</span>}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="empty">
          {!Debounce ? "Searching…" : (
            <>No results for &ldquo;{searchData}&rdquo;</>
          )}
        </p>
      )}

      {fetchData?.productCoreDtoList?.length > 0 && (
        <Link href={{ pathname: `/all/search/${searchData}` }}>
          <a className="view-all">View all {fetchData?.totalCount} results →</a>
        </Link>
      )}

      {error && <p className="empty">Something went wrong — try again.</p>}
    </Panel>
  );
};

export default SearchDropDown;

const Panel = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  z-index: 40;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-card);
  padding: 0.5rem;
  max-height: 420px;
  overflow-y: auto;

  .results {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .row {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.6rem 0.6rem;
    border-radius: var(--radius-sm);
    color: var(--text);
    transition: background var(--dur-fast) ease;

    &:hover {
      background: var(--accent-soft);
    }

    img {
      width: 38px;
      height: 38px;
      object-fit: contain;
      border-radius: 4px;
      background: var(--surface-2);
      flex-shrink: 0;
    }

    .name {
      flex: 1;
      font-size: 0.88rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      mark {
        background: var(--accent-soft);
        color: var(--accent);
        border-radius: 2px;
      }
    }

    .price {
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--accent);
      flex-shrink: 0;
    }
  }

  .empty {
    padding: 1rem;
    text-align: center;
    color: var(--text-3);
    font-size: 0.85rem;
    margin: 0;
  }

  .view-all {
    display: block;
    text-align: center;
    padding: 0.65rem;
    margin-top: 0.25rem;
    border-top: 1px solid var(--border);
    color: var(--accent);
    font-size: 0.85rem;
    font-weight: 600;
  }
`;
