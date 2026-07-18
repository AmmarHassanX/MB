export function addProductJsonLd(product) {
  const masterProductDetails = product?.masterProductDetails;
  const data = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: masterProductDetails?.productName,
    image: product?.productImageList,
    description: masterProductDetails?.fullDescription,
    sku: masterProductDetails?.sku,
    mpn: masterProductDetails?.upc,
    brand: {
      "@type": "Brand",
      name: masterProductDetails?.brandName,
    },
    url: `${process.env.DOMAIN_BASE_URL}${product?.pageUrl}`,
    // review: {
    //   "@type": "Review",
    //   reviewRating: {
    //     "@type": "Rating",
    //     ratingValue: "5",
    //     bestRating: "5",
    //   },
    //   author: {
    //     "@type": "Person",
    //     name: "Admin",
    //   },
    // },
    // aggregateRating: {
    //   "@type": "AggregateRating",
    //   ratingValue: "4.9",
    //   reviewCount: "99",
    // },
    offers: {
      "@type": "Offer",
      url: `${process.env.DOMAIN_BASE_URL}${product?.pageUrl}`,
      priceCurrency: "USD",
      price: masterProductDetails?.standardPrice,
      priceValidUntil: "2025-11-20",
      itemCondition: "https://schema.org/NewCondition",
      availability: "https://schema.org/InStock",
    },
  };
  return data;
}

export function addCategoriesJsonLd(product) {
  const data = {
    "@context": "https://schema.org/",
    "@type": "Categories",
    name: product?.name,
    image: product?.imageUrl,
    // description: masterProductDetails?.fullDescription,
    // sku: masterProductDetails?.sku,
    // mpn: masterProductDetails?.upc,
    // brand: {
    //   "@type": "Brand",
    //   name: product?.brandName,
    // },
    url: `${process.env.DOMAIN_BASE_URL}${product?.pageUrl}`,
    // review: {
    //   "@type": "Review",
    //   reviewRating: {
    //     "@type": "Rating",
    //     ratingValue: "5",
    //     bestRating: "5",
    //   },
    //   author: {
    //     "@type": "Person",
    //     name: "Admin",
    //   },
    // },
    // aggregateRating: {
    //   "@type": "AggregateRating",
    //   ratingValue: "4.9",
    //   reviewCount: "99",
    // },
    offers: {
      "@type": "Offer",
      url: `${process.env.DOMAIN_BASE_URL}${product?.pageUrl}`,
      // priceCurrency: "USD",
      // price: masterProductDetails?.standardPrice,
      // priceValidUntil: "2025-11-20",
      itemCondition: "https://schema.org/NewCondition",
      availability: "https://schema.org/InStock",
    },
  };
  return data;
}

export function addBreadcrumbListJsonLd(data) {
  let routeString = data?.pageUrl?.slice(1)?.split("?")[0]?.replace(/\/$/, "");
  const routeStringMap =
    routeString?.split("?")[0]?.replace(/\/$/, "")?.split("/") || [];
  let itemLink = "";
  const result = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@id": process.env.DOMAIN_BASE_URL,
          name: "Home",
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@id": process.env.DOMAIN_BASE_URL,
          name: data?.name,
          item: `${process.env.DOMAIN_BASE_URL}${data?.pageUrl}`,
        },
      },
      // ...routeStringMap?.map((item, i) => {
      //   itemLink = itemLink + "/" + item;
      //   return {
      //     "@type": "ListItem",
      //     position: 2 + i,
      //     name: upperCase(item?.split("-")?.join(" ")?.split("?")[0]?.replace(/\/$/, "")),
      //     item: `${process.env.DOMAIN_BASE_URL}${itemLink}`,
      //   };
      // }),
    ],
  };
  return result;
}

export function addBreadcrumbListProductJsonLd(product) {
  const masterProductDetails = product?.masterProductDetails;

  const result = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@id": process.env.DOMAIN_BASE_URL,
          name: "Home",
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          // "@id": `${process.env.DOMAIN_BASE_URL}${product?.pageUrl}`,
          "@id": `${process.env.DOMAIN_BASE_URL}/${"product-details"}`,
          name: "Products",
        },
      },
      {
        "@type": "ListItem",
        position: 3,
        item: {
          "@id": `${process.env.DOMAIN_BASE_URL}${product?.pageUrl}`,
          name: masterProductDetails?.productName,
        },
      },
    ],
  };
  return result;
}

export const jsonStringify = (value) => {
  if (!value) {
    return value;
  }
  return JSON.stringify(value);
};

export const jsonParse = (value) => {
  if (!value) {
    return value;
  }
  return JSON.parse(value);
};

export function getRandomColor() {
  const colors = [
    "#F1F2FF",
    "#E7FFEE",
    "#FFF0EA",
    "#FFFAEA",
    "#E1EDEC",
    "#EBF7FF",
  ];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}
