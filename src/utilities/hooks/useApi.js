import useSWR from "swr";
const useDatafetcher = (URL, ...args) => {
  const { data, error } = useSWR(URL);
  return {
    data,
    error,
    loading: !data && !error,
  };
};
export default useDatafetcher;
