import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import CategoriesComp from "./../../components/categories/CategoriesComp";
import { useSelector } from "react-redux";

import Error from "../../components/error/Error";

const SearchedProducts = () => {
  let { searchKey } = useParams();
  let products = useSelector(state => state.product.productList);
  let [data, setData] = useState([]);

  let fetchData = async () => {
    console.log(searchKey);
    let filtered = products.filter(product => {
      if (product.searchTags.includes(searchKey)) {
        return product;
      }
    });
    setData(filtered);
  };
  useEffect(() => {
    fetchData();
  }, [searchKey]);
  return (
    <div>
      {data.length === 0 ? (
        <Error />
      ) : (
        <CategoriesComp data={data} setdata={setData} />
      )}
    </div>
  );
};

export default SearchedProducts;
