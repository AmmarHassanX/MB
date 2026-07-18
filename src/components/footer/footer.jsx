import { Box, Container, Grid, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

import { FaX, FaXTwitter } from "react-icons/fa6";
import { ImFacebook } from "react-icons/im";
import { IoLogoPinterest } from "react-icons/io";
import { LuInstagram } from "react-icons/lu";
import styled from "styled-components";
import theme from "../../utilities/theme/theme";
import {
  FooterCol,
  FooterLink,
  FooterLinksBox,
  FooterLinksCol,
} from "./footer.styles";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPinterest,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import { links1, links2, links3, links4, links6 } from "./footerData";
import Newsteller from "../home/Newsteller/Newsteller";
const InputBox = styled.form`
  width: 100%;
  height: 53px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background-color: white;
  border-radius: 11px;
  input {
    border-radius: 15px;
    width: 100%;
    height: 100%;
    padding: 0.2em 1em;
    font-size: 15px;
    color: black;
    font-weight: 300;
    border: none;
    outline: none;
    &:hover,
    &:focus {
      outline: none;
      border: none;
    }

    &::placeholder {
      font-size: 15px;
      color: var(--text);
    }
  }
  @media only screen and (max-width: 640px) {
    max-width: 90%;
  }
`;
const socialIcons = [
  // { icon: <FaFacebook size={21} color="#ffffff" />, name: "Facebook" },
  // { icon: <FaTwitter size={21} color="#ffffff" />, name: "Twitter" },
  // { icon: <FaPinterest size={21} color="#ffffff" />, name: "Pinterest" },
  // { icon: <FaLinkedin size={21} color="#ffffff" />, name: "LinkedIn" },
  { icon: <FaWhatsapp size={21} color="#ffffff" />, name: "WhatsApp" },
];
const ImgBox = styled(Box)({
  position: "relative",
});

const footer = ({ width }) => {
  return (
    <div style={{ backgroundColor: theme.palette.bg.footer }}>
      <Box
        sx={{
          ".MuiGrid-item": {
            pt: { lg: "1rem", md: "1rem", sm: "1rem", xs: "1rem" },
          },
        }}
        maxWidth={"1450px"}
        margin={"0 auto"}
        py={7}
      >
        <Container>
          {/* <FooterFeatures /> */}
          <Grid container spacing={2}>
            <Grid
              item
              lg={4}
              md={4}
              sm={12}
              xs={12}
              display={"flex"}
              flexDirection={"column"}
              alignItems={"start"}
              justifyContent={"start"}
            >
              <ImgBox>
                <img
                  src="/images/footer/logo.png"
                  alt="logo"
                  style={{
                    maxWidth: "200px",
                    width: "100%",
                    maxHeight: "91px",
                    height: "100%",
                  }}
                />
              </ImgBox>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "4px" }}
              >
                <div
                  style={{
                    fontSize: "16px",
                    color: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <div style={{ fontWeight: "500" }}>Office:</div>
                  <div style={{ fontWeight: "300" }}>
                    4935 W 38th St, Indianapolis, IN 46254
                  </div>
                </div>
                <div
                  style={{
                    fontSize: "16px",
                    color: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    cursor: "pointer",
                  }}
                >
                  <div style={{ fontWeight: "500" }}>Call:</div>
                  <Link href={"tel:+13178039060"}>
                    <div style={{ fontWeight: "300" }}>+1 (317) 803-9060</div>
                  </Link>
                </div>
                <div
                  style={{
                    fontSize: "16px",
                    color: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    cursor: "pointer",
                  }}
                >
                  <div style={{ fontWeight: "500" }}>Email:</div>
                  <Link href={"mailto:sales@mbwholesalellc.com"}>
                    <div style={{ fontWeight: "300" }}>
                      sales@mbwholesalellc
                    </div>
                  </Link>
                </div>
                <div
                  style={{
                    width: "54px",
                    height: "1px",
                    backgroundColor: "var(--surface)",
                    margin: "18px 0 13px 0",
                  }}
                ></div>
                <div
                  style={{
                    color: "#ffffff",
                    fontSize: "15px",
                    fontWeight: "300",
                  }}
                >
                  Monday - Saturday: 9.30 am to 8.00 pm
                </div>
                <div
                  style={{
                    color: "#ffffff",
                    fontSize: "15px",
                    fontWeight: "300",
                  }}
                >
                  Sunday: 10.30 am to 6.00 pm
                </div>
              </div>
            </Grid>
            <Grid item lg={8} md={8} sm={12} xs={12} marginTop={"1.5rem"}>
              <FooterLinksBox
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: "easeInOut" }}
              >
                <Grid container spacing={2}>
                  <Grid item lg={4} md={4} sm={12} xs={12}>
                    <FooterLinksCol align={width > 786 ? "start" : "start"}>
                      <FooterCol>
                        <h6>Quick Link</h6>
                        {links1.map((link, i) => (
                          <FooterLink margin="0" key={i} url={link.url}>
                            {link.alias}
                          </FooterLink>
                        ))}
                      </FooterCol>
                    </FooterLinksCol>
                  </Grid>
                  <Grid item lg={3} md={3} sm={12} xs={12}>
                    <FooterLinksCol align={width > 786 ? "start" : "start"}>
                      <FooterCol>
                        <h6>Account</h6>
                        {links2.map((link, i) => (
                          <FooterLink margin="0" key={i} url={link.url}>
                            {link.alias}
                          </FooterLink>
                        ))}
                      </FooterCol>
                    </FooterLinksCol>
                  </Grid>
                  <Grid item lg={5} md={5} sm={12} xs={12}>
                    <FooterLinksCol align={width > 786 ? "start" : "start"}>
                      <FooterCol>
                        <h6>Newsletter</h6>
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <div
                            style={{
                              whiteSpace: "wrap",
                              color: "#ffffff",
                              fontSize: "14px",
                              fontWeight: "300",
                            }}
                          >
                            Enjoy our newsletter to stay updated with the latest
                            news and special sales. Let&apos;s your email
                            address here!
                          </div>
                          <Newsteller />
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "0.5rem",
                              marginTop: "23px",
                            }}
                          >
                            {socialIcons.map((item, index) => (
                              <Link href="/#" key={index}>
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    padding: "0.3rem",
                                    cursor: "pointer",
                                  }}
                                  title={item.name}
                                >
                                  {item.icon}
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </FooterCol>
                    </FooterLinksCol>
                  </Grid>
                  {/* <Grid item lg={3} md={6} sm={12} xs={12}>
                    <FooterLinksCol align={width > 786 ? "start" : "start"}>
                      <FooterCol>
                        <h6>Let&apos;s Talk</h6>
                        {links4.map((link, i) => (
                          <FooterLink
                            margin="0"
                            key={i}
                            url={link.url}
                            icon={link?.icon}
                          >
                            {link.alias}
                          </FooterLink>
                        ))}
                        <h6 style={{ marginTop: "25px" }}>Find Us</h6>
                        {links6.map((link, i) => (
                          <FooterLink
                            margin="0"
                            key={i}
                            url={link.url}
                            icon={link?.icon}
                          >
                            {link.alias}
                          </FooterLink>
                        ))}
                      </FooterCol>
                    </FooterLinksCol>
                  </Grid> */}
                </Grid>
              </FooterLinksBox>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <div style={{ backgroundColor: "#0B3537" }}>
        <Box
          sx={{
            minHeight: "81px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            p: 2,
            maxWidth: "1450px",
            width: "100%",
            margin: "0 auto",
          }}
        >
          <Grid
            container
            spacing={2}
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Typography
                variant="body1"
                fontSize="15px"
                fontFamily={"Poppins"}
                fontWeight={300}
                color="#ffffff"
                textAlign={"start"}
              >
                Copyright © {new Date().getFullYear()} MB Wholesale – All Rights
                Reserved.
              </Typography>
            </Grid>
            <Grid
              item
              lg={6}
              md={6}
              sm={12}
              xs={12}
              justifyContent={width > 786 ? "end" : "flex-start"}
              alignItems={width > 786 ? "end" : "flex-start"}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: width > 786 ? "flex-end" : "flex-start",
                  alignItems: width > 786 ? "flex-end" : "flex-start",
                  gap: 5,
                }}
              >
                <img
                  src="/images/footer/payment.png"
                  alt="payment logo"
                  style={{
                    maxWidth: "300px",
                    maxHeight: "36px",
                    width: "100%",
                    height: "100%",
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
};

export default footer;
