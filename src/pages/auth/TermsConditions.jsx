import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Checkbox, FormControlLabel } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import termsStyle from "./TermsCondtions.module.css";

export default function TermsConditions({
  condition,
  modelCondition,
  onAgreeTC,
}) {
  const [open, setOpen] = React.useState(true);
  const [scroll, setScroll] = React.useState("paper");
  const [btnCondition, setBtnCondition] = React.useState(false);

  const handleClickOpen = scrollType => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
    modelCondition(false); //model(TermsConditions) condition in sign up page
    condition(false); // checkbox condition of signup page
  };

  const handleAgree = () => {
    setOpen(false);
    modelCondition(false);
    condition(true);
  };

  React.useEffect(() => {
    handleClickOpen("paper");
  }, []);

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  window.onscroll = function (ev) {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      console.log("reached bottom");
    }
  };

  return (
    <div>
      {/* <Button onClick={handleClickOpen("paper")}>scroll=paper</Button> */}
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Terms Conditions</DialogTitle>
        <div className={termsStyle.icon}>
          <ClearIcon onClick={handleClose} />
        </div>
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText
            id="scroll-dialog-description"
            style={{ textAlign: "justify" }}
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {[...new Array(50)]
              .map(
                () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`
              )
              .join("\n")}
            {
              <FormControlLabel
                // className={style.radioGroup}
                style={{ width: "350px" }}
                value="other"
                checked={btnCondition}
                onClick={() => {
                  setBtnCondition(!btnCondition);
                  onAgreeTC(true);
                }}
                control={<Checkbox />}
                label="I agree to the Terms Conditions*"
              />
            }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {btnCondition == true ? (
            <Button
              onClick={handleAgree}
              style={{ backgroundColor: "#231955", color: "#eee" }}
            >
              I Agree
            </Button>
          ) : (
            <Button disabled={true}>I Agree</Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
