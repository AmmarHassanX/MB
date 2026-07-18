import { Box, Grid } from "@mui/material";
import { StaticPage } from "@salesgenterp/ui-components";
import React from "react";
import styled from "styled-components";
///
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";

const data = {
  mainTitle: "FAQ",
  content: [
    {
      p: (
        <>
          <p>
            Below FAQ are some common concerns of our clients before purchasing
            the theme.
          </p>
        </>
      ),
    },
  ],
};

const Component = (props) => {
  return (
    <div>
      <StaticPage data={data} colors={{ primaryColor: "#000000" }} />
      <Container style={{ margin: "1rem auto", padding: "1rem" }}>
        <Grid container justify="center" spacing={8}>
          <Grid item xs={12} sm={2}>
            <div>
              <h2>
                <span>Need Help?</span>
              </h2>
              <p>Please browse our common FAQs to the right..</p>
              <p>
                If your question wasn&apos;t answered, drop us an email and we
                will get back to you within 20-36 hours!
              </p>
            </div>
          </Grid>
          <Grid item xs={12} sm={10}>
            <h2>
              <span>FAQs</span>
            </h2>
            <div>
              <div>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <div>
                      <p>
                        <b>What are your customer service hours? </b>
                      </p>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <p>
                      Our customer service representatives are standing by to
                      assist Monday-Friday 9am-5pm ; We are closed on Saturdays
                      and Sundays.
                    </p>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <div>
                      <p>
                        <b>
                          Can I pickup my order directly from the warehouse?
                        </b>
                      </p>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <p>
                      {" "}
                      Yes! We are happy to offer a pickup service to our local
                      clients.
                    </p>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <div>
                      <p>
                        <b>What payments methods are available online?</b>
                      </p>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <p>
                      We accept all major credit cards online, including VISA,
                      MasterCard, American Express and Discover.
                    </p>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <div>
                      <p>
                        <b>What is your return policy?</b>
                      </p>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <p>
                      You may return most new, unopened items within 30 days of
                      delivery. We&apos;ll also pay the return shipping costs if
                      the return is a result of our error.
                    </p>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <div>
                      <p>
                        <b>Is shipping included in the item price?</b>
                      </p>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <p>
                      No, shipping charges are not included in item prices.
                      Shipping is calculated during checkout. In state (Florida)
                      $15 flat rate. Out of State $20 flat rate.
                    </p>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <div>
                      <p>
                        <b>Can I place an order over the phone?</b>
                      </p>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <p>
                      Yes! Please call (941) 444-9465. Our representatives are
                      happy to assist with any questions you may have.
                    </p>
                  </AccordionDetails>
                </Accordion>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Component;

const Container = styled(Box)`
  width: 100%;
  @media only screen and (min-width: 1400px) {
    max-width: 1400px;
  }
  h2 {
    font-size: 2rem;
    margin-bottom: 1.6rem;
    span {
      border-bottom: 4px solid #000000;
    }
  }
  p {
    font-size: 1rem;
    // margin-bottom: 1.2rem;
  }
`;
