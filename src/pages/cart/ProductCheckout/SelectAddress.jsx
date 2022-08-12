import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import style from "./selectaddress.module.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AiFillDelete } from "react-icons/ai";
import { fetchAddress } from "../../../features/address/addressSlice";
import Axios from "../../../apis/Axios";
import { getCart } from "../../../features/cart/cartSlice";
import { getCurrentOrderId } from "../../../features/orders/orderSlice";
import { getOrderHistory } from "./../../../features/orders/orderSlice";

const SelectAddress = () => {
  let [proceed, setproceed] = useState(false);
  let [use, setuse] = useState(false);
  let navigate = useNavigate();
  let dispatch = useDispatch();

  let currUser = useSelector(state => state.user.currentUser);
  // console.log(currUser);
  let { firstName, lastName, gender, email, phone, addressList, userId } =
    currUser;
  let [orderAddress, setOrderAddress] = useState({});

  // let currUser = useSelector(state => state.user.currentUser);
  // // console.log(currUser);
  // let { userId } = currUser;
  let address = useSelector(state => state.address.addressList);
  let orderCart = useSelector(state => state.cart);
  const [orderId, setOrderId] = useState({});
  useEffect(() => {
    dispatch(fetchAddress(userId));
  }, []);
  let handlesubmit = async () => {
    if (use === true) {
      setproceed(!proceed);
      let payload = {
        address: orderAddress,
        orderedItems: orderCart.cartItems,
        totalAmount: orderCart.cartTotal,
      };
      try {
        let { data } = await Axios.post(`customers/${userId}/orders`, payload);
        dispatch(getCurrentOrderId(data.data.id));

        dispatch(getCart(userId));
        toast.success("Order Placed Successfully to this Address");
        navigate("/place-order");
        dispatch(getOrderHistory(userId));
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    } else {
      toast.error("Please select address to be delivered");
    }
  };

  return (
    <div className={style.addresscont}>
      <h3 style={{ marginBottom: "30px", textAlign: "center" }}>
        Select Address
      </h3>

      <div className={style.df}>
        <p style={{ color: "black", fontWeight: "bold" }}>Deliver to:</p>
        <Link to="/addressform">
          {" "}
          <button className={style.adneadd}>Add New Address</button>
        </Link>
      </div>
      <div className="adcon">
        {/* <h3>
          {firstName} <span>{lastName}</span>
        </h3>
        <p style={{ fontWeight: "lighter" }}>{phone}</p> */}

        {address.map((item, index) => {
          return (
            <div style={{ display: "flex" }} key={index}>
              <input
                type="radio"
                name="address"
                value={orderAddress}
                onChange={_ => setOrderAddress(item)}
                onClick={() => setuse(!use)}
              />
              <div className={style.addname}>
                <h4>
                  {`Address ${index + 1}`} : &nbsp; {item.type}{" "}
                </h4>
                <h5>
                  <strong>{item.name}</strong>
                </h5>
                <p>
                  {" "}
                  {item.buildingInfo} , {item.streetInfo}, Landmark: "
                  {item.landmark}" , {item.city} - {item.pincode} - {item.state}{" "}
                  - {item.country}
                </p>
                <strong>contact :</strong>
                {item.phone}
              </div>
            </div>
          );
        })}
      </div>
      <button onClick={handlesubmit} className={style.proceed}>
        Proceed
      </button>
    </div>
  );
};

export default SelectAddress;
