import { SwitchUser } from "@salesgenterp/ui-components";
import getConfig from "next/config";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { switchUserFunction } from "../../src/AsyncFunctions/Auth";

const SwitchUserComponent = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { publicRuntimeConfig } = getConfig();
  const { API_BASE_URL } = publicRuntimeConfig;
  const token = useSelector((state) => state.auth.tokens?.token);

  const onSelectCustomer = (data) => {
    if (data?.parentCustomerId) {
      switchUserFunction({ childCustomerId: data?.id, token })(dispatch).then((data) => {
        if (data) {
          router.push("/");
        }
      });
    } else {
      router.push("/");
    }
  };

  return (
    <div>
      <SwitchUser
        apiEndPoint={API_BASE_URL}
        token={token}
        colors={{ primaryColor: "#000000" }}
        onSelectCustomer={onSelectCustomer}
      />
    </div>
  );
};

export default SwitchUserComponent;
