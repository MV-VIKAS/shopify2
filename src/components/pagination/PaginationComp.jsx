import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import styles from "../featured products/featuredProducts.module.css";

const PaginationComp = ({ currentPage, setCurrentPage, totalPages }) => {
  return (
    <Stack spacing={2}>
      <Pagination
        className={styles.paginationComp}
        count={totalPages}
        showFirstButton
        showLastButton
        page={currentPage}
        onChange={(ev, n) => setCurrentPage(n)}
        siblingCount={3}
      />
    </Stack>
  );
};

export default PaginationComp;
