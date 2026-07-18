import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { BiError } from "react-icons/bi";
import { RiLockPasswordFill, RiLockPasswordLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { PulseLoader } from "react-spinners";
import { resetPassword } from "../src/AsyncFunctions/Auth";
import styles from "../styles/password.module.scss";

const ForgetPassword = () => {
  const router = useRouter();
  const email = router.query.email;
  const token = router.query.token;
  const [password, setPassword] = useState({
    pass: "",
    confirmPass: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    if (email && token) {
      const url = `${process.env.API_BASE_URL}/ecommerce/customer/validateResetPasswordToken?email=${email}&token=${token}`;
      axios
        .post(url)
        .then((res) => {
          setShowForm(res?.data?.result ? true : false);
        })
        .catch(() => {
          setShowForm(false);
        });
    }
  }, [email, token]);

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    resetPassword(
      password.pass,
      password.confirmPass,
      email,
      token
    )(dispatch).then((data) => {
      setLoading(false);
      if (data) router.push("/");
    });
  };

  return (
    <div className={styles.container}>
      {showForm ? (
        <form
          style={{ maxWidth: "525px", padding: "1rem" }}
          className={styles.resetCard}
          onSubmit={(e) => handleSubmit(e)}
        >
          <div
            style={{
              background: "var(--surface)",
              padding: "1rem",
              fontSize: "1rem",
              borderRadius: "5px",
            }}
          >
            <h6 style={{ fontSize: "1.2rem" }}>Reset Password</h6>
            <p style={{ fontWeight: 600, marginTop: "1rem" }}>Password</p>
            <div className={styles.inputBx} style={{ borderRadius: "5px" }}>
              <span className={styles.icon}>
                <RiLockPasswordLine />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password *"
                required
                minLength={8}
                value={password?.pass}
                onChange={(e) => {
                  setPassword({ ...password, pass: e.target.value });
                }}
              />
              <span
                className={styles.showPassBtn}
                onClick={() => {
                  setShowPassword((open) => !open);
                }}
                style={{
                  fontSize: "1.5rem",
                  cursor: "pointer",
                  marginRight: "1%",
                }}
              >
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </span>
            </div>
            <p style={{ fontWeight: 600, marginTop: "1rem" }}>Confirm Password</p>
            <div style={{ borderRadius: "5px" }} className={styles.inputBx}>
              <span className={styles.icon}>
                <RiLockPasswordFill />
              </span>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password *"
                required
                minLength={8}
                value={password?.confirmPass}
                onChange={(e) => {
                  setPassword({ ...password, confirmPass: e.target.value });
                }}
              />
              <span
                className={styles.showPassBtn}
                onClick={() => {
                  setShowConfirmPassword((open) => !open);
                }}
                style={{
                  fontSize: "1.5rem",
                  cursor: "pointer",
                  marginRight: "1%",
                }}
              >
                {showConfirmPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </span>
            </div>
            <p style={{ marginTop: "1rem" }}>
              <b> Hint:</b> The password should be at least 8 characters long. To make it stronger, use upper and lower
              case letter, number and symbols like ! &ldquo; ? $ % ^ & ).
            </p>
          </div>

          <div style={{ marginTop: "1rem" }} className={styles.btnRow}>
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "200px",
                padding: " 0.5rem 1rem",
                fontSize: "1rem",
                fontWeight: 600,
                background: `#F44336`,
                borderRadius: "5px",
                border: "none",
                color: "white",
                cursor: "pointer",
              }}
              // className={styles.loginBtn}
            >
              {loading ? <PulseLoader color="#ffffff" /> : <span>Reset Password</span>}
            </button>
          </div>
        </form>
      ) : (
        <div className={styles.error}>
          <BiError className={styles.errIcon} /> <h3>You reset password link in not vaild.</h3>
        </div>
      )}
    </div>
  );
};

export default ForgetPassword;
