import { paramCase } from "param-case";
import React from "react";
import { StaticPageList } from "@salesgenterp/ui-components";

const Component = () => {
  return (
    <div>
      <StaticPageList
        apiEndPoint={process.env.API_BASE_URL}
        itemLink={(item) => {
          return `/${paramCase(item?.urlAlias || item?.title || item?.header)}?id=${item?.id}`;
        }}
      />
    </div>
  );
};

export default Component;
