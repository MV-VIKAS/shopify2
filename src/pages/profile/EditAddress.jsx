import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Card, TextField, makeStyles } from "@material-ui/core";
import style from "../auth/users/signup.module.css";
import { motion } from "framer-motion";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import "animate.css";
import clsx from "clsx";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { toast } from "react-toastify";
import { Country, State, City } from "country-state-city";
import { useSelector, useDispatch } from "react-redux";
import { editAddress, fetchAddress } from "../../features/address/addressSlice";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import TermsConditions from "../auth/TermsConditions";

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

const EditAddress = () => {
  const dispatch = useDispatch();
  let currUser = useSelector(state => state.user.currentUser);
  const AddressList = useSelector(state => state.address.addressList);

  // console.log(currUser)
  let token = useSelector(state => state.user.token);
  let { addressId } = useParams();

  let Addressdata = AddressList.find(add => add.addressId == addressId);
  let {
    streetInfo,
    landmark,
    pincode,
    country,

    state,
    city,
    type,
    buildingInfo,
    name,
    phone,
  } = Addressdata;
  let { userId } = currUser;

  const navigate = useNavigate();
  const classes = useStyles();
  const [password, setPassword] = useState("nopassword");
  const [address, setAddress] = useState({
    city: "",
    type,
    country: "",
    buildingInfo,
    streetInfo,
    landmark,
    state: "",
    pincode,
    name,
    phone,
  });

  const [allCountries, setAllCountries] = useState([]);
  const [countryCode, setCountryCode] = useState("IN");
  const [allStates, setAllStates] = useState([]);
  const [allCity, setAllcity] = useState([]);
  const [addressType, setaddressType] = useState(type);
  const [otherAddress, setOtherAddress] = useState("");
  const [model, setModel] = useState(false);
  const [btnCondition, setBtnCondition] = useState(false);

  useEffect(() => {
    let allCountriesData = Country.getAllCountries().map(countryData => {
      return countryData.name;
    });
    setAllCountries(allCountriesData);
  }, []);

  useEffect(() => {
    dispatch(fetchAddress(userId));
  }, []);
  function enableStateDropDown(countryCode1) {
    let allStatesData = State.getStatesOfCountry(`${countryCode1}`);
    setAllStates(allStatesData);
  }

  function enableCityDropDown(stateCode1) {
    let allCityData = City.getCitiesOfState(countryCode, stateCode1);
    setAllcity(allCityData);
  }

  const handleSubmit = e => {
    e.preventDefault();
    let addresstype = addressType;
    if (otherAddress !== "") addresstype = otherAddress;
    let currPayload = {
      ...address,
      type: addresstype,
    };
    try {
      dispatch(editAddress({ userId, addressId, currPayload }));
      toast.success("successfully updated");
      navigate(-1);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <br />
      <motion.div className={clsx(style.formCard)}>
        <h1>Update Address</h1>

        <form onSubmit={handleSubmit}>
          <Card
            style={{ backgroundColor: "transparent" }}
            elevation={0}
            className={style.formCardContainer}
          ></Card>

          {/* <Card
            elevation={0}
            style={{ backgroundColor: "transparent" }}
            className={style.formCardContainer}
          ></Card>
          <Card
            elevation={0}
            style={{ backgroundColor: "transparent" }}
            className={style.formCardContainer}
          ></Card> */}
          {/* number2 optional */}

          {/* address 1 is mandatory */}
          <Card
            elevation={0}
            style={{ backgroundColor: "transparent" }}
            className={style.formCardContainer}
          >
            <RadioGroup
              aria-label="addressType"
              name="addressType1"
              value={addressType}
              onChange={e => setaddressType(e.target.value)}
            >
              <section
                style={{
                  display: "flex",
                  // alignItems: "baseline",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                }}
              >
                <FormLabel component="legend">Address Type</FormLabel>
                <FormControlLabel
                  className={style.radioGroup}
                  value="Home"
                  control={<Radio />}
                  label="Home"
                />
                <FormControlLabel
                  className={style.radioGroup}
                  value="Office"
                  control={<Radio />}
                  label="Office"
                />
                <FormControlLabel
                  className={style.radioGroup}
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </section>
              <div style={{ display: "flex", justifyContent: "center " }}>
                {addressType == "other" && (
                  <TextField
                    className={classes.formTextFieldOther}
                    size="small"
                    id="outlined-size-small"
                    label="Other"
                    placeholder="Enter Address type"
                    variant="outlined"
                    value={otherAddress}
                    required
                    onChange={e => {
                      setOtherAddress(e.target.value);
                    }}
                  ></TextField>
                )}
              </div>
            </RadioGroup>
          </Card>

          <Card
            elevation={0}
            style={{ backgroundColor: "transparent" }}
            className={style.formCardContainer}
          >
            <TextField
              className={classes.formTextFieldOther}
              size="small"
              id="outlined-size-small"
              label="Name"
              placeholder="John Doe"
              variant="outlined"
              value={address.name}
              required
              onChange={e => {
                setAddress({ ...address, name: e.target.value });
              }}
            ></TextField>
          </Card>
          <Card
            elevation={0}
            style={{ backgroundColor: "transparent" }}
            className={style.formCardContainer}
          >
            <TextField
              className={classes.formTextFieldOther}
              size="small"
              id="outlined-size-small"
              label="House/Office Info"
              placeholder="eg-142/87, ABC Apartment"
              variant="outlined"
              value={address.buildingInfo}
              required
              onChange={e => {
                setAddress({ ...address, buildingInfo: e.target.value });
              }}
            ></TextField>
          </Card>
          <Card
            elevation={0}
            style={{ backgroundColor: "transparent" }}
            className={style.formCardContainer}
          >
            <TextField
              className={classes.formTextFieldOther}
              size="small"
              id="outlined-size-small"
              label="streetInfo"
              placeholder="eg-4th streetInfo"
              variant="outlined"
              value={address.streetInfo}
              required
              onChange={e => {
                setAddress({ ...address, streetInfo: e.target.value });
              }}
            ></TextField>
          </Card>
          <Card
            elevation={0}
            style={{ backgroundColor: "transparent" }}
            className={style.formCardContainer}
          >
            <TextField
              className={classes.formTextFieldOther}
              size="small"
              id="outlined-size-small"
              variant="outlined"
              value={address.landmark}
              label="landmark"
              required
              placeholder="eg-near This and That"
              onChange={e => {
                setAddress({ ...address, landmark: e.target.value });
              }}
            ></TextField>
          </Card>
          <Card
            elevation={0}
            style={{ backgroundColor: "transparent" }}
            className={style.formCardContainer}
          >
            {/* country */}
            <FormControl className={classes.formControl}>
              <InputLabel
                shrink
                id="demo-simple-select-placeholder-label-label"
              >
                Country
              </InputLabel>
              {/* select country code */}
              <Select
                labelId="demo-simple-select-placeholder-label-label"
                id="demo-simple-select-placeholder-label"
                value={address.country}
                required
                onChange={e => {
                  setAddress({ ...address, country: e.target.value });
                  // set country code
                  let countryCode1 = "";
                  Country.getAllCountries().map(countryData => {
                    if (countryData.name == e.target.value) {
                      setCountryCode(countryData.isoCode);
                      countryCode1 = countryData.isoCode;
                    }
                  });

                  enableStateDropDown(countryCode1);
                }}
                displayEmpty
                className={classes.selectEmpty}
              >
                <MenuItem value=""></MenuItem>
                {allCountries.map((countryName, i) => {
                  return (
                    <MenuItem value={`${countryName}`} key={`${i}`}>
                      {`${countryName}`}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText>Select your Country</FormHelperText>
            </FormControl>

            {/* state */}
            <FormControl className={classes.formControl}>
              <InputLabel
                shrink
                id="demo-simple-select-placeholder-label-label"
              >
                State
              </InputLabel>
              <Select
                labelId="demo-simple-select-placeholder-label-label"
                id="demo-simple-select-placeholder-label"
                value={address.state}
                required
                onChange={e => {
                  setAddress({ ...address, state: e.target.value });
                  // set state code
                  let stateCode1 = "";
                  State.getStatesOfCountry(`${countryCode}`).map(stateData => {
                    if (stateData.name == e.target.value) {
                      stateCode1 = stateData.isoCode;
                    }
                  });

                  enableCityDropDown(stateCode1);
                }}
                displayEmpty
                className={classes.selectEmpty}
              >
                <MenuItem value=""></MenuItem>
                {allStates.map((stateName, j) => {
                  return (
                    <MenuItem
                      value={`${stateName.name}`}
                      key={`${j}`}
                    >{`${stateName.name}`}</MenuItem>
                  );
                })}
              </Select>
              <FormHelperText>Select your State</FormHelperText>
            </FormControl>
            {/* cities */}
            <FormControl className={classes.formControl}>
              <InputLabel
                shrink
                id="demo-simple-select-placeholder-label-label"
              >
                city
              </InputLabel>
              <Select
                labelId="demo-simple-select-placeholder-label-label"
                id="demo-simple-select-placeholder-label"
                value={address.city}
                required
                onChange={e => {
                  setAddress({ ...address, city: e.target.value });
                }}
                displayEmpty
                className={classes.selectEmpty}
              >
                <MenuItem value=""></MenuItem>
                {allCity.map((cityName, k) => {
                  return (
                    <MenuItem
                      value={`${cityName.name}`}
                      key={`${k}`}
                    >{`${cityName.name}`}</MenuItem>
                  );
                })}
              </Select>
              <FormHelperText>Select your city</FormHelperText>
            </FormControl>
          </Card>
          <Card
            elevation={0}
            style={{ backgroundColor: "transparent" }}
            className={style.formCardContainer}
          >
            <TextField
              className={classes.formTextFieldOther}
              size="small"
              variant="outlined"
              placeholder="eg-895641"
              label="Pincode"
              required
              value={address.pincode}
              onChange={e => {
                setAddress({ ...address, pincode: e.target.value });
              }}
            ></TextField>
          </Card>
          <Card
            elevation={0}
            style={{ backgroundColor: "transparent" }}
            className={style.formCardContainer}
          >
            <TextField
              className={classes.formTextFieldOther}
              size="small"
              id="outlined-size-small"
              label="Phone Number"
              placeholder="9876543210"
              variant="outlined"
              value={address.phone}
              required
              onChange={e => {
                setAddress({ ...address, phone: e.target.value });
              }}
            ></TextField>
          </Card>

          <Card style={{ marginLeft: "300px" }}>
            {model && (
              <TermsConditions
                modelCondition={setModel}
                condition={setBtnCondition}
              />
            )}
          </Card>

          <Card
            elevation={0}
            style={{ backgroundColor: "transparent" }}
            className={style.formCardContainer}
          >
            <button className={style.bn5}>Update Address</button>
          </Card>
        </form>
      </motion.div>
      <br />
    </>
  );
};

export default EditAddress;
