import React, { useState, useEffect } from "react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import ReCAPTCHA from "react-google-recaptcha";
import { PulseLoader } from "react-spinners";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
const { GOOGLE_RECAPTCHA_KEY } = publicRuntimeConfig;
///
import styles from "../../styles/password.module.scss";
import { setAlert } from "../../src/AsyncFunctions/alert";
import { forgetPassword } from "../../src/AsyncFunctions/Auth";

const ForgetPassword = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkedreCaptcha, SetcheckedreCaptcha] = useState(false);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    if (checkedreCaptcha) {
      forgetPassword(username)(dispatch);
      router.back();
      setLoading(false);
    } else {
      setAlert("warn", "please check the reCaptcha to continue")(dispatch);
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.card} onSubmit={(e) => handleSubmit(e)}>
        <h6>forgot password</h6>
        <p>Please enter your email address below to receive a password reset link.</p>
        <div className={styles.inputBx}>
          <span className={styles.icon}>
            <FaUserAlt />
          </span>
          <input
            type="email"
            placeholder="Enter your Email"
            required
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className={styles.recaptcha}>
          <ReCAPTCHA
            sitekey={GOOGLE_RECAPTCHA_KEY || "6Lcl6iYjAAAAAPasPAWZqxiRxBg1kyr5Ni4IbLLE"}
            onChange={() => SetcheckedreCaptcha(true)}
          />
        </div>
        <div className={styles.btnRow}>
          <button type="submit" disabled={loading} className={styles.loginBtn}>
            {loading ? <PulseLoader color="#ffffff" /> : <span>submit</span>}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgetPassword;
