import { Checkbox, FormControlLabel, Grid } from "@mui/material";
import { SingleBanner } from "@salesgenterp/ui-components";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import styled from "styled-components";
import { useDatafetcher } from "../../utilities/hooks/useDatafetcher";
import styles from "./popups.module.scss";

const OfferPopup = ({ show, setShow, businessId }) => {
  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter();
  const { data } = useDatafetcher(
    `/home/sliderImages?sliderType=popup-banner&businessTypeId=${
      businessId || 1
    }`,
    true
  );

  const handleChange = (e) => {
    setIsChecked(e.target.checked);
  };

  return (
    <>
      {data?.sliderImageList?.length > 0 ? (
        <div className={styles.container}>
          <div className={styles.modal}>
            <h2 style={{ color: "#ffffff" }}>MB Wholesale</h2>
            <AiOutlineClose
              onClick={() => {
                // show(false);
                isChecked && sessionStorage.setItem("DontShowPopups", "true");
                setShow(false);
              }}
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                fontSize: 18,
                cursor: "pointer",
                zIndex: 9999,
                color: "#ffffff",
              }}
            />
            <VideoContainer>
              {/* <iframe
            // width="796"
            // height="500"
            src="https://www.youtube.com/embed/xHGk_B48WXA?list=TLGGm5ZDZkklHswyNTEwMjAyMw&autoplay=1&controls=0&&showinfo=0&loop=1&mute=1"
            title="YOVO - New Flavors"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe> */}
              <div>
                <SingleBanner
                  sliderImages={data}
                  allowControls={true}
                  config={{ isSlider: true }}
                />
              </div>
            </VideoContainer>
            <Grid container justifyContent="center" spacing={3}>
              {data?.sliderImageList?.map((item, index) => {
                return (
                  <Grid key={index} item>
                    <button
                      onClick={() => {
                        isChecked &&
                          sessionStorage.setItem("DontShowPopups", "true");
                        router.push(item.redirectPath);
                        setShow(false);
                      }}
                    >
                      Click Here
                    </button>
                  </Grid>
                );
              })}
            </Grid>
            <FormControlLabel
              sx={{
                color: "#ffffff",
              }}
              control={
                <Checkbox
                  sx={{ color: "#ffffff" }}
                  checked={isChecked}
                  onChange={(e) => handleChange(e)}
                  color="error"
                />
              }
              label="DO NOT SHOW AGAIN"
            />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default OfferPopup;

const VideoContainer = styled.div`
  text-align: center;
  width: 100%;
  margin: auto;
  position: relative;
  // padding-bottom: 56.25%;
  /* 16:9 */
  // padding-top: 25px;
  // height: 100%;
  max-height: 80vh;
  // height: 0;
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    border: none;
    height: 100%;
  }
`;
