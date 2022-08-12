import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "../../../apis/Axios";
import CategoriesComp from "../CategoriesComp";

const SubCategory = () => {
  const { subCat } = useParams();
  const [categoryList, setCategoryList] = useState([]);
  const fetchSubCategory = async () => {
    fetch(
      `http://localhost:8080/shopping-kart-ty-api-0.0.1-SNAPSHOT/products/type/${subCat}`
    )
      .then(res => res.json())
      .then(data => setCategoryList(data.data))
      .catch(err => console.log(err));
  };
  useEffect(() => {
    fetchSubCategory();
  }, []);

  return (
    <CategoriesComp
      data={categoryList}
      setdata={setCategoryList}
      lable={subCat}
    />
  );
};

export default SubCategory;
