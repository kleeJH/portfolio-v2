import React, { useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import { BsDiscord } from "react-icons/bs";
import Slide from "@mui/material/Slide";

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

const SocialMedia = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSnackbarClick = () => {
    setOpenSnackbar(true);
  };

  const handleSnackbarClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  return (
    <>
      <div className="app__social">
        <div
          onClick={() => {
            handleSnackbarClick();
            navigator.clipboard.writeText("Kevin#0574");
          }}
        >
          <BsDiscord />
        </div>
      </div>
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

export default SocialMedia;
