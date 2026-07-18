import { Button, Card, CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FaLock, FaUserAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
////////////////////////////////
import { LoginFunction } from "../../src/AsyncFunctions/Auth";
import { setAlert } from "../../src/AsyncFunctions/alert";
import styles from "../../src/components/loginAndRegister/login.module.scss";
import { toggleLoading } from "../../src/store/Auth";
import { H1 } from "../../src/utilities/theme/components";

const Login = () => {
  const Router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [login, setLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const isloading = useSelector((state) => state.auth.isLoading);
  const userDetails = useSelector((state) => state.auth.userDetails);

  ////handle login
  const handleLogin = (e) => {
    if (e) e.preventDefault();
    if (password.length > 4 && username.length > 4) {
      let data = {
        username,
        type: "customer",
        password,
      };
      setLogin(true);
      LoginFunction(data)(dispatch).then((data) => {
        if (data) {
          setUsername("");
          setPassword("");
          Router.push("/");
        }
      });
    } else {
      setAlert("warn", "please enter a valid Email and Password")(dispatch);
      dispatch(toggleLoading(false));
    }
  };
  //////if already logged In
  useEffect(() => {
    if (userDetails && !login) {
      setAlert("success", "You are already logged in")(dispatch);
      Router.push("/");
      setLogin(true);
    }
    return () => {
      setLogin(false);
    };
  }, [userDetails]);

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <div className={styles.login}>
          <H1 variant="h4" style={{ background: "transparent" }}>
            sign in
          </H1>
          <div className={styles.inputBx}>
            <span className={styles.icon}>
              <FaUserAlt />
            </span>
            <input
              type="email"
              placeholder="Username or Email"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className={styles.inputBx}>
            <span className={styles.icon}>
              <FaLock />
            </span>
            <input
              type={!showPassword ? "password" : "text"}
              placeholder="Password"
              value={password}
              onKeyDown={(e) => {
                if (e.keyCode === 13) {
                  handleLogin();
                }
              }}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <span
              className={styles.showPassBtn}
              onClick={() => {
                setShowPassword((open) => !open);
              }}
              style={{ fontSize: "1.5rem" }}
            >
              {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </span>
          </div>
          <div className={styles.buttonsContainer}>
            <Button
              variant="contained"
              className={styles.loginBtn}
              onClick={(e) => {
                handleLogin(e);
              }}
            >
              {isloading ? <CircularProgress color="inherit" /> : "sign in"}
            </Button>

            <Button
              variant="text"
              onClick={(e) => {
                e.preventDefault();
                Router.push("/account/forgotPassword");
              }}
              className={styles.forgotPass}
            >
              forgot password?
            </Button>
          </div>
        </div>

        <div className={styles.register}>
          <p className={styles.lineText}>Don&apos;t have an account?</p>
          <Button
            onClick={(e) => {
              e.preventDefault();

              Router.push("/account/register");
            }}
            variant="outlined"
            className={styles.signUp}
          >
            sign up
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Login;
