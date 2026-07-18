import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Image from "next/image";
import React from "react";

const useStyles = makeStyles({
  root: {
    position: "relative",
    marginTop: 12,
    "& > span": {
      width: "100%!important",
    },
  },
  bg: {
    backgroundColor: "var(--surface)",
  },
  img: {
    // height: "256px",

    objectFit: "contain",
  },
  inner: {
    position: "absolute",
    left: 20,
    bottom: 30,
  },
  innerFirst: {
    position: "absolute",
    left: 20,
    top: 30,
  },
  h4: {
    color: "#fff",
    fontSize: "25px",
  },
  h5: {
    color: "#fff",
    fontSize: "22px",
  },
  btn: {
    borderColor: "#fff",
    color: "#fff",
    borderRadius: 0,
    marginTop: 8,
    height: 33,
  },
});

const data = ["qq 1", "qq 2", "qq 3", "qq 4"];
const LandingGallery = ({ secondarySlider }) => {
  const classes = useStyles();
  return (
    <Box className={classes.bg}>
      <Container>
        <Grid container spacing={2}>
          {data.map((img, i) => (
            <Grid item xs={12} sm={6} md={3} lg={3} key={i}>
              <Box className={classes.root}>
                <Image
                  className={classes.img}
                  src={`/images/home/features/${img}.png`}
                  placeholder="blur"
                  blurDataURL={`/images/home/features/${img}.png`}
                  height="256px"
                  width="100%"
                  alt="landing-img"
                />
                <Box className={i === 0 ? classes.innerFirst : classes.inner}>
                  <Typography
                    variant="h5"
                    className={classes.h5}
                    fontFamily="Poppins"
                    fontWeight={500}
                  >
                    FLAVORED
                  </Typography>
                  <Typography
                    variant="h4"
                    fontWeight={700}
                    className={classes.h4}
                    fontFamily="Poppins"
                  >
                    FREEBASE JUICE
                  </Typography>
                  <Button variant="outlined" className={classes.btn}>
                    SHOP NOW
                  </Button>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default LandingGallery;
