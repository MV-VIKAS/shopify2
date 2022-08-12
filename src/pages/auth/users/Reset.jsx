import React, { useEffect } from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { orange } from "@mui/material/colors";
import { useSearchParams } from "react-router-dom";
import Axios from "../../../apis/Axios";
import { toast } from "react-toastify";
const theme = createTheme({
  palette: {
    primary: {
      main: orange[500],
    },
  },
});

export default function Reset() {
  let navigate = useNavigate();
  let [searchParam, setSearchParam] = useSearchParams();
  const [token, setToken] = useState("");
  // console.log(useSearchParams())
  let [newpass, setPass] = useState("");
  let [confirmpassword, setPassword] = useState("");

  useEffect(() => {
    setToken(searchParam.get("token"));
    searchParam.set("token", "######");
    setSearchParam(searchParam);
  }, []);

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await Axios.post(`/users/verify-account?token=${token}`, null, {
        headers: { password: newpass },
      });
      toast.success("Password changed successfully");
      navigate(`/`);
    } catch (err) {
      console.log(err);
      toast.err(Response.data);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "3.5rem 2rem",
            borderRadius: "0.4rem",
            background: "#efefef",
            boxShadow: "2px 1px 10px 1px grey",
            marginBottom: "20px",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#1D2C4E" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Reset Password
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="newpassword"
              label="New password"
              name="Newpassword"
              size="small"
              type="password"
              value={newpass}
              onChange={e => setPass(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmpassword"
              label="confirm password"
              type="password"
              id="confirmpassword"
              autoComplete="current-password"
              value={confirmpassword}
              onChange={e => setPassword(e.target.value)}
            />

            <Button
              type="submit"
              onClick={handleSubmit}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Confirm
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
