import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Notify() {
  const dispatch = useDispatch();
  const alertData = useSelector((state) => state.Home.alertData);

  const notify = () => {
    const { showAlert, type, content, options } = alertData;
    const toastData = {
      position: "top-left",
      autoClose: options?.autoClose ?? 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    };
    if (showAlert === true) {
      if (type === "success") {
        toast.success(content, toastData);
      } else if (type === "warn") {
        toast.warn(content, toastData);
      } else if (type === "error") {
        toast.error(content, toastData);
      } else if (type === "info") {
        toast.info(content, toastData);
      } else {
        toast(content, toastData);
      }
    }
  };
  useEffect(() => {
    notify();
  }, [alertData]);
  return (
    <div>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
