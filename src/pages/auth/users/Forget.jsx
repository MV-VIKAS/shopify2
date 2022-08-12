import * as React from "react";
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
import { Link, useNavigate } from "react-router-dom";
import Axios from "../../../apis/Axios";
import { orange } from "@mui/material/colors";
import { toast } from "react-toastify";
const theme = createTheme({
  palette: {
    primary: {
      main: orange[400],
    },
  },
});

export default function Forget() {
  let navigate = useNavigate();
  let [email, setEmail] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    let header = {
      email: email,
      verifyUrl: "http://localhost:3000/reset",
    };
    try {
      let { data } = await Axios.post(`users/forgot-password`, null, {
        headers: header,
      });
      toast.success(data);
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
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
            marginBottom: "100px",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#1D2C4E" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Forgot Password
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
              id="email"
              label="Your Email"
              size="small"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              send Reset Link
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
