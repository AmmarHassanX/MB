import instance from "./axios";
import useSWR from "swr";

export const fetcher = async (URL, ...args) => {
  return instance.get(URL, ...args).then((res) => res.data);
};
