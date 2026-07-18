import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
export default function AccountCard({ name }) {
  return (
    <Card
      sx={{
        mt: 3,
        border: "none",
        boxShadow: "rgb(0 0 0 / 13%) 1px 2px 9px 1px",
      }}
    >
      <CardContent sx={{ p: 5 }}>
        <Typography
          variant="h5"
          fontWeight={800}
          sx={{ textAlign: "center" }}
          fontFamily="Poppins"
          mb={2}
        >
          Addendum to ACH Authorization Agreement
        </Typography>
        <Typography
          variant="h6"
          fontFamily="Poppins"
          fontWeight={500}
          sx={{
            textAlign: "center",
            span: {
              fontWeight: 600,
              borderBottom: "1px solid",
              mx: 1,
            },
          }}
          mb={2}
        >
          Purchaser
          <span>{name || ""}</span>
          agrees that in the event of a defualt or breach of this agreemnet by
          Purchaser,to include failure to pay invoice(s)in full,proper venue for
          any claim by MB Wholesale against Purchaser shall reside in the
          Circuit Court of leon Country.
        </Typography>
        <Typography
          variant="h6"
          fontFamily="Poppins"
          fontWeight={500}
          sx={{
            textAlign: "center",
            span: {
              fontWeight: 600,
              mx: 1,
              borderBottom: "1px solid",
            },
          }}
          mb={2}
        >
          Purchaser
          <span>{name || ""}</span>
          agrees that <span>{name || ""}</span>
          shall personally guarantee the payment of any sums due and owing to MB
          Wholesale
        </Typography>
      </CardContent>
    </Card>
  );
}
