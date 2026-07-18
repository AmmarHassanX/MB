import { Skeleton } from "@mui/material";
import { ProductsGrid } from "../../product-list/style";

////////////////////////////////////////////////////////////////

import { ImageBox, ProductCard } from "../productCard.style";

const ProductCardSkeleton = () => {
  return (
    <ProductsGrid>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
        <ProductCard className="product-card" key={i}>
          <ImageBox>
            <Skeleton
              animation="wave"
              variant="rectangular"
              style={{ height: "200px", width: "100%", borderRadius: "5px" }}
            />
          </ImageBox>
          <div style={{ margin: "0 0.5rem", borderRadius: "5px" }}>
            {/* <ProductName> */}
            <Skeleton
              animation="wave"
              variant="rectangular"
              height={40}
              style={{
                width: "100%",
                marginTop: "0.5rem",
                borderRadius: "5px",
              }}
            />
            {/* </ProductName> */}
            {/* <ProductName> */}
            <Skeleton
              animation="wave"
              variant="rectangular"
              height={40}
              style={{
                width: "100%",
                marginTop: "0.5rem",
                borderRadius: "5px",
              }}
            />
            {/* </ProductName> */}
            {/* <span className="title">
              <Skeleton
                animation="wave"
                variant="text"
                height={30}
                width={140}
                // style={{ width: "180%" }}
              />
            </span> */}
            {/* <ProductName>
              <Skeleton
                animation="wave"
                variant="rectangular"
                height={160}
                style={{ width: "5.65rem", marginTop: "1em" }}
              />
            </ProductName>
            <ProductName>
              <Skeleton
                animation="wave"
                variant="rectangular"
                height={160}
                style={{ width: "15.65rem", marginTop: "1em" }}
              />
            </ProductName> */}
          </div>
        </ProductCard>
      ))}
    </ProductsGrid>
  );
};

export default ProductCardSkeleton;
