import { useMemo } from "react";
import { useSelector } from "react-redux";
import useSWR from "swr";
import instance from "../../service/axios";

const fetcher = (url) => instance.get(url).then((res) => res.data);

export const useDatafetcher = (URL, fetch, options) => {
  const token = useSelector((state) => state.auth.tokens)?.token;
  const userDetails = useSelector((state) => state.auth.userDetails);

  const stateId =
    options?.stateId &&
    userDetails?.customerDto?.customerStoreAddressList?.find(
      (address, index) => address?.active === true || index === 0
    )?.stateId;

  const config = useMemo(
    () => ({
      headers: token && {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }),
    [token]
  );

  const modifyUrl =
    URL && stateId ? (URL?.includes("?") ? URL + `&stateId=${stateId}` : URL + `?stateId=${stateId}`) : URL;

  const { data, error } = useSWR([modifyUrl, config], {
    revalidateOnFocus: false,
    // revalidateIfStale: false,
    // revalidateOnReconnect: false,
  });

  return {
    data: data?.result,
    error,
    loading: !data && !error,
  };
};

export const usePrefetch = (URL, ...args) => {
  const data = useSWR(URL, fetcher(URL), args);
  return {
    data: data?.result,
    // error,
    // loading: !data && !error,
  };
};
