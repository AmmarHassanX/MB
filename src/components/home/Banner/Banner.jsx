import { useInView } from "framer-motion";
import React, { useRef } from "react";
//////
import { Box, Grid, useTheme } from "@mui/material";
import Link from "next/link";
import styled from "styled-components";
import { BannerContainer } from "./Banner.style";

const Banner = ({ data, lg, itemStyle }) => {
  const theme = useTheme();
  const ref1 = useRef();
  const ref2 = useRef();
  const InView1 = useInView(ref1, { amount: 0.7, once: true });
  const InView2 = useInView(ref2, { amount: 0.7, once: true });

  return (
    <BannerContainer>
      <Grid container spacing={1}>
        {data?.map((v, i) => (
          <Grid item xs={12} lg={lg || 12} key={i}>
            <Box style={{ overflow: "hidden" }}>
              <Link href={v?.redirectPath || ""} passHref>
                <Image
                  src={v?.imageUrl && v?.imageUrl !== "null" ? v?.imageUrl : "/images/products/imgnotfound.png"}
                  alt="image"
                  style={{ ...itemStyle }}
                />
              </Link>
            </Box>
          </Grid>
        ))}
      </Grid>
    </BannerContainer>
  );
};

export default Banner;

const Image = styled.img`
  width: 100%;
  height: auto;
  cursor: pointer;
  transition: all 0.5s;
  &:hover {
    transform: scale(1.05);
  }
`;
