import React from "react";
import Location from "./location.module.css";
import ClearIcon from "@mui/icons-material/Clear";
import { Card, TextField, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import { motion } from "framer-motion";
import axios from "axios";

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
    width: 50,
  },
  formTextFieldName: {
    width: 200,
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

const Locations = ({
  addAddress,
  setaddAddress,
  setDisplay,
  display,
  setLocations,
  ch,
}) => {
  const classes = useStyles();

  let handleSubmit = async e => {
    e.preventDefault();
    setaddAddress([...addAddress, display]);
    // sending data to database
    let payload = [...addAddress, display];
    setLocations(false);
    try {
      await axios.put("http://localhost:5000/user/signUp", payload);
    } catch (error) {
      console.log(error.message);
    }

    console.log(payload);
    console.log('k');
  };

  let handleChange = (e, props) => {
    setDisplay({ ...display, [props]: e.target.value });
  };

  let { street, landMark, city, state, pincode, country } = display;
  return (
    <>
      <section className={Location.blur}></section>
      <section className={Location.section}>
        <div className={Location.icon}>
          <ClearIcon onClick={ ch} />
        </div>
        <article className={Location.article}>
          <h1>Address Details</h1>
          <motion.div className={clsx(Location.formCard)}>
            <form style={{ marginTop: "30px" }}>
              <Card
                elevation={0}
                style={{ backgroundColor: "transparent" }}
                className={Location.formCardContainer}
              >
                <TextField
                  className={classes.formTextFieldOther}
                  size="small"
                  id="outlined-size-small"
                  label="Street"
                  placeholder="eg-4th Street"
                  variant="outlined"
                  value={street}
                  required
                  onChange={e => handleChange(e, "street")}
                ></TextField>
              </Card>
              <Card
                elevation={0}
                style={{ backgroundColor: "transparent" }}
                className={Location.formCardContainer}
              >
                <TextField
                  className={classes.formTextFieldOther}
                  size="small"
                  id="outlined-size-small"
                  label="landMark"
                  placeholder="eg-near to church"
                  variant="outlined"
                  value={landMark}
                  required
                  onChange={e => handleChange(e, "landMark")}
                ></TextField>
              </Card>
              <Card
                elevation={0}
                style={{ backgroundColor: "transparent" }}
                className={Location.formCardContainer}
              >
                <TextField
                  className={classes.formTextFieldOther}
                  size="small"
                  id="outlined-size-small"
                  label="city"
                  placeholder="eg-Bangalore"
                  variant="outlined"
                  value={city}
                  required
                  onChange={e => handleChange(e, "city")}
                ></TextField>
              </Card>
              <Card
                elevation={0}
                style={{ backgroundColor: "transparent" }}
                className={Location.formCardContainer}
              >
                <TextField
                  className={classes.formTextFieldOther}
                  size="small"
                  id="outlined-size-small"
                  label="state"
                  placeholder="eg-Karnataka"
                  variant="outlined"
                  value={state}
                  required
                  onChange={e => handleChange(e, "state")}
                ></TextField>
              </Card>
              <Card
                elevation={0}
                style={{ backgroundColor: "transparent" }}
                className={Location.formCardContainer}
              >
                <TextField
                  className={classes.formTextFieldOther}
                  size="small"
                  id="outlined-size-small"
                  label="pincode"
                  placeholder="eg-654987"
                  variant="outlined"
                  value={pincode}
                  required
                  onChange={e => handleChange(e, "pincode")}
                ></TextField>
              </Card>
              <Card
                elevation={0}
                style={{ backgroundColor: "transparent" }}
                className={Location.formCardContainer}
              >
                <TextField
                  className={classes.formTextFieldOther}
                  size="small"
                  id="outlined-size-small"
                  label="country"
                  placeholder="eg-India"
                  variant="outlined"
                  value={country}
                  required
                  onChange={e => handleChange(e, "country")}
                ></TextField>
              </Card>
            </form>
            <button className={Location.btn} onClick={handleSubmit}>
              SUMBIT
            </button>
          </motion.div>
        </article>
      </section>
    </>
  );
};

export default Locations;
