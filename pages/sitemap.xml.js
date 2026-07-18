import fs from "fs";
import { flatMap, omit } from "lodash";
import { paramCase } from "param-case";
import path from "path";

const siteUrl = process.env.DOMAIN_BASE_URL ?? "";
const apiUrl = process.env.PROXY_API_BASE_URL ?? "";

const generateSitemapXml = (pages) => {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  pages.forEach((page) => {
    xml += `
      <url>
        <loc>${page}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>`;
  });

  xml += "</urlset>";
  return xml;
};

const baseUrls = [
  siteUrl, // Replace with your actual domain
];

export const getServerSideProps = async ({ res }) => {
  // Include static routes
  const staticPages = [
    // "/",
    // "/about",
    // Add more static routes here
  ];

  // Include API routes
  let apiPages = [];

  // Fetch pages from an API
  try {
    const categoryApiResponse = await fetch(`${apiUrl}/menu?businessTypeId=1`);
    if (categoryApiResponse?.ok) {
      const apiData = await categoryApiResponse?.json();
      apiPages.push(
        ...(flattenNested(apiData?.result ?? [], "subCategories")?.map(
          (data) => `${siteUrl}/products/${paramCase(data?.alias ?? data?.name ?? "")}/${data?.id}`
        ) ?? [])
      );
    }
  } catch (error) {}

  try {
    const productApiResponse = await fetch(`${apiUrl}/ecommerce/product/allMasterProduct?storeId=2`);
    if (productApiResponse?.ok) {
      const apiData = await productApiResponse?.json();
      apiPages.push(
        ...((apiData?.result ?? [])?.map(
          (data) => `${siteUrl}/product-details/${paramCase(data?.urlAlias ?? data?.name ?? "")}?id=${data?.id}`
        ) ?? [])
      );
    }
  } catch (error) {}

  const allPages = [
    ...baseUrls,
    ...staticPages,
    ...apiPages,
    // ...getPagesInDirectory(path.join(process.cwd(), "pages")),
  ];

  const sitemapXml = generateSitemapXml(allPages);

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemapXml);
  res.end();

  return {
    props: {},
  };
};

const Sitemap = () => null;

export default Sitemap;

const getPagesInDirectory = (directory, subfolderPath = "") => {
  const files = fs.readdir(directory);
  const pages = files.flatMap((file) => {
    const filePath = path.join(directory, file);
    const isDirectory = fs.stat(filePath).isDirectory();
    if (isDirectory) {
      return getPagesInDirectory(filePath, `${subfolderPath}${file}/`);
    }
    const route = file.replace(/\.(js|jsx)$/, "");
    // if (route.startsWith("_")) {
    //   return [];
    // }
    // if (/\[.*\]/.test(route)) {
    //   return []; // Exclude dynamic routes
    // }
    return [`${baseUrls}/${subfolderPath}${route}`];
  });
  return pages;
};

const flattenNested = (data, key) => {
  return flatMap(data, (item) => {
    if (item[key]) {
      return [omit(item, key), ...flattenNested(item[key], key)];
    }
    return item;
  });
};
