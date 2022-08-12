import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, TextField, makeStyles, Checkbox } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import style from "./signup.module.css";
import { motion } from "framer-motion";
import Axios from "../../../apis/Axios";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import "animate.css";
import clsx from "clsx";
import TermsConditions from "../TermsConditions";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { OpenLogin } from "../../../features/Login/LoginSlice";
import BackdropSpinner from "../../../components/spinner/BackdropSpinner";
// import { motion, Variants } from "framer-motion";

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
    width: 50,
  },
  formTextFieldName: {
    width: 200,
    // paddingLeft: 15,
    spacing: 5,
    marginTop: 3,
  },
  formTextFieldOther: {
    spacing: 5,
    marginTop: 3,
    width: 420,
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  passwordField: {
    width: 420,
    height: 40,
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();
  // Loading state
  const [showBackdrop, setShowBackdrop] = useState(false);

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("nopassword");
  const [role, setRole] = useState("");
  const [gender, setGender] = useState("male");
  const [payload, setPayload] = useState({});
  const [btnCondition, setBtnCondition] = useState(false);
  const [model, setModel] = useState(false);
  const [number1, setNumber1] = useState("");

  const onAgreeTC = tcAccepted => {
    setBtnCondition(tcAccepted);
  };
  // const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault();
    setShowBackdrop(true);
    let currPayload = {
      firstName: fname,
      lastName: lname,
      email,
      password,
      gender,
      phone: number1,
      role: ["CUSTOMER"],
      addressList: [],
      wishList: [],
      cartList: [],
    };
    setPayload(currPayload);
    console.log(payload);

    await fetchData(currPayload);
    setShowBackdrop(false);
    toast.success("Successfully Registered Please Check your mail and Verify");
    navigate("/");
  };
  const header = {
    verifyUrl: "http://localhost:3000/reset",
  };
  const fetchData = async currPayload => {
    try {
      await Axios.post("/customers", currPayload, { headers: header });
      console.log("user registered....");
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

  return (
    <>
      <br />
      <motion.div className={clsx(style.formCard)}>
        <h1>Create Your Profile</h1>
        <section>
          One profile ID is all you need to access all KART services. You
          already have a profile?{" "}
          <a
            onClick={() => {
              dispatch(OpenLogin());
              navigate("/");
            }}
          >
            Find it here{" "}
          </a>
        </section>
        <form onSubmit={handleSubmit}>
          <Card
            style={{ backgroundColor: "transparent" }}
            elevation={0}
            className={style.formCardContainer}
          >
            <TextField
              className={classes.formTextFieldName}
              size="small"
              label="First Name"
              id="outlined-size-small"
              variant="outlined"
              required
              value={fname}
              onChange={e => {
                setFname(e.target.value);
              }}
            ></TextField>
            <TextField
              className={classes.formTextFieldName}
              size="small"
              label="Last Name"
              id="outlined-size-small"
              variant="outlined"
              required
              value={lname}
              onChange={e => {
                setLname(e.target.value);
              }}
            ></TextField>
          </Card>
          <Card
            elevation={0}
            style={{ backgroundColor: "transparent" }}
            className={style.formCardContainer}
          >
            <RadioGroup
              aria-label="gender"
              name="gender1"
              value={gender}
              onChange={e => setGender(e.target.value)}
            >
              <section
                style={{
                  display: "flex",
                  // alignItems: "baseline",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                }}
              >
                <FormLabel component="legend">Gender</FormLabel>
                <FormControlLabel
                  className={style.radioGroup}
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  className={style.radioGroup}
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  className={style.radioGroup}
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </section>
            </RadioGroup>
          </Card>
          {/* phone number1 mandatory */}
          <Card
            elevation={0}
            style={{ backgroundColor: "transparent" }}
            className={style.formCardContainer}
          >
            <TextField
              className={classes.formTextFieldOther}
              size="small"
              label="Phone Number"
              required
              placeholder="9856412537"
              id="outlined-size-small"
              variant="outlined"
              value={number1}
              onChange={e => setNumber1(e.target.value)}
            ></TextField>
          </Card>
          {/* number2 optional */}

          {/* address 1 is mandatory */}

          <Card
            elevation={0}
            style={{ backgroundColor: "transparent" }}
            className={style.formCardContainer}
          >
            <TextField
              className={classes.formTextFieldOther}
              size="small"
              label="Email Address"
              id="outlined-size-small email"
              variant="outlined"
              placeholder="exmaple@company.com"
              required
              value={email}
              onChange={e => {
                setEmail(e.target.value);
              }}
            ></TextField>
          </Card>
          <Card
            elevation={0}
            style={{ backgroundColor: "transparent", display: "none" }}
            className={style.formCardContainer}
          >
            <TextField
              className={classes.formTextFieldOther}
              size="small"
              label="Password"
              id="outlined-size-small password"
              variant="outlined"
              required
              value={password}
              type="password"
              onChange={e => {
                setPassword(e.target.value);
              }}
            ></TextField>
          </Card>
          <Card
            elevation={0}
            style={{ backgroundColor: "transparent" }}
            className={style.formCardContainer}
          >
            {/* <TextField
              className={classes.formTextFieldOther}
              size="small"
              label="Role"
              id="outlined-size-small role"
              variant="outlined"
              required
              value={role}
              onChange={e => {
                setRole(e.target.value);
              }}
            ></TextField> */}
          </Card>
          <Card
            className={clsx(style.formCardContainer, style.Checkbox)}
            elevation={0}
            style={{ backgroundColor: "transparent" }}
          >
            <span
              style={{ marginLeft: "300px", display: "flex", width: "350px" }}
            >
              <FormControlLabel
                // className={style.radioGroup}
                style={{ width: "35px" }}
                value="other"
                checked={btnCondition}
                onClick={() => {
                  setModel();
                  setModel(true);
                }}
                control={<Checkbox />}

                // label="I agree to the Terms Conditions*"
              />
              <span
                style={{
                  display: "inline-block",
                  width: "300px",
                  marginTop: "12px",
                }}
              >
                I agree to the{" "}
                <a
                  href="#"
                  onClick={() => {
                    setModel(true);
                  }}
                >
                  Terms Conditions
                </a>
                *
              </span>
            </span>
          </Card>
          <Card style={{ marginLeft: "300px" }}>
            {model && (
              <TermsConditions
                modelCondition={setModel}
                condition={setBtnCondition}
                onAgreeTC={onAgreeTC}
              />
            )}
          </Card>

          <Card
            elevation={0}
            style={{ backgroundColor: "transparent" }}
            className={style.formCardContainer}
          >
            {btnCondition ? (
              <button className={style.bn5}>Register</button>
            ) : (
              <button className={style.bn5Disabled} disabled={true}>
                Register
              </button>
            )}
          </Card>
        </form>
        <BackdropSpinner open={showBackdrop} />
      </motion.div>
      <br />
    </>
  );
};

export default Signup;
