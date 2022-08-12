import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function BackdropSpinner({ open }) {
  return (
    <div onClick={e => e.stopPropagation()}>
      <Backdrop
        sx={{
          color: "#666",
          zIndex: theme => theme.zIndex.drawer + 1,
          backgroundColor: "#ffffff40",
        }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
