import Image from "next/image";
import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { AiOutlinePlus } from "react-icons/ai";

////////////////////////////////////////////////////////////////
import {
  BottomBtns,
  ImageBox,
  ProductCardContainer,
  ProductCardSkeleton,
  ProductPrice,
  Tagbox,
} from "../productCard/productCard.style";
import { productsData } from "./product-list.data";
import { ProductsGrid } from "./style";
import { Skeleton } from "@mui/material";

const blur = keyframes`
from {
  filter:blur(30px);
} 
to {
  filter:blur(10px);
}
`;
// const ProductCard = styled(ProductCardContainer)`
//   backdrop-filter: blur(30px);
//   /* background: white; */
//   /* justify-content: flex-start;
//   align-items: flex-start; */
//   animation: ${blur} 4s linear infinite;
// `;
const ProductsLoader = ({ number }) => {
  const [products, setProducts] = useState([]);
  let count = number || 5;

  let productsArray = [];
  productsData.map((product, i) => {
    if (i < count) {
      productsArray.push(product);
    }
  });

  return (
    <ProductsGrid>
      {productsArray.map((product, i) => (
        <ProductCardSkeleton background={product.bgImage} key={i}>
          <ImageBox>
            <Image
              src={product.imageUrl || "/images/products/imgnotfound.png"}
              alt={product.productName}
              layout="fill"
              blurDataURL="/images/products/imgnotfound.png"
              placeholder="blur"
            />
          </ImageBox>
          <Tagbox> product Name </Tagbox>
          <ProductPrice>
            <p> $$$.00</p>
          </ProductPrice>
          <BottomBtns>
            <AiOutlinePlus />
            <p>learn more</p>
          </BottomBtns>
        </ProductCardSkeleton>
      ))}
    </ProductsGrid>
  );
};

export default ProductsLoader;
