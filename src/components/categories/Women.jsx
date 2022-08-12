import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import CategoriesComp from "./CategoriesComp";
import { useSelector } from "react-redux";
import Error from './../error/Error';
const Women = () => {
  let [data, setdata] = useState({});
  let products = useSelector(state => state.product.productList);
  const fetchdata = async () => {
    let data = products.filter(product => {
      if (product.category === "women") return product;
    });
    setdata(data);
  };
  useEffect(() => {
    fetchdata();
  }, []);
  return (
    <>
      {data.length === 0 ? (
        <Error />
      ) : (
        <CategoriesComp
          data={data}
          setdata={setdata}
          fetchdata={fetchdata}
          lable="Women's Products"
        />
      )}
    </>
  );
};

export default Women;
