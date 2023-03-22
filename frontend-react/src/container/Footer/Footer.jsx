import React, { useState } from "react";
import { Stack, TextField, Snackbar, Alert } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Slide from "@mui/material/Slide";

import { AppWrap, MotionWrap } from "../../wrapper";
import { images } from "../../constants";
import { client } from "../../client";
import "./Footer.scss";

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

const Footer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const { name, email, message } = formData;

  const handleSnackbarClick = () => {
    setOpenSnackbar(true);
  };

  const handleSnackbarClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = (field = null) => {
    let temp = {};
    temp.name = name ? "" : "This field is required.";
    temp.email =
      email === ""
        ? "This field is required."
        : /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/.test(email)
        ? ""
        : "Email is not valid.";
    temp.message = message ? "" : "This field is required.";

    if (field === null) {
      setErrors({ ...errors, ...temp });
    } else if (field === "name") {
      setErrors({ ...errors, name: temp["name"] });
    } else if (field === "email") {
      setErrors({ ...errors, email: temp["email"] });
    } else if (field === "message") {
      setErrors({ ...errors, message: temp["message"] });
    }

    return Object.values(temp).every((errMsg) => errMsg === "");
  };

  const handleSubmit = () => {
    if (validate()) {
      setIsLoading(true);

      const contact = {
        _type: "contact",
        name: name,
        email: email,
        message: message,
      };

      client.create(contact).then(() => {
        setIsLoading(false);
        setIsFormSubmitted(true);
      });
    }
  };

  return (
    <>
      <h2 className="head-text">
        Come have a <span>chat</span> with me!
      </h2>

      <div className="app__footer-cards no-select">
        <a
          href="mailto:klee.junhong@gmail.com"
          className="bold-text app__footer-a-card"
        >
          <div className="app__footer-card">
            <img src={images.email} alt="email" />
            klee.junhong@gmail.com
          </div>
        </a>

        <div
          className="app__footer-card app__footer-a-card"
          onClick={() => {
            handleSnackbarClick();
            navigator.clipboard.writeText("Kevin#0574");
          }}
        >
          <img src={images.discord} alt="discord" />
          <div className="bold-text">Kevin#0574</div>
        </div>
      </div>

      {!isFormSubmitted ? (
        <Stack className="app__footer-mui-form" spacing={3}>
          <TextField
            name="name"
            label="Name"
            variant="outlined"
            placeholder="Your Name"
            autoComplete="off"
            fullWidth
            value={name}
            onChange={handleChangeInput}
            error={errors.name ? true : false}
            helperText={errors.name}
            onBlur={() => validate("name")}
          />
          <TextField
            name="email"
            type="email"
            label="Email"
            variant="outlined"
            placeholder="Your Email"
            autoComplete="off"
            fullWidth
            value={email}
            onChange={handleChangeInput}
            error={errors.email ? true : false}
            helperText={errors.email}
            onBlur={() => validate("email")}
          />
          <TextField
            name="message"
            label="Message"
            multiline
            rows={4}
            placeholder="Your Message"
            autoComplete="off"
            fullWidth
            value={message}
            onChange={handleChangeInput}
            error={errors.message ? true : false}
            helperText={errors.message}
            onBlur={() => validate("message")}
          />
          <LoadingButton
            TouchRippleProps={{
              style: {
                color: "white",
              },
            }}
            variant="contained"
            onClick={handleSubmit}
            loading={isLoading}
          >
            Send Message
          </LoadingButton>
        </Stack>
      ) : (
        <h3 className="head-text">Thank you for getting in touch with me!</h3>
      )}

      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        TransitionComponent={SlideTransition}
        onClose={handleSnackbarClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Alert
          severity="success"
          sx={{ width: "100%" }}
          elevation={6}
          variant="filled"
        >
          Copied Discord User ID
        </Alert>
      </Snackbar>
    </>
  );
};
export default AppWrap(
  MotionWrap(Footer, "app__footer"),
  "contact",
  "app__whitebg"
);
