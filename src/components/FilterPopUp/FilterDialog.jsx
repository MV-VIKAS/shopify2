import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import Styles from "./FilterDialog.module.css";
import { Box, Checkbox, FormControlLabel, FormGroup } from "@mui/material";

export default function FilterDialog({ openFilter, setFilter }) {
  const handleClickOpen = () => {
    setFilter(true);
  };

  const handleClose = () => {
    setFilter(false);
  };

  return (
    <div>
      <Dialog open={openFilter} onClose={handleClose} components="form">
        <DialogTitle>Filter</DialogTitle>
        <DialogContent>
          <Box component="form" className={Styles.filterForm}>
            <FormGroup>
              <h4>Brands:</h4>
              <FormControlLabel control={<Checkbox />} label="MANHOOD" />
              <FormControlLabel control={<Checkbox />} label="Kamedge" />
              <FormControlLabel control={<Checkbox />} label="NIKE" />
            </FormGroup>
            <FormGroup>
              <h4> Price:</h4>
              <FormControlLabel control={<Checkbox />} label="above 1000Rs" />
              <FormControlLabel control={<Checkbox />} label="1000 - 2000Rs" />
              <FormControlLabel control={<Checkbox />} label="2000 - 5000Rs" />
            </FormGroup>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleClose} variant="contained">
            Apply Filter
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
