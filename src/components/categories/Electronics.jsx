import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import styles from "./cat.module.css";
import CategoriesComp from "./CategoriesComp";
import { useSelector } from "react-redux";
const Electronics = () => {
  let [data, setdata] = useState({});
  let products = useSelector(state => state.product.productList);
  const fetchdata = async () => {
    let data = products.filter(product => {
      if (product.category === "electronics") return product;
    });
    setdata(data);
  };
  useEffect(() => {
    fetchdata();
  }, []);
  return (
    <div className={styles.category}>
      <CategoriesComp
        data={data}
        setdata={setdata}
        fetchdata={fetchdata}
        lable="Electronics"
      />
    </div>
  );
};

export default Electronics;
