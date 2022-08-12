import { Button, Card, CardActions, CardContent } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import {
  fetchAddress,
  deleteAddress,
} from "../../features/address/addressSlice";
import ConfirmDialogButton from "../../components/customButton/ConfirmDialogButton";




function MyAddresses() {
  let currUser = useSelector(state => state.user.currentUser);
  let { firstName, lastName, phone, userId } = currUser;
  let [cuurentUser, setCurrentUser] = useState(currUser);
  const addressData = useSelector(state => state.address.addressList);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAddress(userId));
  }, []);

  useEffect(() => {
    setCurrentUser(currUser);
  }, [cuurentUser, currUser]);

  return (
    <div style={{ margin: "0 2rem" }}>
      <h3 style={{ marginBottom: "30px", textAlign: "center" }}>
        Your Address
      </h3>
      {addressData === null || addressData.length === 0 ? (
        ""
      ) : (
        <div className={""} style={{ textAlign: "right" }}>
          <Link to="/addressform">
            <Button variant="contained">Add Address</Button>
          </Link>
        </div>
      )}
      <div className={""} style={{ margin: "8px 0px" }}>

        {addressData === null || addressData.length === 0 ? (
          <>
            <h1>No adderss added yet</h1>
            <Link to="/addressform">
              <Button variant="contained">Add Address</Button>
            </Link>
          </>
        ) : (
          addressData.map((item, index) => {
            let { addressId } = item;
            return (
              <Card sx={{ maxWidth: 500, margin: "8px 0px" }} key={index}>
                <CardContent>
                  <div style={{ display: "flex" }}>
                    <div className={""}>
                      <h4>
                        {`Address ${index + 1}`} : &nbsp; {item.type}{" "}
                      </h4>
                      <div style={{ marginTop: "6px" }}>
                        <h3>{item.name}</h3>
                        <p>
                          {item.buildingInfo} , {item.streetInfo}, Landmark: "
                          {item.landmark}", {item.city}
                        </p>
                        <p>
                          {item.state} - {item.pincode} - {item.country}
                        </p>
                        <strong>Contanct</strong> {item.phone}
                      </div>
                    </div>
                  </div>
                </CardContent>

                <CardActions>
                  <Link to={`/editaddress/${item.addressId}`}>
                    <Button
                      size="small"
                      color="success"
                      startIcon={<ModeEditOutlineOutlinedIcon />}
                    ></Button>
                  </Link>
                  
                  <ConfirmDialogButton title={"Are your sure to Delete Address"}
                  icon={<DeleteIcon />}  onConfirm={(permit) => permit ? dispatch(deleteAddress({ userId, addressId })) : ""} />
                </CardActions>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}

export default MyAddresses;
