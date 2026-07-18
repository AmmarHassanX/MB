import { Grid } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import React, { useState } from "react";
import { HiPlus } from "react-icons/hi";
import { IoIosRemove } from "react-icons/io";

const faqData = [
  {
    title: "How can I find out about new products and promotions?",
    content:
      "We update our website daily, and any active promotions or new products are listed there. Be sure to check back often for the latest deals!",
  },
  {
    title: "What are your customer service hours?",
    content:
      "Our customer service team is available from 9 AM to 5 PM EST, Monday through Friday.",
  },
  {
    title: "What products do you offer at MB Wholesale?",
    content:
      "Our offerings include Disposables, E-liquids, Devices, and more. You can explore our full range of products directly on our website.",
  },
  {
    title: "Do you ship your products nationwide in the USA?",
    content:
      "Yes, we ship throughout the USA. However, some states have restrictions on certain products, so please check your state’s regulations before ordering.",
  },
  {
    title: "What is the minimum age to purchase products from MB Wholesale?",
    content:
      "To purchase products from MB Wholesale, you must be 21 years of age or older.",
  },
  {
    title: "Is there a way to contact customer support for questions?",
    content:
      "Yes, you can reach our customer support team by calling us at 407-467-1610. Additional contact information is available on our website.",
  },
  {
    title: "Is there a warranty on your products?",
    content:
      "Most of our products do not come with a warranty, so we recommend checking product details carefully before purchasing. ",
  },
];

const Faqs = () => {
  const [expandedPanels, setExpandedPanels] = useState([]);

  const handleChange = (panel) => (_, isExpanded) => {
    setExpandedPanels(
      (prevExpanded) =>
        isExpanded
          ? [...prevExpanded, panel] // Add panel to expanded list if opening
          : prevExpanded.filter((p) => p !== panel) // Remove panel from list if closing
    );
  };
  return (
    <div style={{ maxWidth: "1400px", margin: "auto", padding: "2rem 0" }}>
      <Grid container justify="center">
        <Grid item xs={12}>
          <h2
            style={{
              textAlign: "center",
              fontSize: "2rem",
              paddingBottom: "2rem",
            }}
          >
            Frequently asked question
          </h2>
          <div>
            <div>
              {faqData?.map((item, i) => {
                return (
                  <Accordion
                    key={i}
                    expanded={expandedPanels.includes(i)} // Check if the current panel is in the expandedPanels array
                    onChange={handleChange(i)}
                    sx={{
                      fontSize: "1.4rem",
                      borderBottom: "1px solid #D8D8D8", // Bottom border
                      boxShadow: "none", // Remove default shadow
                      "&:before": {
                        display: "none", // Remove the default top divider
                      },
                      borderRadius: "0", // Reset border-radius to avoid rounding on all corners
                      "&:last-of-type": {
                        borderBottomLeftRadius: "0px", // Rounded bottom left corner
                        borderBottomRightRadius: "0px", // Rounded bottom right corner
                      },
                    }}
                  >
                    <AccordionSummary
                      expandIcon={
                        expandedPanels.includes(i) ? (
                          <IoIosRemove style={{ color: "var(--text)" }} />
                        ) : (
                          <HiPlus style={{ color: "var(--text)" }} />
                        )
                      }
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      sx={{ padding: "0px" }}
                    >
                      <p>
                        <b>{item?.title}</b>
                      </p>
                    </AccordionSummary>
                    <AccordionDetails sx={{ padding: "0px 0px 1rem 0px" }}>
                      <p>{item?.content}</p>
                    </AccordionDetails>
                  </Accordion>
                );
              })}
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Faqs;
