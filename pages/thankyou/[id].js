import React from "react";
import { useRouter } from "next/router";
import { ThankYou } from "@salesgenterp/ui-components";

const Thankyou = (props) => {
  const router = useRouter();
  const id = router.query.id;

  const onContinue = () => {
    router.push("/");
  };

  return (
    <>
      <ThankYou id={id} colors={{ primaryColor: "#000000" }} onContinue={onContinue} />
    </>
  );
};

export default Thankyou;
