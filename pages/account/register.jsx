import {
  Button,
  Card,
  CircularProgress,
  Container,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import Router from "next/router";
import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Controller, useForm, useWatch } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
////////////////////////////////////////////////////////////////////////
import getConfig from "next/config";
import Link from "next/link";
import { setAlert } from "../../src/AsyncFunctions/alert";
import { register } from "../../src/AsyncFunctions/Auth";
import DropFiles from "../../src/components/loginAndRegister/DropFiles/DropFiles";
import ShowDropFiles from "../../src/components/loginAndRegister/DropFiles/ShowDropFiles";
import styles from "../../src/components/loginAndRegister/register.module.scss";
import { useDatafetcher } from "../../src/utilities/hooks/useDatafetcher";
import { H1 } from "../../src/utilities/theme/components";
const { publicRuntimeConfig } = getConfig();
const { GOOGLE_RECAPTCHA_KEY } = publicRuntimeConfig;

const RegisterPage = () => {
  const { control, handleSubmit, watch } = useForm();
  const [showError, setShowError] = useState(false);
  const [markedCapcha, setMarkedCapcha] = useState(false);
  const [businessLicense, setBusinessLicense] = useState([]);
  const [tobaccoLicense, setTobaccoLicense] = useState([]);
  const [feinLicense, setFeinLicense] = useState([]);
  const [drivingLicense, setDrivingLicense] = useState([]);
  const [voidCheck, setVoidCheck] = useState([]);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.isLoading);

  ///////////data fetching
  const { data: countries } = useDatafetcher("/country/all", true);
  const { data: employeeData } = useDatafetcher(
    "/ecommerce/employee/list?size=1000",
    true
  );
  const salesman = employeeData?.content;
  ///////
  const countryChange = useWatch({
    control,
    name: "country",
  });
  const phoneNumber = watch(["phone"]);
  ///fetching states
  const { data: state } = useDatafetcher(
    `/country/${countryChange || 1}/allState`,
    true
  );
  ////submit func
  const onSubmit = (data) => {
    if (phoneNumber?.[0]?.length < 8) {
      setShowError(true);
    } else {
      if (
        businessLicense.length < 1 ||
        feinLicense.length < 1 ||
        tobaccoLicense.length < 1 ||
        drivingLicense.length < 1 ||
        voidCheck.length < 1
      )
        return setAlert("warn", "Please Upload required Documents")(dispatch);
      if (!markedCapcha)
        return setAlert(
          "warn",
          "Please Mark the captcha to continue"
        )(dispatch);
      register({
        ...data,
        businessLicense,
        tobaccoLicense,
        feinLicense,
        drivingLicense,
        voidCheck,
      })(dispatch).then((data) => {
        if (data) Router.push("/");
      });
    }
  };

  ////rechaptcha func
  const onChangeRecapcha = (data) => {
    setMarkedCapcha(true);
  };

  ///input props
  const commonControllerProps = {
    control: control,
    defaultValue: "",
    variant: "outlined",
    required: true,
  };

  //////affiliaters
  let affiliaters = [
    { name: "Facebook Feed/Ads" },
    { name: "Facebook Group" },
    { name: "instagram" },
    { name: "twitter" },
    { name: "linkedin" },
    { name: "youtube" },
    { name: "word of mouth" },
    { name: "google search" },
    { name: "convention/congress" },
  ];
  return (
    <div className={styles.container}>
      <Container>
        <H1 variant="h2" style={{ background: "transparent" }}>
          Registration
        </H1>

        <Card className={styles.card}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={4}>
              <Grid xs={11} item>
                <Typography variant="h3">Contact information</Typography>
              </Grid>
              <Grid item xs={11} md={5.5}>
                <Controller
                  {...commonControllerProps}
                  name="firstName"
                  render={({ field }) => (
                    <TextField
                      required={true}
                      label="First Name"
                      onChange={(e) => console.log(e.target)}
                      {...field}
                      className={styles.inputBox}
                      fullWidth={true}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={11} md={5.5}>
                <Controller
                  {...commonControllerProps}
                  name="lastName"
                  render={({ field }) => (
                    <TextField
                      required={true}
                      label="Last Name"
                      {...field}
                      className={styles.inputBox}
                      fullWidth={true}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={11} md={5.5}>
                <Controller
                  {...commonControllerProps}
                  name="email"
                  render={({ field }) => (
                    <TextField
                      required={true}
                      label="Email"
                      type="email"
                      {...field}
                      className={styles.inputBox}
                      fullWidth={true}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={11} md={5.5}>
                <Controller
                  {...commonControllerProps}
                  name="phone"
                  render={({ field }) => (
                    <TextField
                      error={showError && phoneNumber[0].length < 10}
                      required={true}
                      label="Phone"
                      type="tel"
                      {...field}
                      className={styles.inputBox}
                      fullWidth={true}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={11}>
                <Typography variant="h3">Business information</Typography>
              </Grid>
              <Grid item xs={11} md={5.5}>
                <Controller
                  {...commonControllerProps}
                  name="company"
                  render={({ field }) => (
                    <TextField
                      required={true}
                      label="Legal Business Name"
                      {...field}
                      className={styles.inputBox}
                      fullWidth={true}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={11} md={5.5}>
                <Controller
                  {...commonControllerProps}
                  name="dbaName"
                  render={({ field }) => (
                    <TextField
                      // required={true}
                      label="DBA Name"
                      {...field}
                      className={styles.inputBox}
                      fullWidth={true}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={11} md={5.5}>
                <Controller
                  {...commonControllerProps}
                  name="address1"
                  render={({ field }) => (
                    <TextField
                      required={true}
                      label="Address 1"
                      {...field}
                      className={styles.inputBox}
                      fullWidth={true}
                      multiline={true}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={11} md={5.5}>
                <Controller
                  {...commonControllerProps}
                  name="address 2"
                  render={({ field }) => (
                    <TextField
                      label="Address 2"
                      {...field}
                      className={styles.inputBox}
                      fullWidth={true}
                      multiline={true}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={11} md={5.5}>
                {countries && (
                  <Controller
                    {...commonControllerProps}
                    defaultValue={1}
                    name="country"
                    // onChange={(e) => setSelectedCountry(e.target.value)}
                    render={({ field }) => (
                      <TextField
                        required={true}
                        label="Country"
                        {...field}
                        select
                        // value={selectedCountry}
                        className={styles.inputBox}
                        fullWidth={true}
                        helperText="Please select your country."
                      >
                        {countries?.map((country) => (
                          <MenuItem value={country.id} key={country.id}>
                            {country.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                )}
              </Grid>
              <Grid item xs={11} md={5.5}>
                {state && (
                  <Controller
                    {...commonControllerProps}
                    name="state"
                    render={({ field }) => (
                      <TextField
                        required={true}
                        label="State"
                        {...field}
                        select
                        className={styles.inputBox}
                        fullWidth={true}
                        helperText="Please select your state"
                      >
                        {state?.map((state) => (
                          <MenuItem value={state.id} key={state.id}>
                            {state.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                )}
              </Grid>

              <Grid item xs={11} md={5.5}>
                <Controller
                  {...commonControllerProps}
                  name="city"
                  render={({ field }) => (
                    <TextField
                      required={true}
                      label="City"
                      {...field}
                      className={styles.inputBox}
                      fullWidth={true}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={11} md={5.5}>
                <Controller
                  {...commonControllerProps}
                  name="zip"
                  render={({ field }) => (
                    <TextField
                      required={true}
                      label="Zip"
                      {...field}
                      className={styles.inputBox}
                      fullWidth={true}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={11}>
                <Typography variant="h3">Additional information</Typography>
              </Grid>

              <Grid item xs={11} md={5.5}>
                <Controller
                  {...commonControllerProps}
                  name="websiteReference"
                  render={({ field }) => (
                    <TextField
                      // required={true}
                      label="How did you hear about this?"
                      {...field}
                      select
                      className={styles.inputBox}
                      fullWidth={true}
                      // helperText="please select"
                    >
                      {affiliaters?.map((affiliate, i) => (
                        <MenuItem key={i} value={affiliate.name}>
                          {affiliate.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>
              <Grid item xs={11} md={5.5}>
                {salesman && (
                  <Controller
                    {...commonControllerProps}
                    name="referBySalesRep"
                    render={({ field }) => (
                      <TextField
                        label="Refer By sales Rep"
                        {...field}
                        select
                        className={styles.inputBox}
                        fullWidth={true}
                      >
                        {salesman?.map((saleman) => (
                          <MenuItem key={saleman.id} value={saleman.id}>
                            {saleman.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                )}
              </Grid>
              {/* ////////////////////////// */}
              <Grid item xs={11}>
                <Typography variant="h3" marginTop="2em">
                  Documents Required
                </Typography>
              </Grid>
              <Grid item xs={11} md={5.5}>
                <Typography sx={{ fontWeight: 600, marginBottom: ".5em" }}>
                  State Tax ID
                </Typography>
                <Controller
                  {...commonControllerProps}
                  name="taxId"
                  render={({ field }) => (
                    <TextField
                      // required={true}
                      label="State Tax ID"
                      {...field}
                      className={styles.inputBox}
                      fullWidth={true}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={11} md={5.5}>
                <Typography sx={{ fontWeight: 600, marginBottom: ".5em" }}>
                  Resale (Sales Tax) Certificate
                </Typography>
                <DropFiles setFiles={setBusinessLicense} required />
                <ShowDropFiles
                  files={businessLicense}
                  setFiles={setBusinessLicense}
                />
              </Grid>

              <Grid item xs={11} md={5.5}>
                <Typography sx={{ fontWeight: 600, marginBottom: ".5em" }}>
                  Federal EIN Document Number
                </Typography>
                <Controller
                  {...commonControllerProps}
                  name="feinNumber"
                  render={({ field }) => (
                    <TextField
                      // required={true}
                      label="Federal EIN Document Number"
                      {...field}
                      className={styles.inputBox}
                      fullWidth={true}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={11} md={5.5}>
                <Typography sx={{ fontWeight: 600, marginBottom: ".5em" }}>
                  Federal EIN Document (FEIN)
                </Typography>
                <DropFiles setFiles={setFeinLicense} required />
                <ShowDropFiles files={feinLicense} setFiles={setFeinLicense} />
              </Grid>

              <Grid item xs={11} md={5.5}>
                <Typography sx={{ fontWeight: 600, marginBottom: ".5em" }}>
                  OTP/Vape/Tobacco License Number
                </Typography>
                <Controller
                  {...commonControllerProps}
                  name="tobaccoId"
                  render={({ field }) => (
                    <TextField
                      // required={true}
                      label="OTP/Vape/Tobacco License Number"
                      {...field}
                      className={styles.inputBox}
                      fullWidth={true}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={11} md={5.5}>
                <Typography sx={{ fontWeight: 600, marginBottom: ".5em" }}>
                  OTP/Vape/Tobacco License
                </Typography>
                <DropFiles setFiles={setTobaccoLicense} required />
                <ShowDropFiles
                  files={tobaccoLicense}
                  setFiles={setTobaccoLicense}
                />
              </Grid>

              <Grid item xs={11} md={5.5}>
                <Typography sx={{ fontWeight: 600, marginBottom: ".5em" }}>
                  Driving License Number
                </Typography>
                <Controller
                  {...commonControllerProps}
                  name="drivingLicenseNumber"
                  render={({ field }) => (
                    <TextField
                      // required={true}
                      label="Driving License Number"
                      {...field}
                      className={styles.inputBox}
                      fullWidth={true}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={11} md={5.5}>
                <Typography sx={{ fontWeight: 600, marginBottom: ".5em" }}>
                  Driving License
                </Typography>
                <DropFiles setFiles={setDrivingLicense} required />
                <ShowDropFiles
                  files={drivingLicense}
                  setFiles={setDrivingLicense}
                />
              </Grid>

              <Grid item xs={11} md={5.5}>
                <Typography sx={{ fontWeight: 600, marginBottom: ".5em" }}>
                  Bank Name
                </Typography>
                <Controller
                  {...commonControllerProps}
                  name="voidCheckNumber"
                  render={({ field }) => (
                    <TextField
                      // required={true}
                      label="Bank Name"
                      {...field}
                      className={styles.inputBox}
                      fullWidth={true}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={11} md={5.5}>
                <Typography sx={{ fontWeight: 600, marginBottom: ".5em" }}>
                  Void Check
                </Typography>
                <DropFiles setFiles={setVoidCheck} required />
                <ShowDropFiles files={voidCheck} setFiles={setVoidCheck} />
              </Grid>

              <Grid item xs={11} md={12}>
                <div className={styles.checkBox}>
                  <Controller
                    {...commonControllerProps}
                    name="checkBox-2"
                    render={({ field }) => (
                      <input type="checkbox" {...field} required />
                    )}
                  />
                  <Typography>
                    I have read,understand and agree to be bound by the above
                  </Typography>
                </div>
                {/* <AccountCard name={`${watch("firstName")} ${watch("lastName")}`} /> */}
              </Grid>
              <Grid item xs={11} md={12}>
                <div className={styles.checkBox}>
                  <Controller
                    {...commonControllerProps}
                    name="checkBox"
                    render={({ field }) => (
                      <input type="checkbox" {...field} required />
                    )}
                  />
                  <Typography>
                    I have read and agree to MB Wholesale{" "}
                    <Link href={"/terms-condition"} target="_blank">
                      Terms of Use
                    </Link>{" "}
                    &{" "}
                    <Link href={"/privacy-policy"} target="_blank">
                      Privacy Policy.
                    </Link>
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={11} md={11}>
                <ReCAPTCHA
                  sitekey={
                    GOOGLE_RECAPTCHA_KEY ||
                    "6Lcl6iYjAAAAAPasPAWZqxiRxBg1kyr5Ni4IbLLE"
                  }
                  onChange={onChangeRecapcha}
                />
              </Grid>

              <Grid item xs={11} md={5.5}>
                <Button
                  className={styles.registerBtn}
                  variant="contained"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? <CircularProgress color="inherit" /> : "sign up"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Card>
      </Container>
    </div>
  );
};

export default RegisterPage;
